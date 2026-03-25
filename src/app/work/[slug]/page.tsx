import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import ProjectContent from "@/components/ProjectContent";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <ProjectContent
      project={project}
      prevProject={{ slug: prevProject.slug, title: prevProject.title }}
      nextProject={{ slug: nextProject.slug, title: nextProject.title }}
    />
  );
}
