import { Breadcrumb, BreadcrumbItem, BreadcrumbEllipsis } from "@/components/ui/breadcrumb";
import { Home, LayoutDashboard, FileText, Settings, User, ShoppingCart, Package } from "lucide-react";

function DemoCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

export default function BreadcrumbPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Breadcrumb</h1>
        <p className="text-muted-foreground">
          Navigation aid that helps users understand their location within an application's hierarchy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Basic Breadcrumb */}
        <DemoCard title="Basic Breadcrumb" description="Default breadcrumb with chevron separator.">
          <div className="space-y-3">
            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#">Home</BreadcrumbItem>
              <BreadcrumbItem href="#">Library</BreadcrumbItem>
              <BreadcrumbItem active>Data</BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
              <BreadcrumbItem href="#">Components</BreadcrumbItem>
              <BreadcrumbItem href="#">Base UI</BreadcrumbItem>
              <BreadcrumbItem active>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </DemoCard>

        {/* Separator Variants */}
        <DemoCard title="Separator Variants" description="Different separator styles between breadcrumb items.">
          <div className="space-y-4">
            {[
              ["chevron", "Chevron (›)"],
              ["slash", "Slash (/)"],
              ["arrow", "Arrow (→)"],
              ["dot", "Dot (·)"],
              ["dash", "Dash (—)"],
            ].map(([sep, label]) => (
              <div key={sep}>
                <p className="text-xs text-muted-foreground mb-1.5 font-medium">{label}</p>
                <Breadcrumb separator={sep}>
                  <BreadcrumbItem href="#">Home</BreadcrumbItem>
                  <BreadcrumbItem href="#">Library</BreadcrumbItem>
                  <BreadcrumbItem active>Current Page</BreadcrumbItem>
                </Breadcrumb>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Breadcrumb with Icons */}
        <DemoCard title="Breadcrumb with Icons" description="Items decorated with an icon for visual context.">
          <div className="space-y-3">
            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#" className="flex items-center gap-1.5">
                <Home className="size-3.5" /> Home
              </BreadcrumbItem>
              <BreadcrumbItem href="#" className="flex items-center gap-1.5">
                <LayoutDashboard className="size-3.5" /> Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem active className="flex items-center gap-1.5">
                <FileText className="size-3.5" /> Reports
              </BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#" className="flex items-center gap-1.5">
                <Home className="size-3.5" /> Home
              </BreadcrumbItem>
              <BreadcrumbItem href="#" className="flex items-center gap-1.5">
                <ShoppingCart className="size-3.5" /> Orders
              </BreadcrumbItem>
              <BreadcrumbItem href="#" className="flex items-center gap-1.5">
                <Package className="size-3.5" /> Products
              </BreadcrumbItem>
              <BreadcrumbItem active className="flex items-center gap-1.5">
                <Settings className="size-3.5" /> Settings
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </DemoCard>

        {/* Icon-only Home */}
        <DemoCard title="Home Icon Only" description="First item shows only a home icon without label.">
          <div className="space-y-3">
            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#" className="flex items-center">
                <Home className="size-4" />
              </BreadcrumbItem>
              <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
              <BreadcrumbItem active>Analytics</BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="slash">
              <BreadcrumbItem href="#" className="flex items-center">
                <Home className="size-4" />
              </BreadcrumbItem>
              <BreadcrumbItem href="#">Settings</BreadcrumbItem>
              <BreadcrumbItem href="#">Account</BreadcrumbItem>
              <BreadcrumbItem active>Security</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </DemoCard>

        {/* With Ellipsis */}
        <DemoCard title="With Ellipsis" description="Collapse middle items with ellipsis for deep navigation paths.">
          <div className="space-y-3">
            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#">Home</BreadcrumbItem>
              <BreadcrumbEllipsis />
              <BreadcrumbItem href="#">Components</BreadcrumbItem>
              <BreadcrumbItem active>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#" className="flex items-center">
                <Home className="size-4" />
              </BreadcrumbItem>
              <BreadcrumbEllipsis />
              <BreadcrumbItem href="#">Base UI</BreadcrumbItem>
              <BreadcrumbItem active>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </DemoCard>

        {/* Styled Breadcrumbs */}
        <DemoCard title="Styled Breadcrumbs" description="Breadcrumbs with custom background and border styling.">
          <div className="space-y-4">
            {/* Background pill */}
            <div className="bg-muted border border-border rounded-xl px-4 py-2.5 w-fit">
              <Breadcrumb separator="chevron">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
                <BreadcrumbItem active>Analytics</BreadcrumbItem>
              </Breadcrumb>
            </div>

            {/* Blue accent */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 w-fit">
              <Breadcrumb separator="chevron">
                <BreadcrumbItem href="#" className="text-blue-600 hover:text-blue-800">Home</BreadcrumbItem>
                <BreadcrumbItem href="#" className="text-blue-600 hover:text-blue-800">Settings</BreadcrumbItem>
                <BreadcrumbItem active className="text-blue-800">Profile</BreadcrumbItem>
              </Breadcrumb>
            </div>

            {/* Dark */}
            <div className="bg-gray-900 rounded-xl px-4 py-2.5 w-fit">
              <Breadcrumb separator="chevron">
                <BreadcrumbItem href="#" className="text-gray-300 hover:text-white">Home</BreadcrumbItem>
                <BreadcrumbItem href="#" className="text-gray-300 hover:text-white">Library</BreadcrumbItem>
                <BreadcrumbItem active className="text-white">Data</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </DemoCard>

        {/* Deep Hierarchy */}
        <DemoCard title="Deep Hierarchy" description="Multi-level paths representing deep navigation." >
          <div className="space-y-3">
            <Breadcrumb separator="chevron">
              <BreadcrumbItem href="#">Home</BreadcrumbItem>
              <BreadcrumbItem href="#">Admin</BreadcrumbItem>
              <BreadcrumbItem href="#">Users</BreadcrumbItem>
              <BreadcrumbItem href="#">Alex Johnson</BreadcrumbItem>
              <BreadcrumbItem active>Edit Profile</BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="slash">
              <BreadcrumbItem href="#">Home</BreadcrumbItem>
              <BreadcrumbItem href="#">E-Commerce</BreadcrumbItem>
              <BreadcrumbItem href="#">Products</BreadcrumbItem>
              <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
              <BreadcrumbItem active>Laptops</BreadcrumbItem>
            </Breadcrumb>

            <Breadcrumb separator="dot">
              <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
              <BreadcrumbItem href="#">Reports</BreadcrumbItem>
              <BreadcrumbItem href="#">Monthly</BreadcrumbItem>
              <BreadcrumbItem active>May 2025</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </DemoCard>

        {/* In Page Header Context */}
        <DemoCard title="Breadcrumb in Page Header" description="How breadcrumbs appear in a realistic page header context.">
          <div className="space-y-4">
            {[
              { title: "User Management", items: ["Home", "Admin", "Users"] },
              { title: "Edit Product", items: ["Home", "E-Commerce", "Products", "Edit"] },
              { title: "Monthly Report", items: ["Home", "Analytics", "Reports", "Monthly"] },
            ].map(({ title: pageTitle, items }) => (
              <div key={pageTitle} className="flex items-start justify-between p-4 border border-border rounded-xl bg-muted/50">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{pageTitle}</h3>
                  <Breadcrumb separator="chevron" className="mt-1">
                    {items.map((item, i) => (
                      <BreadcrumbItem
                        key={`${pageTitle}-${item}`}
                        href={i < items.length - 1 ? "#" : undefined}
                        active={i === items.length - 1}
                      >
                        {item}
                      </BreadcrumbItem>
                    ))}
                  </Breadcrumb>
                </div>
                <User className="size-5 text-muted-foreground mt-1" />
              </div>
            ))}
          </div>
        </DemoCard>

      </div>
    </div>
  );
}
