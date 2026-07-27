export const componentCode = `function LongArrowMark() {
  return (
    <svg viewBox="0 0 120 55" fill="none" aria-hidden="true">
      <path d="M95.2389 0.989578C93.8845 -0.376811 91.7407 -0.321332 90.4505 1.11345C89.1602 2.54775 89.2126 4.81806 90.5674 6.18445L95.2389 0.989578ZM114.277 30.0975C115.631 31.4638 117.775 31.4084 119.066 29.9736C120.356 28.5393 120.303 26.269 118.949 24.9026L114.277 30.0975ZM118.949 30.0975C120.303 28.7311 120.356 26.4608 119.066 25.0265C117.775 23.5917 115.631 23.5362 114.277 24.9026L118.949 30.0975ZM90.5674 48.8156C89.2126 50.1818 89.1602 52.4522 90.4505 53.8868C91.7407 55.3213 93.8845 55.3767 95.2389 54.0105L90.5674 48.8156ZM116.613 31.087C118.483 31.087 120 29.481 120 27.5C120 25.5191 118.483 23.9131 116.613 23.9131L116.613 31.087ZM3.38709 25.894C1.51647 25.894 -1.20206e-06 27.5 -1.11547e-06 29.481C-1.02888e-06 31.4619 1.51647 33.0679 3.38709 33.0679L3.38709 25.894ZM90.5674 6.18445L114.277 30.0975L118.949 24.9026L95.2389 0.989578L90.5674 6.18445ZM114.277 24.9026L90.5674 48.8156L95.2389 54.0105L118.949 30.0975L114.277 24.9026ZM116.613 23.9131L3.38709 25.894L3.38709 33.0679L116.613 31.087L116.613 23.9131Z" fill="currentColor" />
    </svg>
  );
}

export function TalkArrowRevealButton() {
  return (
    <button type="button" className="talk-arrow-reveal-button">
      <span className="talk-arrow-reveal-label">Talk to us</span>
      <span className="talk-arrow-reveal-icon">
        <LongArrowMark />
      </span>
    </button>
  );
}

/* talk-arrow-reveal-button.css */
.talk-arrow-reveal-button {
  box-sizing: border-box;
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  min-height: 48px;
  overflow: hidden;
  border: 1px solid #f0f0f033;
  border-radius: 999px;
  background: transparent;
  padding: 8px 24px;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color .24s ease, color .24s ease;
}
.talk-arrow-reveal-label {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  transition: transform .38s cubic-bezier(.16, 1, .3, 1), opacity .18s ease;
}
.talk-arrow-reveal-icon {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  transform: translateX(-80px);
  transition: transform .38s cubic-bezier(.16, 1, .3, 1);
}
.talk-arrow-reveal-icon svg {
  display: block;
  width: 48px;
  height: auto;
}
.talk-arrow-reveal-button:hover,
.talk-arrow-reveal-button:focus-visible {
  background: #f97316;
  color: #111;
}
.talk-arrow-reveal-button:hover .talk-arrow-reveal-label,
.talk-arrow-reveal-button:focus-visible .talk-arrow-reveal-label {
  opacity: 0;
  transform: translateX(128px);
}
.talk-arrow-reveal-button:hover .talk-arrow-reveal-icon,
.talk-arrow-reveal-button:focus-visible .talk-arrow-reveal-icon {
  transform: translateX(0);
}
.talk-arrow-reveal-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `function LongArrowMark() {
  return (
    <svg className="block h-auto w-12" viewBox="0 0 120 55" fill="none" aria-hidden="true">
      <path d="M95.2389 0.989578C93.8845 -0.376811 91.7407 -0.321332 90.4505 1.11345C89.1602 2.54775 89.2126 4.81806 90.5674 6.18445L95.2389 0.989578ZM114.277 30.0975C115.631 31.4638 117.775 31.4084 119.066 29.9736C120.356 28.5393 120.303 26.269 118.949 24.9026L114.277 30.0975ZM118.949 30.0975C120.303 28.7311 120.356 26.4608 119.066 25.0265C117.775 23.5917 115.631 23.5362 114.277 24.9026L118.949 30.0975ZM90.5674 48.8156C89.2126 50.1818 89.1602 52.4522 90.4505 53.8868C91.7407 55.3213 93.8845 55.3767 95.2389 54.0105L90.5674 48.8156ZM116.613 31.087C118.483 31.087 120 29.481 120 27.5C120 25.5191 118.483 23.9131 116.613 23.9131L116.613 31.087ZM3.38709 25.894C1.51647 25.894 -1.20206e-06 27.5 -1.11547e-06 29.481C-1.02888e-06 31.4619 1.51647 33.0679 3.38709 33.0679L3.38709 25.894ZM90.5674 6.18445L114.277 30.0975L118.949 24.9026L95.2389 0.989578L90.5674 6.18445ZM114.277 24.9026L90.5674 48.8156L95.2389 54.0105L118.949 30.0975L114.277 24.9026ZM116.613 23.9131L3.38709 25.894L3.38709 33.0679L116.613 31.087L116.613 23.9131Z" fill="currentColor" />
    </svg>
  );
}

export function TalkArrowRevealButton() {
  return (
    <button type="button" className="group relative inline-flex min-h-12 w-[120px] cursor-pointer appearance-none box-border items-center justify-center overflow-hidden rounded-full border border-[#f0f0f033] bg-transparent px-6 py-2 text-[#f0f0f0] [font-family:Arial,Helvetica,sans-serif] [transition:background-color_.24s_ease,color_.24s_ease] hover:bg-[#f97316] hover:text-[#111] focus-visible:bg-[#f97316] focus-visible:text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative z-10 flex items-center whitespace-nowrap text-[16px] font-medium [line-height:normal] [transition:transform_.38s_cubic-bezier(.16,1,.3,1),opacity_.18s_ease] group-hover:translate-x-32 group-hover:opacity-0 group-focus-visible:translate-x-32 group-focus-visible:opacity-0">Talk to us</span>
      <span className="absolute z-10 flex -translate-x-20 items-center justify-center text-[#111] transition-transform duration-[380ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        <LongArrowMark />
      </span>
    </button>
  );
}`;
