import { Button } from "@/components/ui/button";
import { Download, Mail, Send, Settings, Smile, Trash, Plus } from "lucide-react";

export default function ButtonsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Buttons</h1>
        <p className="text-muted-foreground">
          A comprehensive collection of button styles and variations for your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Default Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Success</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">Danger</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Warning</Button>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Info</Button>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white">Dark</Button>
          </div>
        </div>

        {/* Button Outline */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Button Outline</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">Primary</Button>
            <Button variant="outline" className="border-gray-500 text-muted-foreground hover:bg-gray-500 hover:text-white">Secondary</Button>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">Success</Button>
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">Danger</Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">Warning</Button>
            <Button variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white">Info</Button>
          </div>
        </div>

        {/* Button Rounded */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Button Rounded</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full">Primary</Button>
            <Button variant="secondary" className="rounded-full">Secondary</Button>
            <Button className="rounded-full bg-green-600 hover:bg-green-700 text-white">Success</Button>
            <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white">Danger</Button>
            <Button className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-white">Warning</Button>
            <Button className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-white">Info</Button>
          </div>
        </div>

        {/* Button Outline Rounded */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Button Outline Rounded</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">Primary</Button>
            <Button variant="outline" className="rounded-full border-gray-500 text-muted-foreground hover:bg-gray-500 hover:text-white">Secondary</Button>
            <Button variant="outline" className="rounded-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">Success</Button>
            <Button variant="outline" className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">Danger</Button>
          </div>
        </div>

        {/* Soft Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Soft Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200">Primary</Button>
            <Button className="bg-muted text-foreground hover:bg-gray-200">Secondary</Button>
            <Button className="bg-green-100 text-green-700 hover:bg-green-200">Success</Button>
            <Button className="bg-red-100 text-red-700 hover:bg-red-200">Danger</Button>
            <Button className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">Warning</Button>
            <Button className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200">Info</Button>
          </div>
        </div>

        {/* Soft Rounded Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Soft Rounded Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200">Primary</Button>
            <Button className="rounded-full bg-muted text-foreground hover:bg-gray-200">Secondary</Button>
            <Button className="rounded-full bg-green-100 text-green-700 hover:bg-green-200">Success</Button>
            <Button className="rounded-full bg-red-100 text-red-700 hover:bg-red-200">Danger</Button>
          </div>
        </div>

        {/* Gradient Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Gradient Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 hover:from-blue-600 hover:to-indigo-700">Primary</Button>
            <Button className="bg-gradient-to-r from-green-400 to-green-600 text-white border-0 hover:from-green-500 hover:to-green-700">Success</Button>
            <Button className="bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 hover:from-red-600 hover:to-rose-700">Danger</Button>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 hover:from-yellow-500 hover:to-orange-600">Warning</Button>
          </div>
        </div>

        {/* Gradient Rounded Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Gradient Rounded Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 hover:from-blue-600 hover:to-indigo-700">Primary</Button>
            <Button className="rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white border-0 hover:from-green-500 hover:to-green-700">Success</Button>
            <Button className="rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white border-0 hover:from-red-600 hover:to-rose-700">Danger</Button>
          </div>
        </div>

        {/* Ghost Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Ghost Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" className="text-primary hover:bg-blue-50 hover:text-blue-700">Primary</Button>
            <Button variant="ghost" className="text-muted-foreground hover:bg-muted">Secondary</Button>
            <Button variant="ghost" className="text-green-600 hover:bg-green-50 hover:text-green-700">Success</Button>
            <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700">Danger</Button>
          </div>
        </div>

        {/* Disabled Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Button Disabled</h2>
          <div className="flex flex-wrap gap-3">
            <Button disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600" disabled>Gradient</Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Button Sizes</h2>
          <div className="flex flex-wrap items-end gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Icon Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Icon Buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="icon" className="rounded-full"><Download /></Button>
            <Button size="icon" variant="outline"><Settings /></Button>
            <Button size="icon" className="bg-red-100 text-red-600 hover:bg-red-200"><Trash /></Button>
            <Button className="gap-2"><Mail className="size-4" /> Send Email</Button>
            <Button variant="outline" className="gap-2">Add New <Plus className="size-4" /></Button>
          </div>
        </div>

        {/* Block Button */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Block Button</h2>
          <div className="flex flex-col gap-3">
            <Button className="w-full">Primary Block Button</Button>
            <Button variant="outline" className="w-full">Secondary Block Button</Button>
          </div>
        </div>

        {/* Toggle & Basic Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Toggle & Basic Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="aria-pressed:bg-blue-600 aria-pressed:text-white" aria-pressed="true">
              Active Toggle
            </Button>
            <Button variant="outline" className="aria-pressed:bg-blue-600 aria-pressed:text-white" aria-pressed="false">
              Inactive Toggle
            </Button>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
              Basic Button (No UI)
            </button>
          </div>
        </div>

        {/* Button Tags */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Button Tags</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <a href="#" className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Link Tag
            </a>
            <input type="button" value="Input Button" className="cursor-pointer inline-flex h-9 items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors" />
            <input type="submit" value="Submit Tag" className="cursor-pointer inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors" />
          </div>
        </div>

        {/* Button Group */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Button Group</h2>
          <div className="flex flex-wrap gap-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Button className="rounded-r-none border-r border-blue-700 hover:bg-blue-700">Left</Button>
              <Button className="rounded-none border-x border-blue-700 hover:bg-blue-700">Middle</Button>
              <Button className="rounded-l-none border-l border-blue-700 hover:bg-blue-700">Right</Button>
            </div>
            
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <Button variant="outline" className="rounded-r-none border-r-0 hover:bg-muted focus:z-10">1</Button>
              <Button variant="outline" className="rounded-none border-x-0 hover:bg-muted focus:z-10">2</Button>
              <Button variant="outline" className="rounded-none hover:bg-muted focus:z-10">3</Button>
              <Button variant="outline" className="rounded-l-none border-l-0 hover:bg-muted focus:z-10">4</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
