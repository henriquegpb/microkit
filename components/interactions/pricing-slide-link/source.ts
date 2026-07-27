export const componentCode = `import { ArrowRight } from "lucide-react";

export function PricingSlideLink() {
  return (
    <button type="button" className="pricing-slide">
      <span className="pricing-slide-icon" aria-hidden="true">
        <ArrowRight size={23} strokeWidth={2.25} />
      </span>
      <span className="pricing-slide-label">Pricing</span>
    </button>
  );
}

/* pricing-slide-link.css */
.pricing-slide {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0;
  color: #f0f0f0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.pricing-slide-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  transform: translateX(-150%);
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.pricing-slide-label {
  transform: translateX(-16px);
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.pricing-slide:hover .pricing-slide-icon,
.pricing-slide:focus-visible .pricing-slide-icon { transform: translateX(0); }
.pricing-slide:hover .pricing-slide-label,
.pricing-slide:focus-visible .pricing-slide-label { transform: translateX(0); }
.pricing-slide:focus-visible { outline: 2px solid #f97316; outline-offset: 5px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function PricingSlideLink() {
  return (
    <button className="group inline-flex items-center gap-2 overflow-hidden border-0 bg-transparent p-0 text-base font-medium leading-none text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316]">
      <span className="flex size-[23px] -translate-x-[150%] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        <ArrowRight size={23} strokeWidth={2.25} />
      </span>
      <span className="-translate-x-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        Pricing
      </span>
    </button>
  );
}`;
