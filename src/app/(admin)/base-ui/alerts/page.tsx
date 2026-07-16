"use client";

import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertDismiss,
} from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  Lightbulb,
  Megaphone,
  ShieldCheck,
  Flame,
  Zap,
} from "lucide-react";

export default function AlertsPage() {
  const [dismissed, setDismissed] = useState({});
  const dismiss = (key) => setDismissed((p) => ({ ...p, [key]: true }));

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="text-muted-foreground">
          Provide contextual feedback messages for typical user actions with flexible alert messages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Default Alerts */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-4">Default Alerts</h2>
          <Alert variant="default">
            <AlertIcon variant="default" icon={Info} />
            <AlertContent><strong>Info!</strong> A simple primary alert — check it out.</AlertContent>
          </Alert>
          <Alert variant="success">
            <AlertIcon variant="success" icon={CheckCircle2} />
            <AlertContent><strong>Success!</strong> A simple success alert — check it out.</AlertContent>
          </Alert>
          <Alert variant="warning">
            <AlertIcon variant="warning" icon={TriangleAlert} />
            <AlertContent><strong>Warning!</strong> A simple warning alert — check it out.</AlertContent>
          </Alert>
          <Alert variant="danger">
            <AlertIcon variant="danger" icon={AlertCircle} />
            <AlertContent><strong>Danger!</strong> A simple danger alert — check it out.</AlertContent>
          </Alert>
        </div>

        {/* Filled Alerts */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-4">Filled Alerts</h2>
          <Alert variant="filled-default">
            <AlertIcon variant="filled-default" icon={Info} />
            <AlertContent><strong>Info!</strong> A solid primary alert — check it out.</AlertContent>
          </Alert>
          <Alert variant="filled-success">
            <AlertIcon variant="filled-success" icon={CheckCircle2} />
            <AlertContent><strong>Success!</strong> A solid success alert — check it out.</AlertContent>
          </Alert>
          <Alert variant="filled-warning">
            <AlertIcon variant="filled-warning" icon={TriangleAlert} />
            <AlertContent><strong>Warning!</strong> A solid warning alert — check it out.</AlertContent>
          </Alert>
          <Alert variant="filled-danger">
            <AlertIcon variant="filled-danger" icon={AlertCircle} />
            <AlertContent><strong>Danger!</strong> A solid danger alert — check it out.</AlertContent>
          </Alert>
        </div>

        {/* Border Accent Alerts */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-4">Border Accent Alerts</h2>
          <Alert variant="accent-default">
            <AlertIcon variant="accent-default" icon={Info} />
            <AlertContent><strong>Primary!</strong> Alert with left border accent.</AlertContent>
          </Alert>
          <Alert variant="accent-success">
            <AlertIcon variant="accent-success" icon={CheckCircle2} />
            <AlertContent><strong>Success!</strong> Alert with left border accent.</AlertContent>
          </Alert>
          <Alert variant="accent-warning">
            <AlertIcon variant="accent-warning" icon={TriangleAlert} />
            <AlertContent><strong>Warning!</strong> Alert with left border accent.</AlertContent>
          </Alert>
          <Alert variant="accent-danger">
            <AlertIcon variant="accent-danger" icon={AlertCircle} />
            <AlertContent><strong>Danger!</strong> Alert with left border accent.</AlertContent>
          </Alert>
        </div>

        {/* Dismissible Alerts */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-4">Dismissible Alerts</h2>
          {!dismissed["d1"] && (
            <Alert variant="default" className="pr-8">
              <AlertIcon variant="default" icon={Info} />
              <AlertContent><strong>Info!</strong> Click the × to dismiss this alert.</AlertContent>
              <AlertDismiss onClick={() => dismiss("d1")} />
            </Alert>
          )}
          {!dismissed["d2"] && (
            <Alert variant="success" className="pr-8">
              <AlertIcon variant="success" icon={CheckCircle2} />
              <AlertContent><strong>Success!</strong> Click the × to dismiss this alert.</AlertContent>
              <AlertDismiss onClick={() => dismiss("d2")} />
            </Alert>
          )}
          {!dismissed["d3"] && (
            <Alert variant="warning" className="pr-8">
              <AlertIcon variant="warning" icon={TriangleAlert} />
              <AlertContent><strong>Warning!</strong> Click the × to dismiss this alert.</AlertContent>
              <AlertDismiss onClick={() => dismiss("d3")} />
            </Alert>
          )}
          {!dismissed["d4"] && (
            <Alert variant="danger" className="pr-8">
              <AlertIcon variant="danger" icon={AlertCircle} />
              <AlertContent><strong>Danger!</strong> Click the × to dismiss this alert.</AlertContent>
              <AlertDismiss onClick={() => dismiss("d4")} />
            </Alert>
          )}
          {Object.keys(dismissed).length === 4 && (
            <p className="text-sm text-muted-foreground text-center py-4">All alerts dismissed! Refresh to reset.</p>
          )}
        </div>

        {/* Alert with Title & Description */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-4">Alert with Description</h2>
          <Alert variant="default" className="items-start">
            <AlertIcon variant="default" icon={Info} />
            <AlertContent>
              <AlertTitle>New update available</AlertTitle>
              <AlertDescription>A new software version is available. Please update to get all new features and security patches.</AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="success" className="items-start">
            <AlertIcon variant="success" icon={CheckCircle2} />
            <AlertContent>
              <AlertTitle>Payment successful</AlertTitle>
              <AlertDescription>Your payment has been processed. A receipt has been sent to your email address.</AlertDescription>
            </AlertContent>
          </Alert>
          <Alert variant="danger" className="items-start">
            <AlertIcon variant="danger" icon={AlertCircle} />
            <AlertContent>
              <AlertTitle>Account suspended</AlertTitle>
              <AlertDescription>Your account has been temporarily suspended due to suspicious activity. Please contact support.</AlertDescription>
            </AlertContent>
          </Alert>
        </div>

        {/* Custom Icon Alerts */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-4">Custom Icon Alerts</h2>
          <Alert className="bg-purple-50 text-purple-800 border border-purple-200">
            <Lightbulb className="size-5 shrink-0 mt-0.5 text-purple-500" />
            <AlertContent><strong>Tip!</strong> Here's a helpful tip to improve your workflow.</AlertContent>
          </Alert>
          <Alert className="bg-orange-50 text-orange-800 border border-orange-200">
            <Megaphone className="size-5 shrink-0 mt-0.5 text-orange-500" />
            <AlertContent><strong>Announcement!</strong> We have some exciting news to share.</AlertContent>
          </Alert>
          <Alert className="bg-teal-50 text-teal-800 border border-teal-200">
            <ShieldCheck className="size-5 shrink-0 mt-0.5 text-teal-500" />
            <AlertContent><strong>Secure!</strong> Your connection is encrypted and secure.</AlertContent>
          </Alert>
          <Alert className="bg-rose-50 text-rose-800 border border-rose-200">
            <Flame className="size-5 shrink-0 mt-0.5 text-rose-500" />
            <AlertContent><strong>Hot!</strong> This offer expires in the next 24 hours.</AlertContent>
          </Alert>
        </div>

        {/* Alert with Actions */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Alert with Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Alert variant="default" className="flex-col items-start gap-3">
              <div className="flex items-start gap-3">
                <AlertIcon variant="default" icon={Zap} />
                <AlertContent>
                  <AlertTitle>Upgrade your plan</AlertTitle>
                  <AlertDescription>Unlock premium features by upgrading to our Pro plan today.</AlertDescription>
                </AlertContent>
              </div>
              <div className="flex gap-2 ml-8">
                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Upgrade now</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-blue-300 text-blue-700 hover:bg-blue-100 transition-colors">Learn more</button>
              </div>
            </Alert>
            <Alert variant="danger" className="flex-col items-start gap-3">
              <div className="flex items-start gap-3">
                <AlertIcon variant="danger" icon={AlertCircle} />
                <AlertContent>
                  <AlertTitle>Delete account</AlertTitle>
                  <AlertDescription>This will permanently delete your account and all associated data.</AlertDescription>
                </AlertContent>
              </div>
              <div className="flex gap-2 ml-8">
                <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
                <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-red-300 text-red-700 hover:bg-red-100 transition-colors">Cancel</button>
              </div>
            </Alert>
          </div>
        </div>

      </div>
    </div>
  );
}
