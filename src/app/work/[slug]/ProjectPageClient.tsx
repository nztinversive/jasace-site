"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectContent from "@/components/ProjectContent";
import ScrollProgress from "@/components/ScrollProgress";
import { projects, getProjectBySlug, type Project } from "@/data/projects";
import { sortProjects } from "@/lib/cms";

type RuntimeProject = Project & {
  _id?: string;
  _creationTime?: number;
};

function ProjectNotFound() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-stone-950 bg-grid-dark relative overflow-hidden">
        <div className="absolute top-24 left-12 w-28 h-28 border-l border-t border-stone-200/60 hidden lg:block" />
        <div className="absolute bottom-24 right-12 w-28 h-28 border-r border-b border-stone-200/60 hidden lg:block" />

        <div className="text-center px-6 relative z-10">
          <div className="font-display text-[120px] sm:text-[180px] lg:text-[240px] font-light leading-none tracking-tighter text-stone-700 select-none">
            4<span className="text-terra/20">0</span>4
          </div>
          <div className="-mt-6 sm:-mt-10 space-y-4">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-100">
              Project <span className="text-gradient font-bold">NOT FOUND</span>
            </h1>
            <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
              The project you are looking for does not exist or has moved.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ProjectLoading() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-stone-950">
        <div className="flex items-center gap-3 text-sm text-stone-400">
          <div className="w-4 h-4 border-2 border-terra/40 border-t-terra rounded-full animate-spin" />
          Loading project...
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProjectPageClient({ slug }: { slug: string }) {
  const cmsProject = useQuery(api.projects.getBySlug, { slug }) as RuntimeProject | null | undefined;
  const cmsProjects = useQuery(api.projects.list) as RuntimeProject[] | undefined;

  if (cmsProject === undefined || cmsProjects === undefined) {
    return <ProjectLoading />;
  }

  const items = sortProjects(cmsProjects.length ? cmsProjects : projects);
  const project = cmsProject ?? getProjectBySlug(slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  const currentIndex = items.findIndex((item) => item.slug === project.slug);
  const prevProject =
    currentIndex >= 0 ? items[(currentIndex - 1 + items.length) % items.length] : project;
  const nextProject = currentIndex >= 0 ? items[(currentIndex + 1) % items.length] : project;

  return (
    <ProjectContent
      project={project}
      prevProject={{ slug: prevProject.slug, title: prevProject.title }}
      nextProject={{ slug: nextProject.slug, title: nextProject.title }}
    />
  );
}
