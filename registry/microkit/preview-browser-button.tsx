import { ArrowRight } from "lucide-react";

export function PreviewInBrowserButton() {
  return (
    <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#f0f0f0] bg-transparent px-6 py-3 text-base font-medium text-[#f0f0f0]">
      <span>Preview in browser</span>
      <span className="relative grid h-5 w-[17px] place-items-center overflow-hidden">
        <ArrowRight className="absolute rotate-[-45deg] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 group-hover:-translate-y-3" size={17} strokeWidth={2.4} />
        <ArrowRight className="absolute -translate-x-4 translate-y-3 rotate-[-45deg] transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}
