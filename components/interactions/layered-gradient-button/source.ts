export const componentCode = `export function LayeredGradientButton() {
  return <button type="button" className="layered-gradient-button"><span>View all projects</span><span className="layered-gradient-button-surface" aria-hidden="true" /><span className="layered-gradient-button-haze" aria-hidden="true" /></button>;
}

/* layered-gradient-button.css */
.layered-gradient-button { position: relative; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: transparent; padding: 16px 24px; cursor: pointer; }
.layered-gradient-button > span:first-child { position: relative; z-index: 2; background: linear-gradient(to right, #f0f0f0, #464646 48%, #f0f0f0); background-clip: text; color: transparent; font-size: 18px; font-weight: 500; transition: transform .3s ease; }
.layered-gradient-button-surface { position: absolute; z-index: 1; inset: 0; border: 1px solid #f0f0f033; border-radius: inherit; background: radial-gradient(circle at 50% 100%, #111, #252525); transition: transform .3s ease; }
.layered-gradient-button-haze { position: absolute; z-index: 0; top: 4px; width: 104%; height: 98%; border-radius: inherit; background: #f0f0f080; opacity: 0; transform: scale(.8); transition: opacity .6s ease, transform .3s ease; }
.layered-gradient-button:hover > span:first-child, .layered-gradient-button:focus-visible > span:first-child { transform: scale(1.05); }
.layered-gradient-button:hover .layered-gradient-button-surface, .layered-gradient-button:focus-visible .layered-gradient-button-surface { transform: scale(1.05); }
.layered-gradient-button:hover .layered-gradient-button-haze, .layered-gradient-button:focus-visible .layered-gradient-button-haze { opacity: 1; transform: translateY(1px) scale(.98); }
.layered-gradient-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `export function LayeredGradientButton() {
  return <button type="button" className="group relative inline-flex cursor-pointer items-center justify-center rounded-full border-0 bg-transparent px-6 py-4 text-[18px] font-medium text-transparent [background:linear-gradient(to_right,#f0f0f0,#464646_48%,#f0f0f0)] bg-clip-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span className="relative z-10 transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105">View all projects</span><span className="absolute inset-0 z-[1] rounded-full border border-[#f0f0f033] bg-[radial-gradient(circle_at_50%_100%,#111,#252525)] transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105" aria-hidden="true" /><span className="absolute top-1 z-0 h-[98%] w-[104%] scale-80 rounded-full bg-[#f0f0f080] opacity-0 [transition:opacity_.6s_ease,transform_.3s_ease] group-hover:translate-y-px group-hover:scale-[.98] group-hover:opacity-100 group-focus-visible:translate-y-px group-focus-visible:scale-[.98] group-focus-visible:opacity-100" aria-hidden="true" /></button>;
}`;
