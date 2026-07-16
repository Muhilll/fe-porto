import { Avatar, AvatarGroup } from "@/components/ui/avatar";

const seeds = ["Alex", "Jane", "Bob", "Sam", "Kate", "Tom", "Emma", "Chris"];
const imgUrl = (seed, bg = "b6e3f4") =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}`;

const initials = [
  { initials: "AL", color: "bg-blue-100 text-blue-700" },
  { initials: "JD", color: "bg-green-100 text-green-700" },
  { initials: "KM", color: "bg-purple-100 text-purple-700" },
  { initials: "TR", color: "bg-red-100 text-red-700" },
  { initials: "SW", color: "bg-yellow-100 text-yellow-700" },
  { initials: "EM", color: "bg-cyan-100 text-cyan-700" },
  { initials: "CP", color: "bg-orange-100 text-orange-700" },
  { initials: "NB", color: "bg-pink-100 text-pink-700" },
];

export default function AvatarsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Avatars</h1>
        <p className="text-muted-foreground">
          Visual representations of users or entities — image-based, initials-based, or with status indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Image Avatars */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Image Avatars</h2>
          <p className="text-sm text-muted-foreground mb-4">Circular avatars with photo images.</p>
          <div className="flex flex-wrap items-end gap-4">
            {seeds.slice(0, 6).map((seed) => (
              <Avatar key={seed} src={imgUrl(seed)} alt={seed} />
            ))}
          </div>
        </div>

        {/* Initial Avatars */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Initial Avatars</h2>
          <p className="text-sm text-muted-foreground mb-4">Colored avatars displaying user initials.</p>
          <div className="flex flex-wrap items-end gap-3">
            {initials.map(({ initials: ini, color }) => (
              <Avatar key={ini} initials={ini} color={color} />
            ))}
          </div>
        </div>

        {/* Avatar Sizes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Avatar Sizes</h2>
          <p className="text-sm text-muted-foreground mb-4">From XS to 3XL — all sizes available.</p>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Image</p>
              <div className="flex flex-wrap items-end gap-3">
                {(["xs", "sm", "default", "lg", "xl", "2xl"] ).map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1.5">
                    <Avatar src={imgUrl("Alex")} alt="Alex" size={size} />
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Initials</p>
              <div className="flex flex-wrap items-end gap-3">
                {(["xs", "sm", "default", "lg", "xl", "2xl"]).map((size) => (
                  <div key={size} className="flex flex-col items-center gap-1.5">
                    <Avatar initials="AL" size={size} color="bg-blue-100 text-blue-700" />
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rounded Shapes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Rounded Shapes</h2>
          <p className="text-sm text-muted-foreground mb-4">Circular, rounded square, or square avatars.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <Avatar src={imgUrl("Alex")} size="xl" rounded="full" />
                <span className="text-xs text-muted-foreground">Circle</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Avatar src={imgUrl("Jane")} size="xl" rounded="md" />
                <span className="text-xs text-muted-foreground">Rounded</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Avatar src={imgUrl("Bob")} size="xl" rounded="none" />
                <span className="text-xs text-muted-foreground">Square</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <Avatar initials="AL" size="xl" rounded="full" color="bg-blue-100 text-blue-700" />
                <span className="text-xs text-muted-foreground">Circle</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Avatar initials="JD" size="xl" rounded="md" color="bg-green-100 text-green-700" />
                <span className="text-xs text-muted-foreground">Rounded</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Avatar initials="KM" size="xl" rounded="none" color="bg-purple-100 text-purple-700" />
                <span className="text-xs text-muted-foreground">Square</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Status Indicators</h2>
          <p className="text-sm text-muted-foreground mb-4">Show user presence with colored status dots.</p>
          <div className="flex flex-wrap items-end gap-6">
            {[
              { seed: "Alex", status: "online", label: "Online" },
              { seed: "Jane", status: "busy", label: "Busy" },
              { seed: "Bob", status: "away", label: "Away" },
              { seed: "Sam", status: "offline", label: "Offline" },
            ].map(({ seed, status, label }) => (
              <div key={seed} className="flex flex-col items-center gap-1.5">
                <Avatar src={imgUrl(seed)} alt={seed} size="lg" status={status} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-6 mt-4">
            {[
              { initials: "AL", color: "bg-blue-100 text-blue-700", status: "online", label: "Online" },
              { initials: "JD", color: "bg-green-100 text-green-700", status: "busy", label: "Busy" },
              { initials: "KM", color: "bg-purple-100 text-purple-700", status: "away", label: "Away" },
              { initials: "TR", color: "bg-red-100 text-red-700", status: "offline", label: "Offline" },
            ].map(({ initials: ini, color, status, label }) => (
              <div key={ini} className="flex flex-col items-center gap-1.5">
                <Avatar initials={ini} color={color} size="lg" status={status} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Group */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Avatar Group</h2>
          <p className="text-sm text-muted-foreground mb-4">Stacked avatar groups with overflow count.</p>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Image Group (max 5)</p>
              <AvatarGroup max={5}>
                {seeds.map((seed) => (
                  <Avatar key={seed} src={imgUrl(seed)} alt={seed} />
                ))}
              </AvatarGroup>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Initials Group (max 4)</p>
              <AvatarGroup max={4}>
                {initials.map(({ initials: ini, color }) => (
                  <Avatar key={ini} initials={ini} color={color} />
                ))}
              </AvatarGroup>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Large Group (max 3)</p>
              <AvatarGroup max={3} size="lg">
                {seeds.map((seed) => (
                  <Avatar key={seed} src={imgUrl(seed)} alt={seed} size="lg" />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>

        {/* Avatar with Info */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-1">Avatar with User Info</h2>
          <p className="text-sm text-muted-foreground mb-4">Combined avatar + name + role layout.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { seed: "Alex", name: "Alex Johnson", role: "UI Designer", status: "online", bg: "b6e3f4" },
              { seed: "Jane", name: "Jane Doe", role: "Backend Dev", status: "busy", bg: "c0aede" },
              { seed: "Bob", name: "Bob Smith", role: "Product Manager", status: "away", bg: "d1d4f9" },
              { seed: "Sam", name: "Sam Wilson", role: "DevOps Engineer", status: "offline", bg: "ffd5dc" },
            ].map(({ seed, name, role, status, bg }) => (
              <div key={seed} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:shadow-sm transition-shadow">
                <Avatar src={imgUrl(seed, bg)} alt={name} size="lg" status={status} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{name}</p>
                  <p className="text-xs text-muted-foreground truncate">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
