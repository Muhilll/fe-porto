"use client";

import { useState } from "react";
import { Rating, RatingWithLabel } from "@/components/ui/rating";
import { Star, Heart, Zap, ThumbsUp } from "lucide-react";

function DemoCard({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm ${span2 ? "lg:col-span-2" : ""}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      {children}
    </div>
  );
}

const reviews = [
  { name: "Alex Johnson", seed: "Alex", bg: "b6e3f4", rating: 5, date: "May 10, 2025", text: "Absolutely outstanding product. The UI is clean, intuitive, and the performance is top-notch. My whole team loves it." },
  { name: "Jane Doe",     seed: "Jane", bg: "c0aede", rating: 4, date: "May 8, 2025",  text: "Very good overall experience. A few minor things could be improved but the core features work great." },
  { name: "Bob Smith",    seed: "Bob",  bg: "d1d4f9", rating: 3, date: "May 5, 2025",  text: "It's decent for the price. Does what it says, though I expected a bit more from the advanced features." },
];

const products = [
  { name: "Wireless Headphones Pro",  rating: 4.8, count: "2.4k" },
  { name: "Mechanical Keyboard X1",   rating: 4.2, count: "891" },
  { name: "USB-C Hub 7-in-1",         rating: 3.7, count: "423" },
  { name: "Webcam 4K Ultra HD",        rating: 4.6, count: "1.1k" },
];

export default function RatingsPage() {
  const [stars1, setStars1] = useState(3);
  const [stars2, setStars2] = useState(0);
  const [hearts,  setHearts]  = useState(3);
  const [zapRating, setZapRating] = useState(4);
  const [thumbs, setThumbs] = useState(2);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Ratings</h1>
        <p className="text-muted-foreground">
          Interactive and read-only rating components with customizable icons, colors, and sizes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Interactive Star Rating */}
        <DemoCard title="Interactive Star Rating" description="Click or hover a star to set the rating.">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Click to rate</p>
              <Rating value={stars1} onChange={setStars1} />
              <p className="text-sm text-muted-foreground mt-1">
                {stars1 === 0 ? "No rating selected" : `You rated: ${stars1} / 5 star${stars1 !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Clearable (click same star to deselect)</p>
              <Rating value={stars2} onChange={setStars2} />
              <p className="text-sm text-muted-foreground mt-1">
                {stars2 === 0 ? "No rating selected" : `${stars2} star${stars2 !== 1 ? "s" : ""} selected`}
              </p>
            </div>
          </div>
        </DemoCard>

        {/* Read-only Ratings */}
        <DemoCard title="Read-only Ratings" description="Static display ratings for showcasing scores.">
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((v) => (
              <div key={v} className="flex items-center gap-3">
                <Rating value={v} readOnly />
                <span className="text-sm text-muted-foreground">{v}.0</span>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Sizes */}
        <DemoCard title="Rating Sizes" description="XS, SM, Default, LG, and XL sizes.">
          <div className="space-y-4">
            {[["xs", "Extra Small"], ["sm", "Small"], ["default", "Default"], ["lg", "Large"], ["xl", "Extra Large"]].map(([size, label]) => (
              <div key={size} className="flex items-center gap-3">
                <Rating value={4} readOnly size={size} />
                <span className="text-xs text-muted-foreground w-20">{label}</span>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Custom Icons */}
        <DemoCard title="Custom Icons" description="Use any icon — hearts, lightning, thumbs up, etc.">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Heart</p>
              <Rating
                value={hearts}
                onChange={setHearts}
                icon={Heart}
                activeClass="text-red-500 fill-red-500"
                inactiveClass="text-gray-200 fill-gray-200"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Lightning (Zap)</p>
              <Rating
                value={zapRating}
                onChange={setZapRating}
                icon={Zap}
                activeClass="text-yellow-500 fill-yellow-500"
                inactiveClass="text-gray-200 fill-gray-200"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Thumbs Up</p>
              <Rating
                value={thumbs}
                max={3}
                onChange={setThumbs}
                icon={ThumbsUp}
                activeClass="text-blue-500 fill-blue-500"
                inactiveClass="text-gray-200 fill-gray-200"
              />
            </div>
          </div>
        </DemoCard>

        {/* Color Variants */}
        <DemoCard title="Color Variants" description="Stars can be any color to match your design system.">
          <div className="space-y-3">
            {[
              ["text-yellow-400 fill-yellow-400", "Yellow (default)"],
              ["text-blue-500 fill-blue-500",   "Blue"],
              ["text-green-500 fill-green-500",  "Green"],
              ["text-red-500 fill-red-500",      "Red"],
              ["text-purple-500 fill-purple-500","Purple"],
              ["text-orange-500 fill-orange-500","Orange"],
              ["text-muted-foreground fill-gray-600",    "Gray"],
            ].map(([cls, label]) => (
              <div key={label} className="flex items-center gap-3">
                <Rating value={4} readOnly activeClass={cls} inactiveClass="text-gray-200 fill-gray-200" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Rating with Label */}
        <DemoCard title="Rating with Label & Count" description="Compact rating display with numeric score and review count.">
          <div className="space-y-4">
            {products.map(({ name, rating, count }) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <p className="text-sm font-medium text-foreground">{name}</p>
                <RatingWithLabel value={rating} count={count} size="sm" />
              </div>
            ))}
          </div>
        </DemoCard>

        {/* Rating Distribution */}
        <DemoCard title="Rating Distribution" description="Breakdown bar showing how ratings are distributed.">
          <div className="flex gap-6 items-start">
            <div className="text-center">
              <p className="text-5xl font-bold text-foreground">4.5</p>
              <Rating value={4.5} readOnly size="sm" className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">1,240 reviews</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[
                [5, 68], [4, 19], [3, 8], [2, 3], [1, 2],
              ].map(([star, pct]) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-muted-foreground">{star}</span>
                  <Star className="size-3 text-yellow-400 fill-yellow-400 shrink-0" />
                  <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div className="bg-yellow-400 h-1.5 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-7 text-right text-muted-foreground">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </DemoCard>

        {/* Review Cards */}
        <DemoCard span2 title="Review Cards" description="Full review cards combining avatar, rating, and comment text.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map(({ name, seed, bg, rating, date, text }) => (
              <div key={name} className="border border-border rounded-xl p-4 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${bg}`} className="size-10 rounded-full bg-muted" alt={name} />
                  <div>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">{date}</p>
                  </div>
                </div>
                <Rating value={rating} readOnly size="sm" />
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </DemoCard>

      </div>
    </div>
  );
}
