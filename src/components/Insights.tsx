import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { blogPosts } from "../data/blog";
import { BlogPost } from "../types";
import ExecutiveSectionHeader from "./ExecutiveSectionHeader";
import ArticleLayout from "./ArticleLayout";
import ExecutiveCard from "./ExecutiveCard";
import { 
  X, 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Layers, 
  Database, 
  Cpu, 
  Search,
  Bookmark
} from "lucide-react";

/**
 * Professional Articles & Analysis component.
 * Lists categorized analysis blog posts. Renders full-post modal overlays 
 * detailing data design, statistics, automation, and decision-making concepts.
 */
export interface InsightsProps {
  onNavigate?: (pageId: string) => void;
}

interface QuestionFirstBlogPost extends BlogPost {
  topicsCovered: string[];
  relatedTopics: string[];
  relatedService: { name: string; sectionId: string };
  relatedProject: { name: string; sectionId: string };
  expertiseSignal: string;
}

const mapPostToQuestionFirst = (post: BlogPost): QuestionFirstBlogPost => {
  switch (post.id) {
    case "blog-what-is-bi":
      return {
        ...post,
        title: "What Is Business Intelligence and Why Does It Matter for My Business?",
        summary: "Business Intelligence is the process of centralizing, cleansing, and structuring scattered spreadsheets into an automated, single source of truth. It allows decision-makers to track key performance indicators based on facts rather than intuition, helping to optimize operations and drive sustainable growth.",
        topicsCovered: ["Business Intelligence", "KPIs", "Data Warehousing", "Star Schema", "Decision Support"],
        relatedTopics: ["Dashboard Design", "Operational Reporting", "Data Integration"],
        relatedService: { name: "Dashboard & Workflow Solutions", sectionId: "solutions" },
        relatedProject: { name: "Interactive Executive Dashboards", sectionId: "projects" },
        expertiseSignal: "Built from real-world consulting experience"
      };
    case "blog-dax-optimization":
      return {
        ...post,
        title: "How Can We Make Sluggish Power BI Dashboards and Reports Load Faster?",
        summary: "Slow dashboards are usually caused by flat spreadsheets and inefficient formula scans. By restructuring your tables into a clean Star Schema and optimizing DAX calculations—such as filtering specific columns instead of full tables—you can instantly reduce report loading latency from seconds to milliseconds.",
        topicsCovered: ["Power BI", "DAX Optimization", "Star Schema", "Data Modeling", "Performance Tuning"],
        relatedTopics: ["Query Optimization", "Data Modeling", "Business Intelligence"],
        relatedService: { name: "Dashboard & Workflow Solutions", sectionId: "solutions" },
        relatedProject: { name: "Interactive Executive Dashboards", sectionId: "projects" },
        expertiseSignal: "Based on practical performance tuning implementations"
      };
    case "blog-local-bi-maps":
      return {
        ...post,
        title: "How Can Local SEO and Customer Map Visualization Increase Store Foot Traffic?",
        summary: "Mapping your physical business listings and tracking geo-specific neighborhood rankings helps you target localized customer demand. By identifying where your brand dominates or loses visibility block-by-block, you can focus marketing budgets where they yield the highest customer response and foot traffic.",
        topicsCovered: ["Local SEO", "Google Business Profile", "Geocoding", "Spatial Analysis", "Lead Generation"],
        relatedTopics: ["Map Analytics", "Reputation Management", "Lead Optimization"],
        relatedService: { name: "Local SEO & Map Optimization", sectionId: "solutions" },
        relatedProject: { name: "Interactive Executive Dashboards", sectionId: "projects" },
        expertiseSignal: "Supported by geocoding & spatial analysis methodologies"
      };
    case "blog-ai-reporting":
      return {
        ...post,
        title: "How Do You Safely Integrate AI Assistants to Automate Business Reporting?",
        summary: "To leverage Large Language Models safely without exposing sensitive business databases, establish a secure draft-and-review system. Use automated scripts to pre-calculate figures, apply strict negative constraints to prompt inputs, and keep a human-in-the-loop to verify drafts before sharing reports.",
        topicsCovered: ["AI Automation", "Prompt Engineering", "Data Security", "Workflow Automation", "Human-in-the-Loop"],
        relatedTopics: ["AI Integration", "Process Automation", "System Security"],
        relatedService: { name: "Dashboard & Workflow Solutions", sectionId: "solutions" },
        relatedProject: { name: "Interactive Executive Dashboards", sectionId: "projects" },
        expertiseSignal: "Based on secure AI workflow consulting engagements"
      };
    case "blog-statistics-dashboards":
      return {
        ...post,
        title: "Why Do Simple Dashboard Averages Mislead Decisions and How Do We Fix It?",
        summary: "Simple averages smooth out real-world spikes and operational fluctuations, which often leads to planning and inventory errors. By integrating range bands, safety margins, and statistical process controls, you can help your team see variation patterns clearly and make reliable operational forecasts.",
        topicsCovered: ["Data Analytics", "Statistical Modeling", "KPI Metrics", "Operational Forecasting", "Quality Control"],
        relatedTopics: ["Statistical Process Control", "Data Quality", "Predictive Analytics"],
        relatedService: { name: "Dashboard & Workflow Solutions", sectionId: "solutions" },
        relatedProject: { name: "Interactive Executive Dashboards", sectionId: "projects" },
        expertiseSignal: "Supported by advanced data analysis methodologies"
      };
    default:
      return {
        ...post,
        topicsCovered: ["Data & Analytics"],
        relatedTopics: ["Business Analysis", "Reporting"],
        relatedService: { name: "Consulting Services", sectionId: "solutions" },
        relatedProject: { name: "Client Work", sectionId: "projects" },
        expertiseSignal: "Based on professional methodology"
      };
  }
};

