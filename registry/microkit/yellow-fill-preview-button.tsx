export function YellowFillPreviewButton() {
  return (
    <button
      type="button"
      className="group relative inline-flex cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border border-[light-dark(#14181e,#f0f0f0)] bg-transparent px-6 py-3 text-[light-dark(#14181e,#f0f0f0)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 text-base font-medium transition-colors duration-300 group-hover:text-[light-dark(#f6f7f9,#111)] group-focus-visible:text-[light-dark(#f6f7f9,#111)]">Preview in browser</span>
      <span className="absolute inset-y-0 left-0 w-0 bg-[#f97316] transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full group-focus-visible:w-full" aria-hidden="true" />
    </button>
  );
}
