"use client";

import { useState } from "react";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Info, Trash2, LogOut, Upload, User, Mail, Lock } from "lucide-react";

function DemoButton({ label, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 ${className}`}
    >
      {label}
    </button>
  );
}

export default function ModalsPage() {
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));
  const close = (key) => setOpen((p) => ({ ...p, [key]: false }));

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Modals</h1>
        <p className="text-muted-foreground">
          Dialogs for displaying important content, confirmations, or forms on top of the current page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Basic Modal */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Basic Modal</h2>
          <p className="text-sm text-muted-foreground">A simple modal with header, body, and footer.</p>
          <DemoButton label="Open Modal" onClick={() => toggle("basic")} />
          <Modal open={!!open["basic"]} onClose={() => close("basic")} className="max-w-md">
            <ModalHeader>
              <ModalTitle>Basic Modal</ModalTitle>
              <ModalClose onClose={() => close("basic")} />
            </ModalHeader>
            <ModalBody>
              <p className="text-sm text-muted-foreground">
                This is a basic modal example. You can place any content here — text, forms, images, or other components. Click outside or press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">Esc</kbd> to close.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" size="sm" onClick={() => close("basic")}>Cancel</Button>
              <Button size="sm" onClick={() => close("basic")}>Confirm</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* Modal Sizes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Modal Sizes</h2>
          <p className="text-sm text-muted-foreground">Small, default, large, and extra-large modal sizes.</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Small", "sm", "max-w-sm"],
              ["Default", "md", "max-w-md"],
              ["Large", "lg", "max-w-2xl"],
              ["XL", "xl", "max-w-4xl"],
            ].map(([label, key, sizeClass]) => (
              <div key={key}>
                <DemoButton label={label} onClick={() => toggle(`size-${key}`)} />
                <Modal open={!!open[`size-${key}`]} onClose={() => close(`size-${key}`)} className={sizeClass}>
                  <ModalHeader>
                    <ModalTitle>{label} Modal</ModalTitle>
                    <ModalClose onClose={() => close(`size-${key}`)} />
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-sm text-muted-foreground">This is a <strong>{label.toLowerCase()}</strong> sized modal ({sizeClass}). Resize as needed for your content.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button size="sm" onClick={() => close(`size-${key}`)}>Close</Button>
                  </ModalFooter>
                </Modal>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Modal */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Confirmation Modal</h2>
          <p className="text-sm text-muted-foreground">Ask users to confirm a destructive action.</p>
          <DemoButton label="Delete Item" onClick={() => toggle("confirm")} className="bg-red-600 hover:bg-red-700" />
          <Modal open={!!open["confirm"]} onClose={() => close("confirm")} className="max-w-sm">
            <ModalBody className="pt-6 text-center space-y-3">
              <div className="mx-auto size-14 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="size-7 text-red-600" />
              </div>
              <h2 className="font-semibold text-base">Delete this item?</h2>
              <p className="text-sm text-muted-foreground">This action cannot be undone. The item and all its associated data will be permanently removed.</p>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button variant="outline" size="sm" onClick={() => close("confirm")}>Cancel</Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => close("confirm")}>Yes, Delete</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* Alert Modals */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Alert Modals</h2>
          <p className="text-sm text-muted-foreground">Informational, success, and warning modals.</p>
          <div className="flex flex-wrap gap-2">
            {[
              ["Info", "info", Info, "text-blue-600", "bg-blue-100"],
              ["Success", "success", CheckCircle2, "text-green-600", "bg-green-100"],
              ["Warning", "warning", AlertTriangle, "text-yellow-600", "bg-yellow-100"],
            ].map(([label, key, Icon, iconColor, iconBg]) => (
              <div key={key}>
                <DemoButton
                  label={label}
                  onClick={() => toggle(`alert-${key}`)}
                  className={
                    key === "info" ? "bg-blue-600 hover:bg-blue-700" :
                    key === "success" ? "bg-green-600 hover:bg-green-700" :
                    "bg-yellow-500 hover:bg-yellow-600"
                  }
                />
                <Modal open={!!open[`alert-${key}`]} onClose={() => close(`alert-${key}`)} className="max-w-sm">
                  <ModalBody className="pt-6 text-center space-y-3">
                    <div className={`mx-auto size-14 rounded-full flex items-center justify-center ${iconBg}`}>
                      <Icon className={`size-7 ${iconColor}`} />
                    </div>
                    <h2 className="font-semibold text-base">{label} Message</h2>
                    <p className="text-sm text-muted-foreground">This is an {label.toLowerCase()} modal to inform users about something important.</p>
                  </ModalBody>
                  <ModalFooter className="justify-center">
                    <Button size="sm" onClick={() => close(`alert-${key}`)}>Got it</Button>
                  </ModalFooter>
                </Modal>
              </div>
            ))}
          </div>
        </div>

        {/* Form Modal */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Form Modal</h2>
          <p className="text-sm text-muted-foreground">A modal containing a form for user input.</p>
          <DemoButton label="Add User" onClick={() => toggle("form")} />
          <Modal open={!!open["form"]} onClose={() => close("form")} className="max-w-md">
            <ModalHeader>
              <ModalTitle>Add New User</ModalTitle>
              <ModalClose onClose={() => close("form")} />
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input type="text" placeholder="John Doe" className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input type="email" placeholder="john@example.com" className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input type="password" placeholder="••••••••" className="w-full border border-border rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" size="sm" onClick={() => close("form")}>Cancel</Button>
              <Button size="sm" onClick={() => close("form")}>Create User</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* Sign Out Modal */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Sign Out Modal</h2>
          <p className="text-sm text-muted-foreground">A common logout confirmation modal.</p>
          <DemoButton label="Sign Out" onClick={() => toggle("logout")} className="bg-gray-800 hover:bg-gray-900" />
          <Modal open={!!open["logout"]} onClose={() => close("logout")} className="max-w-sm">
            <ModalBody className="pt-6 text-center space-y-3">
              <div className="mx-auto size-14 rounded-full bg-muted flex items-center justify-center">
                <LogOut className="size-7 text-muted-foreground" />
              </div>
              <h2 className="font-semibold text-base">Sign out?</h2>
              <p className="text-sm text-muted-foreground">You will be signed out of your account and redirected to the login page.</p>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button variant="outline" size="sm" onClick={() => close("logout")}>Stay signed in</Button>
              <Button size="sm" className="bg-gray-800 hover:bg-gray-900" onClick={() => close("logout")}>Sign out</Button>
            </ModalFooter>
          </Modal>
        </div>

        {/* Upload Modal */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3 lg:col-span-2">
          <h2 className="text-lg font-semibold">Upload Modal</h2>
          <p className="text-sm text-muted-foreground">A file upload modal with a drag-and-drop area.</p>
          <DemoButton label="Upload Files" onClick={() => toggle("upload")} />
          <Modal open={!!open["upload"]} onClose={() => close("upload")} className="max-w-lg">
            <ModalHeader>
              <ModalTitle>Upload Files</ModalTitle>
              <ModalClose onClose={() => close("upload")} />
            </ModalHeader>
            <ModalBody className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-10 text-center space-y-3 hover:bg-muted transition-colors cursor-pointer">
                <div className="mx-auto size-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Upload className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Drag & drop files here</p>
                  <p className="text-xs text-muted-foreground mt-1">or <span className="text-blue-600 cursor-pointer hover:underline">browse from your computer</span></p>
                </div>
                <p className="text-xs text-muted-foreground">Supports: PNG, JPG, PDF, DOCX up to 10MB</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" size="sm" onClick={() => close("upload")}>Cancel</Button>
              <Button size="sm" onClick={() => close("upload")}>Upload</Button>
            </ModalFooter>
          </Modal>
        </div>

      </div>
    </div>
  );
}
