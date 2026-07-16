"use client";

import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { Home, User, Settings, Bell, FileText, Star, Lock, Mail } from "lucide-react";

const tabContent = {
  home: "This is the Home tab content. Welcome to the dashboard overview. Here you'll find key metrics, recent activity, and quick actions for your workspace.",
  profile: "This is the Profile tab content. Manage your personal information, avatar, and account preferences. Keep your details up to date.",
  settings: "This is the Settings tab content. Configure application behavior, notifications, privacy, and security settings from one central place.",
  messages: "This is the Messages tab content. View and reply to all your incoming messages, conversations, and support tickets from here.",
};

function DemoCard({ title, description, children }) {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

function SampleContent({ tab }) {
  return (
    <p className="text-sm text-muted-foreground leading-relaxed">
      {tabContent[tab] || `Content for the "${tab}" tab. Add your custom content here.`}
    </p>
  );
}

export default function TabsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground">
          Organize content into switchable panels. Multiple styles and configurations available.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">

        {/* Line Tabs (Default) */}
        <DemoCard title="Line Tabs" description="Classic underline indicator on the active tab.">
          <Tabs defaultValue="home">
            <TabList variant="line">
              <Tab value="home" _variant="line">Home</Tab>
              <Tab value="profile" _variant="line">Profile</Tab>
              <Tab value="settings" _variant="line">Settings</Tab>
              <Tab value="messages" _variant="line">Messages</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
            <TabPanel value="settings"><SampleContent tab="settings" /></TabPanel>
            <TabPanel value="messages"><SampleContent tab="messages" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Pill Tabs */}
        <DemoCard title="Pill Tabs" description="Segmented pill-style tabs with a soft background.">
          <Tabs defaultValue="home">
            <TabList variant="pill">
              <Tab value="home" _variant="pill">Home</Tab>
              <Tab value="profile" _variant="pill">Profile</Tab>
              <Tab value="settings" _variant="pill">Settings</Tab>
              <Tab value="messages" _variant="pill">Messages</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
            <TabPanel value="settings"><SampleContent tab="settings" /></TabPanel>
            <TabPanel value="messages"><SampleContent tab="messages" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Boxed Tabs */}
        <DemoCard title="Boxed Tabs" description="Filled background on the active tab with a bordered layout.">
          <Tabs defaultValue="home">
            <TabList variant="boxed">
              <Tab value="home" _variant="boxed">Home</Tab>
              <Tab value="profile" _variant="boxed">Profile</Tab>
              <Tab value="settings" _variant="boxed">Settings</Tab>
              <Tab value="messages" _variant="boxed">Messages</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
            <TabPanel value="settings"><SampleContent tab="settings" /></TabPanel>
            <TabPanel value="messages"><SampleContent tab="messages" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Underline Tabs */}
        <DemoCard title="Underline Tabs" description="Spaced tabs with underline indicator — clean and minimal.">
          <Tabs defaultValue="home">
            <TabList variant="underline">
              <Tab value="home" _variant="underline">Home</Tab>
              <Tab value="profile" _variant="underline">Profile</Tab>
              <Tab value="settings" _variant="underline">Settings</Tab>
              <Tab value="messages" _variant="underline">Messages</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
            <TabPanel value="settings"><SampleContent tab="settings" /></TabPanel>
            <TabPanel value="messages"><SampleContent tab="messages" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Tabs with Icons */}
        <DemoCard title="Tabs with Icons" description="Tabs with an icon alongside the label.">
          <Tabs defaultValue="home">
            <TabList variant="line">
              <Tab value="home" icon={Home} _variant="line">Home</Tab>
              <Tab value="profile" icon={User} _variant="line">Profile</Tab>
              <Tab value="settings" icon={Settings} _variant="line">Settings</Tab>
              <Tab value="messages" icon={Bell} _variant="line">Messages</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
            <TabPanel value="settings"><SampleContent tab="settings" /></TabPanel>
            <TabPanel value="messages"><SampleContent tab="messages" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Pill Tabs with Icons */}
        <DemoCard title="Pill Tabs with Icons" description="Pill tabs combined with icons.">
          <Tabs defaultValue="home">
            <TabList variant="pill">
              <Tab value="home" icon={Home} _variant="pill">Home</Tab>
              <Tab value="profile" icon={User} _variant="pill">Profile</Tab>
              <Tab value="settings" icon={Settings} _variant="pill">Settings</Tab>
              <Tab value="messages" icon={Mail} _variant="pill">Messages</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
            <TabPanel value="settings"><SampleContent tab="settings" /></TabPanel>
            <TabPanel value="messages"><SampleContent tab="messages" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Disabled Tabs */}
        <DemoCard title="Tabs with Disabled State" description="Individual tabs can be marked as disabled.">
          <Tabs defaultValue="home">
            <TabList variant="line">
              <Tab value="home" _variant="line">Home</Tab>
              <Tab value="profile" _variant="line">Profile</Tab>
              <Tab value="settings" _variant="line" disabled>Settings (disabled)</Tab>
              <Tab value="messages" _variant="line" disabled>Messages (disabled)</Tab>
            </TabList>
            <TabPanel value="home"><SampleContent tab="home" /></TabPanel>
            <TabPanel value="profile"><SampleContent tab="profile" /></TabPanel>
          </Tabs>
        </DemoCard>

        {/* Vertical Tabs */}
        <DemoCard title="Vertical Tabs" description="Tabs arranged vertically on the left side.">
          <Tabs defaultValue="home">
            <div className="flex gap-0">
              <TabList variant="vertical">
                <Tab value="home" icon={Home} _variant="vertical">Home</Tab>
                <Tab value="profile" icon={User} _variant="vertical">Profile</Tab>
                <Tab value="documents" icon={FileText} _variant="vertical">Documents</Tab>
                <Tab value="starred" icon={Star} _variant="vertical">Starred</Tab>
                <Tab value="security" icon={Lock} _variant="vertical">Security</Tab>
              </TabList>
              <div className="flex-1 pl-6 pt-1">
                <TabPanel value="home" className="mt-0"><SampleContent tab="home" /></TabPanel>
                <TabPanel value="profile" className="mt-0"><SampleContent tab="profile" /></TabPanel>
                <TabPanel value="documents" className="mt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">Manage and organize all your documents, reports, and files in one place. Sort, filter, and search with ease.</p>
                </TabPanel>
                <TabPanel value="starred" className="mt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">View all your starred or bookmarked items for quick access. Star important items to find them later.</p>
                </TabPanel>
                <TabPanel value="security" className="mt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">Review security settings, active sessions, two-factor authentication, and login activity.</p>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </DemoCard>

      </div>
    </div>
  );
}
