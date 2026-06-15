import { Search, CalendarDays, BellRing, Sun } from 'lucide-react';
export default function Topbar() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {


        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        <div className="flex bg-[#091022] border border-slate-800 rounded-2xl mx-5 gap-4 p-3">
            <div className="relative w-145">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type="text"
                    placeholder="Search flights,Routes,Crew,Gates..."
                    className="w-full  border border-slate-800 rounded-xl bg-[#0f162a] py-2 pl-10 pr-4 text-white outline-none placeholder:text-shadow-zinc-800 placeholder:font-inter placeholder:text-sm focus:ring-1 focus:ring-[#38BDF8] transition duration-300 mr-4"
                />
            </div>
            <div className="flex justify-end gap-4 ml-auto">
                <div className="w-32 border text-zinc-300 bg-[#172132] border-slate-700 flex gap-2 items-center text-sm justify-center rounded-xl">
                    <CalendarDays size={16} />
                    {formattedDate}
                </div>
                <div className=" border border-slate-700 bg-[#172132]  px-4 grid place-items-center rounded-xl">
                    <Sun size={16} />
                </div>
                <div className=" border border-slate-700 bg-[#172132] text-sm  px-4 grid place-items-center rounded-xl">
                    <BellRing size={16} />
                </div>
            </div>

        </div>
    );
} 