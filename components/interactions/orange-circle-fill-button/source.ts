export const componentCode = `export function OrangeCircleFillButton() {
  return <button type="button" className="orange-circle-fill-button"><span>View all projects</span><span aria-hidden="true" /></button>;
}

/* orange-circle-fill-button.css */
.orange-circle-fill-button { position: relative; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid #f97316; border-radius: 999px; background: #f973162b; padding: 16px 24px; color: #f97316; cursor: pointer; transition: transform .5s cubic-bezier(.16, 1, .3, 1); }
.orange-circle-fill-button > span:first-child { position: relative; z-index: 1; font-size: 18px; font-weight: 500; transition: color .3s ease; }
.orange-circle-fill-button > span:last-child { position: absolute; width: 240px; height: 240px; border-radius: 50%; background: #f97316; transform: scale(0); transition: transform .5s cubic-bezier(.16, 1, .3, 1); }
.orange-circle-fill-button:hover, .orange-circle-fill-button:focus-visible { transform: scale(1.06); }
.orange-circle-fill-button:hover > span:first-child, .orange-circle-fill-button:focus-visible > span:first-child { color: #111; }
.orange-circle-fill-button:hover > span:last-child, .orange-circle-fill-button:focus-visible > span:last-child { transform: scale(1); }
.orange-circle-fill-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `export function OrangeCircleFillButton() {
  return <button type="button" className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#f97316] bg-[#f973162b] px-6 py-4 text-[18px] font-medium text-[#f97316] transition-transform duration-500 group-hover:scale-[1.06] group-focus-visible:scale-[1.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span className="relative z-10 transition-colors duration-300 group-hover:text-[#111] group-focus-visible:text-[#111]">View all projects</span><span className="absolute size-60 scale-0 rounded-full bg-[#f97316] transition-transform duration-500 group-hover:scale-100 group-focus-visible:scale-100" aria-hidden="true" /></button>;
}`;
