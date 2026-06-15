import { Plane, BarChart3, Globe2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";


export default function Home() {
    return (
        <div className="font-inter min-h-screen min-w-full bg-slate-950 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25)_0%,transparent_40%)]">


            <div className="flex items-center gap-3  p-8 pl-15">
                <div className="grid place-items-center size-10 bg-[linear-gradient(145deg,rgba(56,189,248,0.2),rgba(14,165,233,0.08))] rounded-xl border border-slate-700">
                    <Plane size={24} color="#38BDF8" />
                </div>
                <div >
                    <h1 className="text-3xl text-white font-bold">SKYFLOW</h1>

                </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-8  ">
                <div className="bg-[rgba(56,189,248,0.1)] text-[#38bdf8] border border-[rgba(56,189,248,0.2)] font-semibold px-5 py-2 rounded-[999px] text-sm mt-8 mb-1">
                    Aviation Operations Platform
                </div>

                <div className="text-7xl font-bold text-white "><h1 >Intelligent Flight</h1>
                    <h1 className="text-7xl font-bold  bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent py-3 px-7">
                        Control Center
                    </h1>

                </div>
                <div className=" text-xl text-[#909eb3] text-center w-147">
                    Manage routes, crew assignments, and passenger analytics in real-time with our advanced dashboard built for modern airlines.
                </div>
                <div >
                    <Link to="/dashboard">
                        <button className="text-white font-bold py-4 px-10  bg-linear-to-r from-blue-400 to-blue-800 border border-blue-500 shadow-md shadow-blue-700 rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:shadow-lg transition-transform duration-300 mt-6">
                            Launch Control Center<Plane size={20} />
                        </button>
                    </Link>

                </div>

            </div>
            <div className="flex p-18 gap-5   text-white pb-20 *:bg-[#091021] *:border-slate-800 *:rounded-2xl ">

                <div className="flex flex-col  gap-4 p-6   border hover:-translate-y-2 hover:shadow-sm hover:shadow-slate-600 hover:border-slate-600 transition-transform duration-400">
                    <div className="grid place-items-center size-14 bg-[#0e2137] border border-slate-700 rounded-2xl"><Globe2 size={24} color="#38BDF8" /></div>
                    <p className="font-bold text-xl">Global Route Management</p>
                    <p className="text-[#909eb3]">
                        Instantly deploy and modify flight routes across your entire network with real-time syncing
                    </p>
                </div>
                <div className="flex flex-col  gap-4 p-6 border hover:-translate-y-2 hover:shadow-sm hover:shadow-slate-600 hover:border-slate-600 transition-transform duration-400">
                    <div className="grid place-items-center size-14 bg-[#0e2137] border border-slate-700 rounded-2xl"><BarChart3 size={24} color="#38BDF8" /></div>
                    <p className="font-bold text-xl ">Customer Analytics</p>
                    <p className="text-[#909eb3]">
                        Track booking trends and passenger demographics with rich, interactive visualizations.
                    </p>


                </div>
                <div className="flex flex-col  gap-4 p-6 border  hover:-translate-y-2 hover:shadow-sm hover:shadow-slate-600 hover:border-slate-600 transition-transform duration-400">
                    <div className="grid place-items-center size-14 bg-[#0e2137] border border-slate-700 rounded-2xl">
                        <ShieldCheck size={24} color="#38BDF8" />
                    </div>
                    <p className="font-bold text-xl">Operational Security</p>
                    <p className="text-[#909eb3]">
                        Maintain 100% compliance with built-in crew rest tracking and maintenance health alerts.
                    </p>
                </div>
            </div>







        </div>
    );
}