export default function Insights({ onNavigate }: InsightsProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Business Intelligence", "Data Analytics", "AI Automation", "Local BI"];

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const mappedFilteredPosts = filteredPosts.map(mapPostToQuestionFirst);
  const mappedSelectedPost = selectedPost ? mapPostToQuestionFirst(selectedPost) : null;

  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case "Business Intelligence":
        return <Layers className="w-4 h-4 text-blue-600" />;
      case "Data Analytics":
        return <Database className="w-4 h-4 text-indigo-600" />;
      case "AI Automation":
        return <Cpu className="w-4 h-4 text-purple-600" />;
      case "Local BI":
        return <Search className="w-4 h-4 text-cyan-600" />;
      default:
        return <Bookmark className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section id="blog" className="relative py-20 bg-brand-bg-primary text-brand-body px-6 md:px-8 border-t border-slate-200 overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <ExecutiveSectionHeader
          eyebrow={
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="font-mono text-[10px] tracking-wider text-blue-600 uppercase font-bold">Knowledge Library</span>
            </div>
          }
          title="Expert Answers & Practical Guides"
          description="A curated library of technical methodologies, analytical frameworks, and automated solutions designed to solve complex business operations and guide confident executive decisions."
          actions={
            <div className="flex flex-col md:items-end gap-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">METHODOLOGY FILTER</span>
              <div className="flex flex-wrap gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1.5 shadow-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      activeCategory === cat
                        ? "bg-white border border-slate-200 text-slate-800 shadow-xs font-semibold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                    }`}
                  >
                    {cat === "Business Intelligence" ? "BI" : cat}
                  </button>
                ))}
              </div>
            </div>
          }
        />

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {mappedFilteredPosts.map((post, index) => {
              const isFeatured = index === 0;
              return (
                <ExecutiveCard
                  key={post.id}
                  level={1}
                  className={`shadow-xs ${isFeatured ? "md:col-span-2" : ""}`}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className={`p-6 flex flex-col md:flex-row gap-6 h-full w-full justify-between ${
                    isFeatured ? "min-h-[220px]" : "min-h-[200px]"
                  }`}>
                    <div className={`flex flex-col justify-between h-full w-full ${isFeatured ? "md:w-3/4 md:pr-6" : ""}`}>
                      <div className="space-y-4">
                        {/* Editorial Block 1: Header, Question & Direct Answer Preview */}
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                            {getIconForCategory(post.category)}
                            <span>{post.category}</span>
                          </div>
                          <h3 className={`font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors ${
                            isFeatured ? "text-lg md:text-xl" : "text-[15px] md:text-base line-clamp-2"
                          }`}>
                            {post.title}
                          </h3>
                          <p className="text-[13px] text-slate-650 leading-relaxed font-sans line-clamp-3">
                            {post.summary}
                          </p>
                        </div>

                        {/* Editorial Block 2: Topic Chips & Expertise Signal */}
                        <div className="pt-3.5 border-t border-slate-100/80 space-y-2.5">
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mr-1 font-bold">TOPICS COVERED</span>
                            {post.topicsCovered?.map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center bg-slate-50 border border-slate-150 text-[10px] font-medium text-slate-600 px-2.5 py-0.5 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                          <div className="text-[11px] text-slate-500 font-sans italic flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shrink-0" />
                            <span>{post.expertiseSignal}</span>
                          </div>
                        </div>

                        {/* Editorial Block 3: Related Topics & Connected Architecture */}
                        <div className="pt-3.5 border-t border-slate-100/80 space-y-3">
                          <div className="flex flex-wrap gap-x-2 gap-y-1 items-center text-[11px] text-slate-500">
                            <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">RELATED TOPICS</span>
                            {post.relatedTopics?.map((topic, i) => (
                              <span key={topic} className="font-sans font-medium text-slate-600">
                                {topic}{i < post.relatedTopics.length - 1 && <span className="text-slate-300 ml-2 font-normal">•</span>}
                              </span>
                            ))}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
                            <div className="flex items-start gap-1.5">
                              <span className="text-slate-400 font-mono text-[9px] uppercase font-bold tracking-wider mt-0.5 shrink-0">RELATED SERVICE:</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate?.(post.relatedService.sectionId);
                                }}
                                className="font-sans font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-0.5 cursor-pointer text-left"
                              >
                                {post.relatedService.name} →
                              </button>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <span className="text-slate-400 font-mono text-[9px] uppercase font-bold tracking-wider mt-0.5 shrink-0">CASE STUDY:</span>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigate?.(post.relatedProject.sectionId);
                                }}
                                className="font-sans font-semibold text-slate-700 hover:text-slate-900 hover:underline inline-flex items-center gap-0.5 cursor-pointer text-left"
                              >
                                {post.relatedProject.name} →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Metadata & CTA */}
                      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 mt-5 text-[11px] font-mono text-slate-500 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>Updated {post.date}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{post.readTime}</span>
                          </span>
                        </div>

                        {/* Primary CTA */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span>Explore Complete Answer</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {isFeatured && (
                      <div className="hidden md:flex md:w-1/4 flex-col justify-between border-l border-slate-100 pl-6 text-slate-500">
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-blue-600 uppercase bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100 self-start inline-block">
                              Featured Answer
                            </span>
                            <div className="text-[11px] font-sans leading-normal">
                              <span className="font-semibold text-slate-800">Operational Value:</span>
                              <p className="mt-0.5 text-slate-600">This framework serves as the core foundation for automating high-volume business systems safely.</p>
                            </div>
                          </div>
                          <div className="text-[11px] font-sans leading-normal">
                            <span className="font-semibold text-slate-800">Methodology Fit:</span>
                            <p className="mt-0.5 text-slate-650 leading-relaxed">Directly integrates with my <strong className="font-semibold text-slate-800">{post.relatedService.name}</strong> capability.</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          Expertise Verified • Mudassir Javed
                        </div>
                      </div>
                    )}
                  </div>
                </ExecutiveCard>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Full Blog Modal Overlay */}
        <AnimatePresence>
          {mappedSelectedPost && (() => {
            const currentIndex = blogPosts.findIndex((p) => p.id === mappedSelectedPost.id);
            const prevPost = currentIndex > 0 ? mapPostToQuestionFirst(blogPosts[currentIndex - 1]) : undefined;
            const nextPost = currentIndex < blogPosts.length - 1 ? mapPostToQuestionFirst(blogPosts[currentIndex + 1]) : undefined;

            return (
              <ArticleLayout
                title={mappedSelectedPost.title}
                category={mappedSelectedPost.category}
                summary={mappedSelectedPost.summary}
                readingTime={mappedSelectedPost.readTime}
                difficulty={mappedSelectedPost.difficulty || "Intermediate"}
                publishedDate={mappedSelectedPost.date}
                lastUpdated={mappedSelectedPost.lastUpdated}
                author={mappedSelectedPost.author || "Mudassir Javed"}
                heroVisual={mappedSelectedPost.heroVisual || "workflow"}
                tableOfContents={mappedSelectedPost.tableOfContents || ["Overview"]}
                sections={mappedSelectedPost.sections || [
                  { heading: "Overview", content: mappedSelectedPost.content }
                ]}
                keyTakeaways={mappedSelectedPost.keyTakeaways || [
                  mappedSelectedPost.summary,
                  "Enforce structured execution routines when implementing relational or analytical systems.",
                  "Establish verified data pipelines to achieve operational integrity and strategic clarity."
                ]}
                relatedCaseStudies={(mappedSelectedPost.relatedCaseStudies || []).map((cs) => ({
                  ...cs,
                  onClick: () => {
                    setSelectedPost(null);
                    onNavigate?.("case-studies");
                  }
                }))}
                relatedSolutions={(mappedSelectedPost.relatedSolutions || []).map((sol) => ({
                  ...sol,
                  onClick: () => {
                    setSelectedPost(null);
                    onNavigate?.("solutions");
                  }
                }))}
                relatedTechnologies={mappedSelectedPost.relatedTechnologies || []}
                references={mappedSelectedPost.references || []}
                previousArticle={prevPost ? {
                  title: prevPost.title,
                  onClick: () => setSelectedPost(prevPost)
                } : undefined}
                nextArticle={nextPost ? {
                  title: nextPost.title,
                  onClick: () => setSelectedPost(nextPost)
                } : undefined}
                cta={{
                  title: "Discuss Your Project",
                  text: "If you'd like help applying these ideas to your business, I'm happy to discuss your project.",
                  buttonText: "Get in touch",
                  onClick: () => {
                    setSelectedPost(null);
                    onNavigate?.("contact");
                  }
                }}
                onClose={() => setSelectedPost(null)}
              />
            );
          })()}
        </AnimatePresence>

      </div>
    </section>
  );
}
