"use client";

import { Carousel, CarouselSlide } from "@/components/ui/carousel";

const unsplash = (id, w = 900, h = 400) =>
  `https://picsum.photos/seed/${id}/${w}/${h}`;

const slides = [
  { id: "city", label: "City Life", desc: "Explore the vibrant city landscape at night.", color: "from-blue-900/70" },
  { id: "nature", label: "Into Nature", desc: "Breathe in the fresh air of the great outdoors.", color: "from-green-900/70" },
  { id: "ocean", label: "Ocean Waves", desc: "Relax and unwind by the calming ocean shore.", color: "from-cyan-900/70" },
  { id: "mountain", label: "Mountain Peak", desc: "Challenge yourself and reach new heights.", color: "from-slate-900/70" },
];

const cardSlides = [
  { title: "Design Systems", tag: "Design", author: "Alex Johnson", avatar: "Alex", color: "bg-blue-600" },
  { title: "API Best Practices", tag: "Backend", author: "Jane Doe", avatar: "Jane", color: "bg-purple-600" },
  { title: "React Performance", tag: "Frontend", author: "Bob Smith", avatar: "Bob", color: "bg-green-600" },
  { title: "DevOps Pipelines", tag: "Ops", author: "Sam Wilson", avatar: "Sam", color: "bg-orange-600" },
];

export default function CarouselPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Carousel</h1>
        <p className="text-muted-foreground">
          Slideshow components for cycling through images, cards, or content with smooth transitions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">

        {/* Basic Image Carousel */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Basic Image Carousel</h2>
          <p className="text-sm text-muted-foreground mb-4">Swipe through images with arrow and dot navigation.</p>
          <Carousel className="h-64">
            {slides.map((s) => (
              <CarouselSlide key={s.id}>
                <img src={unsplash(s.id)} alt={s.label} className="w-full h-64 object-cover rounded-xl" />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* Carousel with Caption */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Carousel with Caption</h2>
          <p className="text-sm text-muted-foreground mb-4">Slides with an overlay text caption at the bottom.</p>
          <Carousel className="h-64">
            {slides.map((s) => (
              <CarouselSlide key={s.id}>
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <img src={unsplash(s.id)} alt={s.label} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${s.color} to-transparent`} />
                  <div className="absolute bottom-10 left-6 text-white">
                    <h3 className="text-xl font-bold drop-shadow">{s.label}</h3>
                    <p className="text-sm text-white/80 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* Auto-play Carousel */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Auto-play Carousel</h2>
          <p className="text-sm text-muted-foreground mb-4">Slides auto-advance every 3 seconds.</p>
          <Carousel autoPlay interval={3000} className="h-56">
            {slides.map((s) => (
              <CarouselSlide key={s.id}>
                <div className="relative h-56 rounded-xl overflow-hidden">
                  <img src={unsplash(s.id, 800, 350)} alt={s.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl drop-shadow-lg">{s.label}</span>
                  </div>
                </div>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* No Arrows Carousel */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Dots Only (No Arrows)</h2>
          <p className="text-sm text-muted-foreground mb-4">Navigation via dots only, no arrow buttons.</p>
          <Carousel showArrows={false} className="h-52">
            {slides.map((s) => (
              <CarouselSlide key={s.id}>
                <img src={unsplash(s.id, 800, 300)} alt={s.label} className="w-full h-52 object-cover rounded-xl" />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* Arrows Only Carousel */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Arrows Only (No Dots)</h2>
          <p className="text-sm text-muted-foreground mb-4">Navigation via arrows only, no dot indicators.</p>
          <Carousel showDots={false} className="h-52">
            {slides.map((s) => (
              <CarouselSlide key={s.id}>
                <img src={unsplash(s.id, 800, 300)} alt={s.label} className="w-full h-52 object-cover rounded-xl" />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

        {/* Card Carousel */}
        <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Content / Card Carousel</h2>
          <p className="text-sm text-muted-foreground mb-4">Carousel cycling through card content instead of images.</p>
          <Carousel showDots className="rounded-xl">
            {cardSlides.map((card) => (
              <CarouselSlide key={card.title}>
                <div className={`${card.color} rounded-xl p-8 text-white min-h-48 flex flex-col justify-between`}>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest opacity-70">{card.tag}</span>
                    <h3 className="text-2xl font-bold mt-2">{card.title}</h3>
                    <p className="text-sm opacity-80 mt-2">A deep dive into {card.title.toLowerCase()} concepts, patterns, and best practices for modern applications.</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${card.avatar}&backgroundColor=ffffff40`}
                      alt={card.author}
                      className="size-8 rounded-full bg-card/20"
                    />
                    <span className="text-sm font-medium opacity-90">{card.author}</span>
                  </div>
                </div>
              </CarouselSlide>
            ))}
          </Carousel>
        </div>

      </div>
    </div>
  );
}
