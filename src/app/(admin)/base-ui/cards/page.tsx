import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bookmark, MoreHorizontal, Star, ArrowRight, User, BarChart2, ShoppingCart, TrendingUp } from "lucide-react";

const DEMO_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80";
const AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4";

export default function CardsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Cards</h1>
        <p className="text-muted-foreground">
          Flexible containers used to group and display content in a clear, concise format.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Basic Card */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Basic Card</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm">
                This is a basic card with content only — no header or footer. Use it for simple containers of information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Card with Header */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Card with Header</h2>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>A brief description of what this card contains.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Card content goes here. You can add any content — text, lists, images, or other components.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Card with Header & Footer */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Card with Header & Footer</h2>
          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>A card with header, body and footer sections.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The footer is great for placing action buttons or supplemental information.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Save changes</Button>
              <Button size="sm" variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Card with Image (top) */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Card with Image</h2>
          <Card className="overflow-hidden">
            <CardImage src={DEMO_IMAGE} alt="Mountain" className="h-40 rounded-t-xl" />
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-1">Mountain Landscape</h3>
              <p className="text-sm text-muted-foreground">A stunning view of mountain peaks at sunrise. Perfect for nature lovers.</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1">View</Button>
              <Button size="sm" variant="outline" className="flex-1">Share</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Horizontal Card */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Horizontal Card</h2>
          <Card className="flex-row overflow-hidden">
            <img src={DEMO_IMAGE} alt="Mountain" className="w-32 object-cover rounded-l-xl shrink-0" />
            <div className="flex flex-col flex-1">
              <CardContent className="pt-4">
                <h3 className="font-semibold mb-1">Mountain Landscape</h3>
                <p className="text-sm text-muted-foreground">A stunning view of mountain peaks. Perfect for nature lovers and hikers.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="gap-1.5">Read more <ArrowRight className="size-3.5" /></Button>
              </CardFooter>
            </div>
          </Card>
        </div>

        {/* Card with User Profile */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Profile Card</h2>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
              <img src={AVATAR} alt="User" className="size-20 rounded-full bg-muted" />
              <div>
                <h3 className="font-semibold text-base">Alex Johnson</h3>
                <p className="text-sm text-muted-foreground">Senior UI Designer</p>
              </div>
              <div className="flex gap-6 text-center text-sm">
                <div><p className="font-bold">124</p><p className="text-muted-foreground">Posts</p></div>
                <div><p className="font-bold">5.2k</p><p className="text-muted-foreground">Followers</p></div>
                <div><p className="font-bold">312</p><p className="text-muted-foreground">Following</p></div>
              </div>
            </CardContent>
            <CardFooter className="justify-center gap-2">
              <Button size="sm">Follow</Button>
              <Button size="sm" variant="outline">Message</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Colored Cards */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Colored Cards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-blue-600 border-blue-600 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">Primary</h3>
                <p className="text-sm text-blue-100">A primary colored card for important info.</p>
              </CardContent>
            </Card>
            <Card className="bg-green-600 border-green-600 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">Success</h3>
                <p className="text-sm text-green-100">A success colored card for positive info.</p>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500 border-yellow-500 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">Warning</h3>
                <p className="text-sm text-yellow-100">A warning colored card for caution info.</p>
              </CardContent>
            </Card>
            <Card className="bg-red-600 border-red-600 text-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-1">Danger</h3>
                <p className="text-sm text-red-100">A danger colored card for critical info.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Stats Cards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: "24,521", change: "+12%", icon: User, color: "text-blue-600 bg-blue-50" },
              { label: "Revenue", value: "$48,295", change: "+8.2%", icon: BarChart2, color: "text-green-600 bg-green-50" },
              { label: "Orders", value: "1,893", change: "+5.1%", icon: ShoppingCart, color: "text-purple-600 bg-purple-50" },
              { label: "Growth", value: "32.4%", change: "+2.4%", icon: TrendingUp, color: "text-orange-600 bg-orange-50" },
            ].map(({ label, value, change, icon: Icon, color }) => (
              <Card key={label}>
                <CardContent className="pt-6 space-y-3">
                  <div className={`size-10 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-green-600 font-medium">{change} this month</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Card with Actions Menu */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Card with Actions</h2>
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Project Alpha</CardTitle>
                  <CardDescription>Design & Development</CardDescription>
                </div>
                <button className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                  <MoreHorizontal className="size-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">A comprehensive redesign of the main product suite, including all mobile and web touchpoints.</p>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "68%" }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">68% complete</p>
            </CardContent>
            <CardFooter className="justify-between">
              <div className="flex -space-x-2">
                {["Alex", "Jane", "Bob"].map((name) => (
                  <img key={name} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=b6e3f4`} className="size-7 rounded-full border-2 border-white bg-muted" alt={name} />
                ))}
              </div>
              <div className="flex gap-3 text-muted-foreground">
                <button className="hover:text-red-500 transition-colors"><Heart className="size-4" /></button>
                <button className="hover:text-blue-500 transition-colors"><Bookmark className="size-4" /></button>
                <button className="hover:text-green-500 transition-colors"><Share2 className="size-4" /></button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Star Rating Card */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Review Card</h2>
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className={`size-4 ${i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-1.5">4.0 out of 5</span>
              </div>
              <blockquote className="text-sm text-muted-foreground italic border-l-2 border-border pl-3">
                "An absolutely fantastic product. The UI is clean and intuitive, and performance is top-notch. Highly recommend to any team looking to level up."
              </blockquote>
              <div className="flex items-center gap-2 pt-1">
                <img src={AVATAR} alt="Reviewer" className="size-8 rounded-full bg-muted" />
                <div>
                  <p className="text-sm font-medium leading-none">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">Senior Engineer · 2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
