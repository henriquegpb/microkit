export const componentCode = `export function CircleSurfaceButton() {
  return <button type="button" className="circle-surface-button"><span>CLICK HERE</span><span aria-hidden="true" /></button>;
}

/* circle-surface-button.css */
.circle-surface-button { position: relative; display: grid; width: 128px; height: 128px; place-items: center; overflow: hidden; border: 1px solid #f0f0f0; border-radius: 50%; background: transparent; color: #f0f0f0; cursor: pointer; }
.circle-surface-button > span:first-child { position: relative; z-index: 1; font-size: 13px; transition: color .3s ease; }
.circle-surface-button > span:last-child { position: absolute; inset: 0; border-radius: inherit; background: #323232; transition: transform .5s cubic-bezier(.16, 1, .3, 1), background-color .5s ease; }
.circle-surface-button:hover > span:first-child, .circle-surface-button:focus-visible > span:first-child { color: #111; }
.circle-surface-button:hover > span:last-child, .circle-surface-button:focus-visible > span:last-child { background: #f97316; transform: scale(1.1); }
.circle-surface-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `export function CircleSurfaceButton() {
  return <button type="button" className="group relative grid size-32 cursor-pointer place-items-center overflow-hidden rounded-full border border-[#f0f0f0] bg-transparent p-3 text-[13px] font-medium text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"><span className="relative z-10 transition-colors duration-300 group-hover:text-[#111] group-focus-visible:text-[#111]">CLICK HERE</span><span className="absolute inset-0 rounded-full bg-[#323232] transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-[#f97316] group-focus-visible:scale-110 group-focus-visible:bg-[#f97316]" aria-hidden="true" /></button>;
}`;
