import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={`space-y-3 ${isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-border/80 bg-muted/50 text-muted-foreground ${isCenter ? "justify-center" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
