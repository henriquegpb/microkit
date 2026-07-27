export const componentCode = `export function InsetCircleButton() {
  return <button type="button" className="inset-circle-button"><span>View Project</span><span aria-hidden="true" /></button>;
}

/* inset-circle-button.css */
.inset-circle-button { position: relative; display: grid; width: 128px; height: 128px; place-items: center; overflow: hidden; border: 1px solid #f0f0f0; border-radius: 50%; background: #1f1f1f; color: #111; cursor: pointer; }
.inset-circle-button > span:first-child { position: relative; z-index: 1; font-size: 13px; font-weight: 700; transition: color .42s ease; }
.inset-circle-button > span:last-child { position: absolute; inset: 4px; border-radius: 50%; background: #f0f0f0; clip-path: circle(75% at 50% 50%); will-change: clip-path; transition: clip-path .52s cubic-bezier(.16, 1, .3, 1); }
.inset-circle-button:hover > span:first-child, .inset-circle-button:focus-visible > span:first-child { color: #f0f0f0; }
.inset-circle-button:hover > span:last-child, .inset-circle-button:focus-visible > span:last-child { clip-path: circle(0% at 50% 50%); }
.inset-circle-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `export function InsetCircleButton() {
  return <button type="button" className="group relative grid size-32 cursor-pointer place-items-center overflow-hidden rounded-full border border-[#f0f0f0] bg-[#1f1f1f] p-3 text-[13px] font-bold text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span className="relative z-10 transition-colors duration-[420ms] group-hover:text-[#f0f0f0] group-focus-visible:text-[#f0f0f0]">View Project</span><span className="absolute inset-1 rounded-full bg-[#f0f0f0] [clip-path:circle(75%_at_50%_50%)] [transition:clip-path_.52s_cubic-bezier(.16,1,.3,1)] [will-change:clip-path] group-hover:[clip-path:circle(0%_at_50%_50%)] group-focus-visible:[clip-path:circle(0%_at_50%_50%)]" aria-hidden="true" /></button>;
}`;
