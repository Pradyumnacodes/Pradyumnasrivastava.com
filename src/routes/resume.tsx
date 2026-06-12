import { createFileRoute } from "@tanstack/react-router";
import { EXPERIENCE, EMAIL, LINKEDIN } from "@/data/portfolio";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
});

function ResumePage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black/10 print:bg-white print:text-black">
      {/* Non-printing action bar */}
      <div className="fixed top-4 right-4 print:hidden z-50 flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-black/20 text-sm font-medium rounded-full hover:bg-black/5 transition-colors"
        >
          Back
        </button>
        <a 
          href="/pradyumna_srivastava_resume.pdf?v=2"
          download="Pradyumna_Srivastava_Resume.pdf"
          className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 transition-colors shadow-lg"
        >
          Download PDF
        </a>
      </div>

      <div className="max-w-[800px] mx-auto px-8 py-16 md:py-24 print:py-8 print:px-0">
        <header className="mb-12 border-b border-black/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3">Pradyumna Srivastava</h1>
          <h2 className="text-xl md:text-2xl text-black/70 mb-6 font-serif italic">Senior Product Designer</h2>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-mono tracking-wide text-black/80">
            <a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            <a href="https://pradyumnasrivastava.com" target="_blank" rel="noreferrer" className="hover:underline">pradyumnasrivastava.com</a>
          </div>
        </header>

        <section className="mb-10">
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-black/40 mb-6 border-b border-black/10 pb-2">Profile</h3>
          <p className="text-sm leading-relaxed text-black/80 pr-8">
            Senior Product Designer shaping B2B SaaS and D2C experiences for 20M+ users with $435M+ in business impact. Specializing in highly complex systems, data-dense interfaces, and cross-border scalable frameworks.
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-black/40 mb-6 border-b border-black/10 pb-2">Experience</h3>
          <div className="space-y-8">
            {EXPERIENCE.map((exp) => (
              <div key={exp.company}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-lg font-medium">{exp.company}</h4>
                  <span className="font-mono text-[11px] text-black/60 uppercase tracking-widest">{exp.duration}</span>
                </div>
                <div className="text-[13px] font-medium text-black/80 mb-2">{exp.role} · {exp.location}</div>
                {exp.note && (
                  <p className="text-sm leading-relaxed text-black/70 max-w-2xl">{exp.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-black/40 mb-6 border-b border-black/10 pb-2">Education & Skills</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[13px] font-medium mb-1">Core Competencies</h4>
              <p className="text-[13px] text-black/70 leading-relaxed">
                Interaction Design, System Architecture, Prototyping, B2B SaaS Logic, Design Systems, Cross-Functional Leadership.
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-medium mb-1">Tools & Technologies</h4>
              <p className="text-[13px] text-black/70 leading-relaxed">
                Figma, Framer, React/Next.js (Concepts), CSS/Tailwind, Principle, Jira, Vercel.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
