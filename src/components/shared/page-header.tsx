import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";

interface BreadcrumbLink {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbLink[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb>
        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={index}
            href={crumb.href}
            active={index === breadcrumbs.length - 1}
          >
            {crumb.label}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
