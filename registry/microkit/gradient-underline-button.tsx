export function GradientUnderlineButton() {
  return (
    <button
      type="button"
      className="group relative inline-flex cursor-pointer appearance-none flex-col items-center justify-center overflow-hidden border-0 bg-transparent px-6 py-2 text-center text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 text-base font-medium transition-transform duration-500 group-hover:scale-[1.2] group-focus-visible:scale-[1.2]">HOVER ME</span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-[linear-gradient(90deg,transparent_0%,rgba(249,115,22,.35)_30%,#f97316_50%,rgba(249,115,22,.35)_70%,transparent_100%)] transition-[width] duration-1000 ease-[cubic-bezier(.165,.84,.44,1)] group-hover:w-full group-focus-visible:w-full" aria-hidden="true" />
    </button>
  );
}
