import { Spinner, SpinnerGrow, SpinnerDots, SpinnerBars } from "@/components/ui/spinner";

const COLORS = ["default", "green", "red", "yellow", "purple", "cyan", "orange", "pink", "gray"];
const SIZES = ["xs", "sm", "default", "lg", "xl"];

export default function SpinnersPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Spinners</h1>
        <p className="text-muted-foreground">
          Loading indicators to signal that content or an operation is in progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Border Spinner - Colors */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Border Spinner</h2>
          <p className="text-sm text-muted-foreground mb-4">Classic circular spinning border, multiple colors.</p>
          <div className="flex flex-wrap items-center gap-4">
            {COLORS.map((color) => (
              <Spinner key={color} color={color} />
            ))}
          </div>
        </div>

        {/* Grow Spinner - Colors */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Grow Spinner</h2>
          <p className="text-sm text-muted-foreground mb-4">Pulsing circle animation, multiple colors.</p>
          <div className="flex flex-wrap items-center gap-4">
            {COLORS.map((color) => (
              <SpinnerGrow key={color} color={color} />
            ))}
          </div>
        </div>

        {/* Dots Spinner - Colors */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Dots Spinner</h2>
          <p className="text-sm text-muted-foreground mb-4">Three bouncing dots with staggered animation.</p>
          <div className="flex flex-wrap items-center gap-6">
            {COLORS.slice(0, 7).map((color) => (
              <SpinnerDots key={color} color={color} />
            ))}
          </div>
        </div>

        {/* Bars Spinner - Colors */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Bars Spinner</h2>
          <p className="text-sm text-muted-foreground mb-4">Vertical bar wave animation.</p>
          <div className="flex flex-wrap items-center gap-6">
            {COLORS.slice(0, 7).map((color) => (
              <SpinnerBars key={color} color={color} />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Spinner Sizes</h2>
          <p className="text-sm text-muted-foreground mb-4">XS, SM, Default, LG, XL sizes available.</p>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Border</p>
              <div className="flex flex-wrap items-end gap-4">
                {SIZES.map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <Spinner size={size} color="blue" />
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Dots</p>
              <div className="flex flex-wrap items-end gap-6">
                {SIZES.map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <SpinnerDots size={size} color="purple" />
                    <span className="text-xs text-muted-foreground">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Spinner on Colored Background */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Spinner on Colored Background</h2>
          <p className="text-sm text-muted-foreground mb-4">White spinners on colored backgrounds.</p>
          <div className="flex flex-wrap gap-3">
            {[
              "bg-blue-600", "bg-green-600", "bg-red-600",
              "bg-yellow-500", "bg-purple-600", "bg-gray-800",
            ].map((bg) => (
              <div
                key={bg}
                className={`${bg} size-16 rounded-xl flex items-center justify-center`}
              >
                <Spinner color="white" />
              </div>
            ))}
          </div>
        </div>

        {/* Spinner inside Buttons */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Spinner in Buttons</h2>
          <p className="text-sm text-muted-foreground mb-4">Loading state inside action buttons.</p>
          <div className="flex flex-wrap gap-3">
            <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground opacity-80 cursor-not-allowed">
              <Spinner size="xs" color="white" /> Loading...
            </button>
            <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border text-foreground bg-card cursor-not-allowed opacity-80">
              <Spinner size="xs" color="default" /> Saving...
            </button>
            <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white cursor-not-allowed opacity-80">
              <Spinner size="xs" color="white" /> Uploading...
            </button>
            <button disabled className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white cursor-not-allowed opacity-80">
              <Spinner size="xs" color="white" /> Deleting...
            </button>
          </div>
        </div>

        {/* Full Page Loading Overlay Demo */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Centered Loading State</h2>
          <p className="text-sm text-muted-foreground mb-4">Spinner centered inside a container.</p>
          <div className="relative border border-border rounded-xl h-40 flex flex-col items-center justify-center gap-3 bg-muted/50">
            <Spinner size="lg" color="blue" />
            <p className="text-sm text-muted-foreground">Loading your data, please wait...</p>
          </div>
        </div>

        {/* Inline Spinner */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-1">Inline Spinners</h2>
          <p className="text-sm text-muted-foreground mb-4">Spinners used inline within text or other content.</p>
          <div className="space-y-3">
            <div className="text-sm text-foreground flex items-center gap-2">
              <Spinner size="xs" color="blue" /> Fetching latest records from database...
            </div>
            <div className="text-sm text-foreground flex items-center gap-2">
              <SpinnerDots size="xs" color="purple" /> Syncing data with server...
            </div>
            <div className="text-sm text-foreground flex items-center gap-2">
              <SpinnerGrow size="xs" color="green" /> Verifying your credentials...
            </div>
            <div className="text-sm text-foreground flex items-center gap-2">
              <SpinnerBars size="xs" color="orange" /> Processing payment...
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
