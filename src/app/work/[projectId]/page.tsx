import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, GITHUB_PROFILE, EMAIL } from "@/data/portfolio";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} — Vijayaraghavan`,
      description: project.description,
      images: [project.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Vijayaraghavan`,
      description: project.description,
      images: [project.ogImage],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
