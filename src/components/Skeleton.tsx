import React from "react";
import { motion } from "motion/react";

/**
 * A reusable restrained skeleton pulse wrapper.
 * Uses a slow animated gradient to resemble final layouts with no flashing shimmer.
 */
interface SkeletonPulseProps {
  className?: string;
  children?: React.ReactNode;
}

export function SkeletonPulse({ className = "", children }: SkeletonPulseProps) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-100/80 rounded-lg animate-pulse-slow ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {/* Restrained subtle gradient sweep overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/20 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite_linear]" />
      {children}
    </div>
  );
}

/**
 * Reusable Text Skeleton Component.
 */
interface TextSkeletonProps {
  lines?: number;
  className?: string;
}

export function TextSkeleton({ lines = 3, className = "" }: TextSkeletonProps) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => {
        // Vary width for a realistic text-like appearance
        const widths = ["w-full", "w-11/12", "w-4/5", "w-3/4", "w-5/6", "w-2/3"];
        const width = idx === lines - 1 ? widths[idx % 3 + 3] : widths[idx % widths.length];
        return (
          <SkeletonPulse key={idx} className={`h-3 rounded ${width}`} />
        );
      })}
    </div>
  );
}

/**
 * Reusable Card Skeleton Component (resembles Level 1 / Level 2 cards).
 */
interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className = "" }: CardSkeletonProps) {
  return (
    <div className={`p-6 border border-slate-100 bg-white rounded-2xl shadow-none space-y-4 ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Mock icon/avatar circle */}
        <SkeletonPulse className="w-10 h-10 rounded-full shrink-0" />
        <div className="space-y-2 w-full">
          {/* Mock title */}
          <SkeletonPulse className="h-4 w-1/3 rounded" />
          {/* Mock metadata */}
          <SkeletonPulse className="h-3 w-1/4 rounded" />
        </div>
      </div>
      <hr className="border-slate-100" />
      {/* Mock content text */}
      <TextSkeleton lines={3} />
      {/* Mock action button */}
      <div className="pt-2 flex justify-end">
        <SkeletonPulse className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Reusable Project Thumbnail Skeleton.
 */
interface ProjectThumbnailSkeletonProps {
  className?: string;
}

export function ProjectThumbnailSkeleton({ className = "" }: ProjectThumbnailSkeletonProps) {
  return (
    <div className={`border border-slate-100 bg-white rounded-2xl overflow-hidden space-y-4 ${className}`}>
      {/* Image Area Aspect Ratio */}
      <SkeletonPulse className="w-full aspect-video rounded-b-none" />
      <div className="p-6 space-y-4">
        {/* Tags */}
        <div className="flex gap-2">
          <SkeletonPulse className="h-5 w-16 rounded-full" />
          <SkeletonPulse className="h-5 w-20 rounded-full" />
        </div>
        {/* Title */}
        <SkeletonPulse className="h-6 w-3/4 rounded" />
        {/* Description */}
        <TextSkeleton lines={2} />
        {/* Footer info */}
        <div className="pt-2 flex justify-between items-center">
          <SkeletonPulse className="h-4 w-24 rounded" />
          <SkeletonPulse className="h-8 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Knowledge Card Skeleton (representing metrics/badges).
 */
interface KnowledgeCardSkeletonProps {
  className?: string;
}

export function KnowledgeCardSkeleton({ className = "" }: KnowledgeCardSkeletonProps) {
  return (
    <div className={`p-5 border border-slate-100 bg-white rounded-2xl space-y-3 ${className}`}>
      <div className="flex justify-between items-start">
        {/* Count KPI */}
        <SkeletonPulse className="h-8 w-16 rounded" />
        {/* Verified icon badge */}
        <SkeletonPulse className="h-6 w-6 rounded-full" />
      </div>
      {/* Skill / Certificate Name */}
      <SkeletonPulse className="h-4 w-4/5 rounded" />
      {/* Supporting details */}
      <div className="space-y-1.5 pt-1">
        <SkeletonPulse className="h-3 w-2/3 rounded" />
        <SkeletonPulse className="h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

/**
 * Reusable Resume Preview Skeleton (resembles PDF/interactive resume outline).
 */
interface ResumePreviewSkeletonProps {
  className?: string;
}

export function ResumePreviewSkeleton({ className = "" }: ResumePreviewSkeletonProps) {
  return (
    <div className={`p-8 border border-slate-150 bg-slate-50 rounded-2xl space-y-6 ${className}`}>
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div className="space-y-2">
          {/* Resume Name */}
          <SkeletonPulse className="h-5 w-40 rounded" />
          {/* Subtitle */}
          <SkeletonPulse className="h-3.5 w-28 rounded" />
        </div>
        {/* Download action button */}
        <SkeletonPulse className="h-9 w-28 rounded-xl" />
      </div>
      <div className="space-y-6">
        {/* Work experience chunk 1 */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <SkeletonPulse className="h-4 w-48 rounded" />
            <SkeletonPulse className="h-3.5 w-24 rounded" />
          </div>
          <TextSkeleton lines={3} />
        </div>
        {/* Work experience chunk 2 */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <SkeletonPulse className="h-4 w-36 rounded" />
            <SkeletonPulse className="h-3.5 w-24 rounded" />
          </div>
          <TextSkeleton lines={2} />
        </div>
      </div>
    </div>
  );
}
