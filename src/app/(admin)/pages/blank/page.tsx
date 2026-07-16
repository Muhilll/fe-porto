"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BlankPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Blank Page</h1>
        <p className="text-muted-foreground mt-1">Start building your custom layout from this blank template.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your content goes here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
