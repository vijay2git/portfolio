"use server";

import { z } from "zod";

const NodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  group: z.enum(["core", "model", "infra", "concept", "tool"]).default("concept"),
  weight: z.number().min(0).max(1).default(0.5),
});

const ResearchResult = z.object({
  summary: z.string(),
  nodes: z.array(NodeSchema).min(3).max(12),
  edges: z.array(z.tuple([z.string(), z.string()])).default([]),
  citations: z.array(z.string()).default([]),
});

export type ResearchResultT = z.infer<typeof ResearchResult>;

export async function runResearchQuery(query: string) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY not configured");

  const tool = {
    type: "function" as const,
    function: {
      name: "emit_research_graph",
      description:
        "Return a concise research summary plus a knowledge graph of 5-10 related concepts as nodes with edges connecting them.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          summary: {
            type: "string",
            description: "2-3 sentence research answer in plain prose.",
          },
          nodes: {
            type: "array",
            minItems: 5,
            maxItems: 10,
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                id: { type: "string", description: "kebab-case unique id" },
                label: { type: "string", description: "short display label, 1-3 words" },
                group: {
                  type: "string",
                  enum: ["core", "model", "infra", "concept", "tool"],
                },
                weight: { type: "number", minimum: 0, maximum: 1 },
              },
              required: ["id", "label", "group", "weight"],
            },
          },
          edges: {
            type: "array",
            description: "Pairs of node ids that are related.",
            items: {
              type: "array",
              items: { type: "string" },
              minItems: 2,
              maxItems: 2,
            },
          },
          citations: {
            type: "array",
            items: { type: "string" },
            description: "Optional short reference labels (paper title, framework name).",
          },
        },
        required: ["summary", "nodes", "edges"],
      },
    },
  };

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        {
          role: "system",
          content:
            "You are NEURALVERSE — Vijayaraghavan's AI research terminal. For each query, produce a tight, technically precise summary and a small knowledge graph (5-10 nodes) capturing the key concepts, models, infrastructure, and tools. Mark exactly one node as group='core' representing the central concept. Edges must connect existing node ids. Be concrete and avoid filler.",
        },
        { role: "user", content: query },
      ],
      tools: [tool],
      tool_choice: { type: "function", function: { name: "emit_research_graph" } },
    }),
  });

  if (res.status === 429) throw new Error("Rate limited — try again in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted.");
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`AI gateway error ${res.status}: ${t.slice(0, 200)}`);
  }

  const payload = await res.json();
  const call = payload?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call?.function?.arguments) throw new Error("No structured output returned.");

  const parsed = ResearchResult.parse(JSON.parse(call.function.arguments));
  // sanitize edges to existing nodes
  const ids = new Set(parsed.nodes.map((n) => n.id));
  parsed.edges = parsed.edges.filter(([a, b]) => ids.has(a) && ids.has(b));
  return parsed;
}
