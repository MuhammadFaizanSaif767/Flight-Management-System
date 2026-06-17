
import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Plane, Route, Users, Ticket, ShieldCheck } from "lucide-react";
export default function Sidebar() {
    const basicStyle = "flex items-center gap-3 m-2 p-2 rounded-[10px] w-60";
    const activeStyle = "bg-[#38BDF81F]";
    const inactiveStyle = "hover:bg-[#38BDF81F]  transition duration-400";
    return (
        <div className="border border-slate-800 rounded-xl bg-[#091021] w-70 flex flex-col font-inter h-[calc(100vh-40px)] sticky top-5">
            <Link to="/" className="flex items-center gap-3 m-2 p-3">
                <div className="grid place-items-center size-11 bg-[linear-gradient(145deg,rgba(56,189,248,0.2),rgba(14,165,233,0.08))] rounded-xl border border-slate-700">
                    <Plane size={24} color="#38BDF8" />
                </div>
                <div className="font-sans tracking-tight">
                    <h1 className="text-xl font-bold font-inter">SKYFLOW</h1>
                    <p className="text-sm text-slate-400 m-0 font-inter">Operations Control</p>
                </div>
            </Link>
            <nav className="flex-1">
                <NavLink to="/dashboard" end className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : inactiveStyle}`}>

                    <LayoutDashboard size={18} />
                    Dashboard

                </NavLink>

                <NavLink to="/dashboard/flights" className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : inactiveStyle}`}>

                    <Plane size={18} />
                    Flights

                </NavLink>
                <NavLink to="/dashboard/routes" className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : inactiveStyle}`}>

                    <Route size={18} />
                    Routes

                </NavLink>
                <NavLink to="/dashboard/crew" className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : inactiveStyle}`}>

                    <Users size={18} />
                    Crew

                </NavLink>
                <NavLink to="/dashboard/customers" className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : inactiveStyle}`}>

                    <Users size={18} />
                    Customers

                </NavLink>
                <NavLink to="/dashboard/bookings" className={({ isActive }) => `${basicStyle} ${isActive ? activeStyle : inactiveStyle}`}>

                    <Ticket size={18} />
                    Bookings

                </NavLink>



            </nav >
            <footer className="mb-3 mx-3 p-4 border rounded-xl border-slate-800 bg-[#172132]  ">
                <h1 className="text-lg font-bold">Security Health</h1>
                <p className="text-sm  text-slate-400 py-1">All checkpoints and crew verifications are compliant.</p>
                <div className="flex items-center gap-2 justify-start text-[#86efac] text-[14px] mt-2"><ShieldCheck size={14} />
                    <span>Operational confidence: 98%</span>
                </div>
            </footer>

        </div >

    );
}