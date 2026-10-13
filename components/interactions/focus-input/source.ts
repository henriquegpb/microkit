export const componentCode = `import "./focus-field.css";

export function FocusField() {
  return (
    <label className="demo-input">
      <span>Project name</span>
      <input placeholder="e.g. microkit-web" />
    </label>
  );
}

/* focus-field.css */
.demo-input { width: 210px; display: block; }
.demo-input span {
  display: block;
  margin: 0 0 7px;
  color: light-dark(#69727f,#9298a1);
  font: 10px ui-monospace, SFMono-Regular, Menlo, monospace;
}
.demo-input input {
  width: 100%;
  border: 1px solid light-dark(#cbd2dc,#363a42);
  border-radius: 5px;
  background: light-dark(#ffffff,#15171b);
  padding: 8px;
  color: light-dark(#262d38,#e8ebee);
  font-size: 11px;
  outline: 0;
  box-shadow: 0 0 0 0 #f9731600;
  transition: border-color .32s cubic-bezier(.22, 1, .36, 1), box-shadow .32s cubic-bezier(.22, 1, .36, 1);
}
.demo-input input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px #f9731625;
}
@media (prefers-reduced-motion: reduce) {
  .demo-input input { transition: none; }
}`;

export const tailwindCode = `export function FocusField() {
  return (
    <label className="block w-[210px]">
      <span className="mb-[7px] block font-mono text-[10px] text-[light-dark(#69727f,#9298a1)]">Project name</span>
      <input
        className="w-full rounded-[5px] border border-[light-dark(#cbd2dc,#363a42)] bg-[light-dark(#ffffff,#15171b)] p-2 text-[11px] text-[light-dark(#262d38,#e8ebee)] shadow-[0_0_0_0_#f9731600] outline-none transition-[border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(.22,1,.36,1)] focus:border-[#f97316] focus:shadow-[0_0_0_3px_#f9731625] motion-reduce:transition-none"
        placeholder="e.g. microkit-web"
      />
    </label>
  );
}`;
