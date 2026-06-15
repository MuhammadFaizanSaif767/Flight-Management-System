import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/sidebar";
import Topbar from "../Topbar/topbar";


export default function Layout() {

    return (
        <div className="flex min-h-screen bg-slate-950 text-white p-5">

            <Sidebar />
            <main className="flex-1">
                <Topbar />

                <div>
                    <Outlet />

                </div>

            </main>
        </div>
    );
}