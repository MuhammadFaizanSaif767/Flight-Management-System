import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Topbar from "../Topbar/topbar";


export default function Layout() {

    return (
        <div className="flex min-h-screen bg-slate-950 text-white p-5 print:p-0 print:bg-white print:text-black">
            <div className="print:hidden">
                <Sidebar />
            </div>
            
            <main className="flex-1 print:w-full">
                <div className="print:hidden">
                    <Topbar />
                </div>

                <div className="print:m-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}