export const componentCode = `import { ArrowRight } from "lucide-react";

export function ProjectsArrowButton() {
  return (
    <button type="button" className="projects-arrow-button">
      <span>Projects</span>
      <span className="projects-arrow-icon" aria-hidden="true">
        <ArrowRight className="projects-arrow projects-arrow-current" size={18} strokeWidth={2.4} />
        <ArrowRight className="projects-arrow projects-arrow-incoming" size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}

/* projects-arrow-button.css */
.projects-arrow-button { display: inline-flex; align-items: center; gap: 9px; border: 0; background: transparent; color: #f0f0f0; font-size: 16px; font-weight: 500; letter-spacing: .5px; }
.projects-arrow-icon { position: relative; display: grid; width: 32px; height: 32px; place-items: center; overflow: hidden; border: 1px solid currentColor; border-radius: 999px; }
.projects-arrow { position: absolute; transition: transform .48s cubic-bezier(.16, 1, .3, 1); }
.projects-arrow-incoming { transform: translateX(-25px); }
.projects-arrow-button:hover .projects-arrow-current, .projects-arrow-button:focus-visible .projects-arrow-current { transform: translateX(25px); }
.projects-arrow-button:hover .projects-arrow-incoming, .projects-arrow-button:focus-visible .projects-arrow-incoming { transform: translateX(0); }
.projects-arrow-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function ProjectsArrowButton() {
  return (
    <button className="group inline-flex items-center gap-[9px] border-0 bg-transparent p-0 text-base font-medium tracking-[.5px] text-[#f0f0f0]">
      <span>Projects</span>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-current">
        <ArrowRight className="absolute transition-transform duration-[480ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[25px]" size={18} strokeWidth={2.4} />
        <ArrowRight className="absolute -translate-x-[25px] transition-transform duration-[480ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0" size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}`;
