export function FocusField() {
  return (
    <label className="block w-[210px]">
      <span className="mb-[7px] block font-mono text-[10px] text-[light-dark(#69727f,#9298a1)]">Project name</span>
      <input
        className="w-full rounded-[5px] border border-[light-dark(#cbd2dc,#363a42)] bg-[light-dark(#ffffff,#15171b)] p-2 text-[11px] text-[light-dark(#262d38,#e8ebee)] outline-none focus:border-[#f97316] focus:shadow-[0_0_0_3px_#f9731625]"
        placeholder="e.g. microkit-web"
      />
    </label>
  );
}
