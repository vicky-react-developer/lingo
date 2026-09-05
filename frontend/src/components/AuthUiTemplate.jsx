import { ManSittingImg, LeftLeaf, RightLeaf, Logo } from "../helpers/Constants";

export default function AuthUiTemplate({children}) {
    return (
        <div className="w-full min-h-screen bg-white overflow-x-hidden font-['Montserrat']">
            {/* Header */}
            <div className="text-center pt-4">
                <img src={Logo} alt="logo" className="w-[88px] h-[88px] block mx-auto mb-2" />
                <h1 className="inline-block text-[30px] italic font-bold leading-tight">
                    <span className="text-[#07115D]">Lingo</span>
                    <span className="text-[#00C6FF]">Refresh</span>
                </h1>
                <p className="text-[#030352] italic text-sm mt-1">Refresh your spoken english</p>
            </div>

            {/* Bottom card */}
            <div className="bg-[#030352] mt-[105px] px-5 pb-[50px] rounded-t-[170px]">
                {/* Illustration */}
                <div className="relative -top-[85px]">
                    <div>
                        <img
                            src={LeftLeaf}
                            alt="illustration"
                            className="absolute w-[73px] top-[45px] -left-[49px]"
                        />
                    </div>
                    <div className="text-center">
                        <img
                            src={ManSittingImg}
                            alt="illustration"
                            className="mx-auto"
                        />
                    </div>
                    <div>
                        <img
                            src={RightLeaf}
                            alt="illustration"
                            className="absolute w-[138px] -right-[57px] -top-[10px]"
                        />
                    </div>
                </div>

                {children}
            </div>

        </div>
    )
}