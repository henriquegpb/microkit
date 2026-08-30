export const componentCode = `import "./styles.css";

export function ContactDetailsReveal() {
  return (
    <button type="button" className="contact-details-reveal">
      <span className="contact-details-reveal__dot" aria-hidden="true" />
      <span className="contact-details-reveal__content">
        <span className="contact-details-reveal__title">Contact us</span>
        <span className="contact-details-reveal__detail">hello@contactus.com</span>
      </span>
    </button>
  );
}

/* styles.css */
.contact-details-reveal,
.contact-details-reveal * {
  box-sizing: border-box;
}

.contact-details-reveal {
  appearance: none;
  position: relative;
  display: inline-flex;
  width: min(190px, calc(100vw - 40px));
  height: 54px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0;
  color: #f7f7fa;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  cursor: pointer;
}

.contact-details-reveal__dot {
  position: relative;
  flex: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f7f7fa;
  transform: translate(18px, 0);
  transition: background-color .32s ease, transform .42s cubic-bezier(.16, 1, .3, 1);
}

.contact-details-reveal__content {
  position: relative;
  width: 145px;
  height: 46px;
  margin-left: 15px;
  transform: translateX(18px);
}

.contact-details-reveal__title,
.contact-details-reveal__detail {
  position: absolute;
  left: 0;
  white-space: nowrap;
}

.contact-details-reveal__title {
  top: 50%;
  font-size: 19px;
  font-weight: 400;
  letter-spacing: -.55px;
  line-height: 1;
  transform: translateY(-50%);
  transition: top .42s cubic-bezier(.16, 1, .3, 1), transform .42s cubic-bezier(.16, 1, .3, 1);
}

.contact-details-reveal__detail {
  top: 30px;
  color: #77777d;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -.2px;
  line-height: 1;
  opacity: 0;
  transform: translateY(15px);
  transition: opacity .24s ease .05s, transform .42s cubic-bezier(.16, 1, .3, 1);
}

.contact-details-reveal:hover .contact-details-reveal__dot,
.contact-details-reveal:focus-visible .contact-details-reveal__dot {
  background: #f97316;
  transform: translate(18px, 4px);
}

.contact-details-reveal:hover .contact-details-reveal__title,
.contact-details-reveal:focus-visible .contact-details-reveal__title {
  top: 6px;
  transform: translateY(0);
}

.contact-details-reveal:hover .contact-details-reveal__detail,
.contact-details-reveal:focus-visible .contact-details-reveal__detail {
  opacity: 1;
  transform: translateY(0);
}

.contact-details-reveal:focus-visible {
  border-radius: 8px;
  outline: 2px solid #f97316;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .contact-details-reveal__dot,
  .contact-details-reveal__title,
  .contact-details-reveal__detail {
    transition: none;
  }
}`;

export const tailwindCode = `export function ContactDetailsReveal() {
  return (
    <button type="button" className="group relative inline-flex h-[54px] w-[min(190px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden border-0 bg-transparent p-0 font-[Arial,Helvetica,sans-serif] text-left text-[#f7f7fa] focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative size-[14px] shrink-0 translate-x-[18px] rounded-full bg-[#f7f7fa] [transition:background-color_.32s_ease,transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:[transform:translate(18px,4px)] group-hover:bg-[#f97316] group-focus-visible:[transform:translate(18px,4px)] group-focus-visible:bg-[#f97316] motion-reduce:transition-none" aria-hidden="true" />
      <span className="relative ml-[15px] h-[46px] w-[145px] translate-x-[18px]">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[19px] font-normal leading-none tracking-[-.55px] [transition:top_.42s_cubic-bezier(.16,1,.3,1),transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:top-[6px] group-hover:translate-y-0 group-focus-visible:top-[6px] group-focus-visible:translate-y-0 motion-reduce:transition-none">Contact us</span>
        <span className="absolute left-0 top-[30px] translate-y-[15px] whitespace-nowrap text-[12px] font-normal leading-none tracking-[-.2px] text-[#77777d] opacity-0 [transition:opacity_.24s_ease_.05s,transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">hello@contactus.com</span>
      </span>
    </button>
  );
}`;
