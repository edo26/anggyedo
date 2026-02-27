/**
 * Home Page - The main landing page that assembles all sections.
 * Following the Liskov Substitution Principle (LSP), each section
 * component is independently renderable and replaceable.
 */

'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CTASection from '@/components/sections/CTASection';
import { useContent } from '@/lib/contentProvider';

/**
 * This component assembles the complete landing page from individual sections.
 * Each section is self-contained and fetches its own data from the content context.
 */
export default function HomePage() {
  const { content, isLoading } = useContent();

  // This displays a loading skeleton while content is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <HeroSection />
      <ExperienceSection
        data={content.professionalExperiences}
        id="experience"
        variant="professional"
      />
      <ExperienceSection
        data={content.earlierExperiences}
        id="education"
        variant="education"
      />
      <ProjectsSection />
      <SkillsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
