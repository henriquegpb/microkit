export const componentCode = `export function SubscribeShineButton() {
  return (
    <button type="button" className="subscribe-shine">
      <span className="subscribe-shine-gradient" aria-hidden="true" />
      <span className="subscribe-shine-inner">Subscribe</span>
    </button>
  );
}

/* subscribe-shine-button.css */
.subscribe-shine {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 60px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.subscribe-shine-gradient {
  width: 230px;
  height: 250px;
  flex: none;
  background: linear-gradient(121deg, #1b1b1b 38%, #f0f0f0 50%, #1b1b1b 61%);
  transition: transform 1s linear;
}
.subscribe-shine-inner {
  position: absolute;
  inset: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #0b0b11;
  color: #f0f0f0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}
.subscribe-shine:hover .subscribe-shine-gradient,
.subscribe-shine:focus-visible .subscribe-shine-gradient {
  transform: rotate(360deg);
  transition-duration: 3s;
}
.subscribe-shine:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }`;

export const tailwindCode = `export function SubscribeShineButton() {
  return (
    <button className="group relative flex h-[60px] w-[200px] items-center justify-center overflow-hidden rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f97316]">
      <span className="h-[250px] w-[230px] shrink-0 bg-[linear-gradient(121deg,#1b1b1b_38%,#f0f0f0_50%,#1b1b1b_61%)] transition-transform duration-1000 ease-linear group-hover:rotate-[360deg] group-hover:duration-[3000ms] group-focus-visible:rotate-[360deg] group-focus-visible:duration-[3000ms]" />
      <span className="absolute inset-px flex items-center justify-center rounded-full bg-[#0b0b11] text-[13px] font-bold leading-none text-[#f0f0f0] uppercase">
        Subscribe
      </span>
    </button>
  );
}`;
