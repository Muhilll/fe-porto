import { cn } from "@/lib/utils";

const sizeMap = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
  "2xl": "size-20 text-xl",
  "3xl": "size-24 text-2xl",
};

const statusColorMap = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
  away: "bg-yellow-500",
};

const statusSizeMap = {
  xs: "size-1.5 border",
  sm: "size-2 border",
  default: "size-2.5 border-2",
  lg: "size-3 border-2",
  xl: "size-3.5 border-2",
  "2xl": "size-4 border-2",
  "3xl": "size-4 border-2",
};

function Avatar({ src, alt = "", initials, size = "default", rounded = "full", status, color = "bg-blue-100 text-blue-700", className }) {
  const roundedClass = rounded === "full" ? "rounded-full" : rounded === "md" ? "rounded-xl" : "rounded-lg";

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <div className={cn("inline-flex items-center justify-center overflow-hidden font-semibold select-none", sizeMap[size] || sizeMap.default, roundedClass, !src && color)}>
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span>{initials || alt?.slice(0, 2).toUpperCase() || "?"}</span>
        )}
      </div>
      {status && (
        <span className={cn("absolute bottom-0 right-0 rounded-full border-white", statusColorMap[status] || statusColorMap.offline, statusSizeMap[size] || statusSizeMap.default)} />
      )}
    </div>
  );
}

function AvatarGroup({ children, max, size = "default", className }) {
  const items = max ? children.slice(0, max) : children;
  const overflow = max && children.length > max ? children.length - max : 0;

  const overlapMap = {
    xs: "-ml-2",
    sm: "-ml-2.5",
    default: "-ml-3",
    lg: "-ml-4",
    xl: "-ml-5",
    "2xl": "-ml-6",
    "3xl": "-ml-7",
  };
  const overlap = overlapMap[size] || overlapMap.default;

  return (
    <div className={cn("flex items-center", className)}>
      {items.map((child, i) => (
        <div key={i} className={cn("ring-2 ring-white rounded-full", i > 0 && overlap)}>
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div className={cn("ring-2 ring-white rounded-full", overlap)}>
          <div className={cn("inline-flex items-center justify-center rounded-full bg-gray-200 text-muted-foreground font-semibold", sizeMap[size] || sizeMap.default)}>
            +{overflow}
          </div>
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup };
