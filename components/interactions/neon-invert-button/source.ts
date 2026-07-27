export const componentCode = `export function NeonInvertButton() {
  return (
    <button type="button" className="neon-invert-button">
      Get Started
    </button>
  );
}

/* neon-invert-button.css */
.neon-invert-button {
  box-sizing: border-box;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  max-width: 100%;
  min-height: 45px;
  border: 1px solid transparent;
  border-radius: 13px;
  background: #f97316;
  padding: 10px 14px;
  color: #1d1d23;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color .45s cubic-bezier(.16, 1, .3, 1),
    border-color .45s ease,
    color .45s ease,
    box-shadow .45s ease;
}
.neon-invert-button:hover,
.neon-invert-button:focus-visible {
  border-color: #f9731680;
  background: #1d1d23;
  color: #f97316;
  box-shadow: inset 0 0 10px 2px #f9731680;
}
.neon-invert-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 5px;
}`;

export const tailwindCode = `export function NeonInvertButton() {
  return (
    <button
      type="button"
      className="inline-flex min-h-[45px] w-[124px] max-w-full cursor-pointer appearance-none items-center justify-center rounded-[13px] border border-transparent bg-[#f97316] px-3.5 py-2.5 [font-family:Arial,Helvetica,sans-serif] text-[15px] font-medium leading-none text-[#1d1d23] transition-[background-color,border-color,color,box-shadow] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] hover:border-[#f9731680] hover:bg-[#1d1d23] hover:text-[#f97316] hover:shadow-[inset_0_0_10px_2px_#f9731680] focus-visible:border-[#f9731680] focus-visible:bg-[#1d1d23] focus-visible:text-[#f97316] focus-visible:shadow-[inset_0_0_10px_2px_#f9731680] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316]"
    >
      Get Started
    </button>
  );
}`;
