export function ContactDetailsReveal() {
  return (
    <button type="button" className="group relative inline-flex h-[54px] w-[min(190px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden border-0 bg-transparent p-0 font-[Arial,Helvetica,sans-serif] text-left text-[#f7f7fa] focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative size-[14px] shrink-0 translate-x-[18px] rounded-full bg-[#f7f7fa] [transition:background-color_.32s_ease,transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:[transform:translate(18px,4px)] group-hover:bg-[#f97316] group-focus-visible:[transform:translate(18px,4px)] group-focus-visible:bg-[#f97316] motion-reduce:transition-none" aria-hidden="true" />
      <span className="relative ml-[15px] h-[46px] w-[145px] translate-x-[18px]">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[19px] font-normal leading-none tracking-[-.55px] [transition:top_.42s_cubic-bezier(.16,1,.3,1),transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:top-[6px] group-hover:translate-y-0 group-focus-visible:top-[6px] group-focus-visible:translate-y-0 motion-reduce:transition-none">Contact us</span>
        <span className="absolute left-0 top-[30px] translate-y-[15px] whitespace-nowrap text-[12px] font-normal leading-none tracking-[-.2px] text-[#77777d] opacity-0 [transition:opacity_.24s_ease_.05s,transform_.42s_cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">hello@contactus.com</span>
      </span>
    </button>
  );
}
