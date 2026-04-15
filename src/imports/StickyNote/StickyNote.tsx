import svgPaths from "./svg-23cgvrf8i4";

function Shadow() {
  return (
    <div className="absolute inset-[19.9px_96.24%_11px_-12.83%]" data-name="Shadow">
      <div className="absolute inset-[-8.04%_-29.85%_-8.04%_-44.78%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 118.178 437.701">
          <g id="Shadow">
            <g filter="url(#filter0_f_8_195)" id="Soft shadow" opacity="0.1">
              <path d={svgPaths.p9c9f400} fill="var(--fill-0, black)" />
            </g>
            <g filter="url(#filter1_f_8_195)" id="Hard shadow" opacity="0.3">
              <path d={svgPaths.p2a34ed80} fill="var(--fill-0, black)" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="437.701" id="filter0_f_8_195" width="109.087" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_8_195" stdDeviation="15.151" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="364.486" id="filter1_f_8_195" width="65.6542" x="52.5233" y="59.5154">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_8_195" stdDeviation="10.1006" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Note() {
  return (
    <div className="absolute inset-[1.7%_2.21%_2.71%_2.21%]" data-name="Note">
      <div className="absolute inset-[0_-1.03%_-2.56%_-1.54%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 400">
          <g id="Note">
            <g filter="url(#filter0_d_8_191)" id="Paper">
              <path d={svgPaths.pc0cc280} fill="var(--fill-0, #FDF5A3)" />
            </g>
            <path d={svgPaths.p19285100} fill="var(--fill-0, #222222)" id="Glue" opacity="0.05" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="400" id="filter0_d_8_191" width="400" x="1.512e-08" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="5" />
              <feGaussianBlur stdDeviation="2.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_8_191" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_8_191" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function StickyNote() {
  return (
    <div className="relative size-full" data-name="Sticky note">
      <Shadow />
      <Note />
      <div className="absolute flex flex-col font-['Intruding_Cat:Regular',sans-serif] inset-[28.72px_29px_29.28px_29px] justify-center leading-[0] not-italic text-[#222] text-[72px] text-center">
        <p className="leading-none">Sticky note</p>
      </div>
    </div>
  );
}