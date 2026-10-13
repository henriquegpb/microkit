export function FocusField() {
  return (
    <label className="block w-[210px]">
      <span className="mb-[7px] block font-mono text-[10px] text-[light-dark(#69727f,#9298a1)]">Project name</span>
      <input
        className="w-full rounded-[5px] border border-[light-dark(#cbd2dc,#363a42)] bg-[light-dark(#ffffff,#15171b)] p-2 text-[11px] text-[light-dark(#262d38,#e8ebee)] shadow-[0_0_0_0_#f9731600] outline-none transition-[border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.22,1,.36,1)] focus:border-[#f97316] focus:shadow-[0_0_0_3px_#f9731625] motion-reduce:transition-none"
        placeholder="e.g. microkit-web"
      />
    </label>
  );
}
