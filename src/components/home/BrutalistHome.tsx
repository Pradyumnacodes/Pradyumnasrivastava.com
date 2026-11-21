import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { NavHeader } from "@/components/NavHeader";
import { CASES, RESUME_URL, EMAIL, EXPERIENCE } from "@/data/portfolio-data";
import { ArrowUpRight } from "lucide-react";
import { CompanyLogo } from "@/components/CompanyLogo";

export function BrutalistHome() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  useEffect(() => {
    // Enforce dark mode on homepage
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="dark relative min-h-dvh w-full overflow-x-hidden bg-[#09090B] text-[#F4F4F2] font-sans selection:bg-foreground/20">
      <main id="top" className="relative w-full min-h-dvh flex flex-col">
      
      {/* Ambient background that cross-fades smoothly on hover */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#09090B]"
      >
        {CASES.map((c) => (
           <div 
             key={c.slug}
             className={`absolute inset-0 transition-opacity duration-700 ease-out ${
               hoveredSlug === c.slug ? "opacity-100" : "opacity-0"
             }`}
           >
             <div className="absolute inset-0 bg-[#09090B]/80 z-10 backdrop-blur-[4px]" />
             <img 
               src={c.image} 
               alt="" 
               className={`w-full h-full object-cover opacity-25 grayscale contrast-125 transition-transform duration-1000 ease-out ${
                 hoveredSlug === c.slug ? "scale-105" : "scale-100"
               }`} 
             />
           </div>
        ))}
      </div>

      <NavHeader />

      <article className="relative z-10 w-full flex-1 flex flex-col justify-center lg:block px-6 py-12 lg:p-0 lg:absolute lg:inset-y-12 lg:inset-x-0">
        
        {/* Left Column (Name & Bio) - 35% Width */}
        <div className="lg:absolute lg:left-0 lg:w-[35%] lg:h-full lg:pl-12 lg:pr-4 flex flex-col justify-between z-20 pointer-events-auto mb-12 lg:mb-0">
          
          {/* Top: Name */}
          <div>
            <h1 className="animate-entrance-glass text-[clamp(1.25rem,2vw,1.75rem)] font-medium tracking-[-0.04em] text-foreground leading-none" style={{ animationDelay: '400ms' }}>
              Pradyumna Srivastava
            </h1>
            <p className="animate-entrance-glass text-[clamp(0.875rem,1.2vw,1rem)] tracking-tight text-muted-foreground font-normal mt-2 leading-none" style={{ animationDelay: '500ms' }}>
              Product Designer
            </p>
          </div>

          {/* Bottom: Bio & Actions */}
          <div>
            <p className="animate-entrance-glass text-[clamp(0.875rem,1vw,1rem)] tracking-tight text-muted-foreground font-normal leading-relaxed antialiased lg:max-w-none" style={{ animationDelay: '600ms' }}>
              I am a Product Experience Designer specializing in large-scale software. I own the end-to-end product lifecycle, from shaping the initial UX strategy to shipping production-ready front-end code.
            </p>
            
            <div className="animate-entrance-glass flex flex-wrap items-center gap-6 lg:gap-8 pt-6 pb-4 lg:pt-8 lg:pb-8 font-sans font-light tracking-tight text-[clamp(0.75rem,0.8vw,0.875rem)]" style={{ animationDelay: '700ms' }}>
              <a 
                href={RESUME_URL}
                onClick={(e) => {
                  e.preventDefault();
                  // 1. Force download
                  const link = document.createElement("a");
                  link.href = RESUME_URL;
                  link.download = "Pradyumna_Srivastava_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  // 2. Open in a split window (Right half of the screen)
                  const w = window.innerWidth / 2;
                  const h = window.innerHeight;
                  const left = window.screenX + w;
                  const top = window.screenY;
                  window.open(RESUME_URL, "_blank", `width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`);
                }}
                className="group relative flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 cursor-pointer"
              >
                <span>Résumé</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                <span className="absolute left-0 bottom-1 w-0 h-[1px] bg-foreground transition-all duration-500 ease-out group-hover:w-full" />
              </a>
              
              <a 
                href={`mailto:${EMAIL}`} 
                className="group relative flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
              >
                <span>Get in touch</span>
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 group-hover:bg-foreground animate-pulse transition-colors duration-300" />
                <span className="absolute left-0 bottom-1 w-0 h-[1px] bg-foreground transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            </div>

            {/* Horizontal Expansion Timeline */}
            <div className="hidden lg:flex items-center gap-4 text-left border-t border-border pt-6 mt-2 group/timeline">
              {EXPERIENCE.map((job, idx) => (
                <div 
                  key={job.company} 
                  className="animate-entrance-glass flex items-center cursor-default group transition-opacity duration-500 group-hover/timeline:opacity-30 hover:!opacity-100"
                  style={{ animationDelay: `${800 + (idx * 100)}ms` }}
                >
                  {/* Logo */}
                  <div className="shrink-0 z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                    <CompanyLogo company={job.company} />
                  </div>

                  {/* Inline Expansion Container */}
                  <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden whitespace-nowrap flex flex-col justify-center ml-0 group-hover:ml-4 transition-[margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="block font-sans text-sm font-medium text-foreground tracking-tight">
                        {job.company}
                      </span>
                      <span className="block font-sans text-xs font-medium tracking-tight text-muted-foreground mt-0.5">
                        {job.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Case Studies) - 60% Width */}
        <div className="lg:absolute lg:right-0 lg:w-[60%] lg:h-full lg:pl-4 lg:pr-12 xl:pr-24 flex flex-col pointer-events-none z-10 lg:justify-between gap-6 lg:gap-0 mt-8 lg:mt-0">
           
           <nav className="flex flex-col justify-center lg:justify-between h-full w-full items-start lg:items-end text-left lg:text-right pointer-events-auto group/list gap-6 lg:gap-0 lg:pb-16 xl:pb-20">
             {CASES.map((c, i) => (
                <Link 
                  key={c.slug} 
                  to="/case-study/$slug"
                  params={{ slug: c.slug }}
                  onMouseEnter={() => setHoveredSlug(c.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className="animate-entrance-nav group/item flex flex-col items-start lg:items-end lg:gap-2 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 lg:group-hover/list:opacity-20 hover:!opacity-100"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <span className="text-[clamp(3.5rem,7vw,10rem)] tracking-[-0.035em] font-medium text-ghost group-hover/item:text-foreground transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] leading-[0.9] whitespace-nowrap pb-2">
                    {c.slug === "mastercard" ? "Issuer Portfolio" : c.slug === "finpy" ? "Repayments Boost" : "Effortless Hiring"}
                  </span>
                  
                  {/* Descriptions */}
                  <p className="hidden md:block mt-1 lg:mt-4 tracking-[-0.02em] text-muted-foreground font-normal max-w-[420px] opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-all duration-700 lg:transform lg:translate-y-2 group-hover/item:translate-y-0 leading-relaxed text-left lg:text-right text-[clamp(0.875rem,1vw,1rem)]">
                    {c.title}
                  </p>
                </Link>
             ))}
           </nav>
        </div>

      </article>
      </main>
    </div>
  );
}
