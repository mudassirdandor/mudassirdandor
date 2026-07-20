import React from "react";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface ExecutiveSectionHeaderProps {
  eyebrow: React.ReactNode;
  title: string;
  description: React.ReactNode;
  badge?: string;
  breadcrumb?: (string | BreadcrumbItem)[];
  alignment?: "left" | "center";
  maxWidth?: string; // e.g. "max-w-xl", "max-w-2xl", "max-w-3xl"
  centered?: boolean;
  actions?: React.ReactNode;
  id?: string;
}

const ExecutiveSectionHeader = React.memo(function ExecutiveSectionHeader({
  eyebrow,
  title,
  description,
  badge,
  breadcrumb,
  alignment = "left",
  maxWidth = "max-w-3xl",
  centered = false,
  actions,
  id,
}: ExecutiveSectionHeaderProps) {
  const isCentered = centered || alignment === "center";

  return (
    <div
      id={id}
      className={`w-full flex flex-col ${
        isCentered 
          ? "items-center text-center justify-center mb-12 md:mb-16" 
          : "md:flex-row md:items-end md:justify-between text-left mb-12 md:mb-16"
      } gap-6`}
    >
      <div className={`w-full ${maxWidth} ${isCentered ? "mx-auto text-center" : "text-left"} space-y-2.5`}>
        {/* Breadcrumb Support */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-[12px] font-mono text-slate-500 mb-3 ${isCentered ? "justify-center" : "justify-start"}`}>
            {breadcrumb.map((item, idx) => {
              const label = typeof item === "string" ? item : item.label;
              const onClick = typeof item === "string" ? undefined : item.onClick;
              const isLast = idx === breadcrumb.length - 1;

              return (
                <React.Fragment key={idx}>
                  {onClick ? (
                    <button
                      onClick={onClick}
                      className="hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
                    >
                      {label}
                    </button>
                  ) : (
                    <span className={isLast ? "text-slate-700 font-semibold" : ""}>{label}</span>
                  )}
                  {!isLast && <span className="text-slate-300 select-none">/</span>}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {/* Eyebrow and Optional Badge Row */}
        <div className={`flex flex-wrap items-center gap-2.5 ${isCentered ? "justify-center" : "justify-start"}`}>
          {typeof eyebrow === "string" ? (
            <span className="text-[12px] font-mono tracking-widest text-executive-blue uppercase font-semibold block">
              {eyebrow}
            </span>
          ) : (
            eyebrow
          )}
          {badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-100 animate-pulse-slow">
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-[clamp(2.1rem,3vw,2.5rem)] font-bold tracking-[-0.01em] text-slate-950 font-display leading-[1.2]">
          {title}
        </h2>

        {/* Description */}
        {description && (
          typeof description === "string" ? (
            <p className={`text-[16px] text-slate-700 leading-[1.7] font-sans max-w-[700px] ${isCentered ? "mx-auto" : ""}`}>
              {description}
            </p>
          ) : (
            <div className={`text-[16px] text-slate-700 leading-[1.7] font-sans max-w-[700px] ${isCentered ? "mx-auto" : ""}`}>
              {description}
            </div>
          )
        )}
      </div>

      {/* Optional Actions */}
      {actions && (
        <div className={`flex items-center gap-3 shrink-0 ${isCentered ? "justify-center" : "self-start md:self-auto"}`}>
          {actions}
        </div>
      )}
    </div>
  );
});

export default ExecutiveSectionHeader;
