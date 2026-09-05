export default function ModeList({ modes, onSelect, background }) {
  return (
    <div className={`mx-auto p-3 ${background} h-full`}>
      <div className="flex flex-col gap-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <div
              key={mode.id}
              className="flex items-center bg-white p-[16px] rounded-2xl shadow-[0_6px_15px_rgba(0,0,0,0.06)] cursor-pointer transition-transform duration-200 ease-out active:scale-[0.97]"
              onClick={() => onSelect(mode)}
            >
              <div className="flex items-center justify-center bg-[#00CCFF] text-white rounded-xl text-xl mr-3.5 px-2.5 py-2.5">
                <Icon size={24} strokeWidth={2} />
              </div>

              <div>
                <h5 className="m-0 text-base font-semibold !text-[16px]">{mode.title}</h5>
                <p className="m-0 text-[13px] text-[#6c757d]">{mode.desc}</p>
              </div>

              <div className="ml-auto text-[#adb5bd] text-lg">
                <i className="bi bi-chevron-right"></i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}