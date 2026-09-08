export function FocusField() {
  return (
    <label className="block w-[210px]">
      <span className="mb-[7px] block font-mono text-[10px] text-[#9298a1]">Project name</span>
      <input
        className="w-full rounded-[5px] border border-[#363a42] bg-[#15171b] p-2 text-[11px] text-[#e8ebee] outline-none focus:border-[#f97316] focus:shadow-[0_0_0_3px_#f9731625]"
        placeholder="e.g. microkit-web"
      />
    </label>
  );
}
