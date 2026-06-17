import { Plane, X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useAppData } from "../Context/Create_Context/flightcontext";
export default function Flights() {
    const [showModel, setshowModel] = useState(false);
    const [flight_code, setflight_code] = useState("");
    const [gate, setgate] = useState("");
    const [r_id, setr_id] = useState("");
    const [departs, setdeparts] = useState("");
    const [aircraft, setaircraft] = useState("");
    const [f_load, setf_load] = useState("");
    const [f_status, setf_status] = useState("");
    const [date, setdate] = useState("")
    const [eco, seteco] = useState("");
    const [first, setfirst] = useState("");
    const [business, setbusiness] = useState("")

    const { flights, loading, setflights, route, searchQuery } = useAppData();

    const handledelete = async (code) => {
        try {
            const res = await fetch("http://localhost/flight_management_system/Flights/flightdelete.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code
                })

            })

            const result = await res.json();

            if (result.success) {
                alert(result.message);

                setflights((prev) =>
                    prev.filter((f) => f.flight_code !== code)
                );
            } else {
                alert(result.error);
            }
        }
        catch (err) {
            alert(err.message)
        }

    };




    // API call for  adding data
    const handlesubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(
            "http://localhost/flight_management_system/Flights/flightinsert.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    flight_code,
                    gate,
                    r_id,
                    departs,
                    aircraft,
                    f_load,
                    f_status,
                    date,
                    eco,
                    first,
                    business
                })
            }
        );

        const data = await res.json();

        if (data.success) {

            const selectedRoute = route.find(
                (r) => r.r_id == r_id
            );

            const newFlight = {
                flight_code,
                gate,
                Routes: `${selectedRoute?.Origin} - ${selectedRoute?.Destination}`,
                f_date: date,
                departs,
                aircraft,
                f_load,
                f_status,
                eco,
                first,
                business
            };

            setflights((prev) => [...prev, newFlight]);

            alert(data.message);

            setflight_code("");
            setgate("");
            setr_id("");
            setdeparts("");
            setaircraft("");
            setf_load("");
            setf_status("");
            setdate("");
            seteco("");
            setfirst("");
            setbusiness("");

            setshowModel(false);

        } else {
            alert(data.error);
        }
    };



    return (
        <div className="mx-5 my-7 font-inter">



            <div className="flex gap-4 ">
                <Plane size={27} color="#38BDF8" className="translate-y-1"></Plane>
                <h1 className="text-3xl  font-inter font-bold">Flight Management</h1>
                <button
                    onClick={() => { setshowModel(true) }}
                    className="flex bg-sky-500  rounded-xl p-2 gap-2 ml-auto px-3 hover:bg-sky-700 transition duration-300">
                    <Plus size={18} className="translate-y-1"></Plus>
                    <span className="text-md font-inter">Add Flight</span>
                </button>
            </div>
            <div className="mt-10 bg-[rgb(9,16,34)] w-full border border-slate-800 rounded-2xl p-3">
                <table className=" w-full mb-2 ">
                    <thead>
                        <tr className="border-b *:p-2 *:pt-9 border-slate-700 text-slate-400">
                            <th>Flight</th>
                            <th>Route</th>
                            <th>Gate</th>
                            <th>Date</th>
                            <th>Departs</th>

                            <th>Aircraft</th>
                            <th>Load</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr>
                            <td colSpan={8} className="text-center font-bold ">
                                Loading...
                            </td>

                        </tr>}



                        {
                            flights.filter((fdata) => {
                                if (!searchQuery) return true;
                                const term = searchQuery.toLowerCase();
                                return (fdata.flight_code?.toLowerCase().includes(term) ||
                                    fdata.Routes?.toLowerCase().includes(term) ||
                                    fdata.gate?.toLowerCase().includes(term) ||
                                    fdata.f_status?.toLowerCase().includes(term) ||
                                    fdata.aircraft?.toLowerCase().includes(term));
                            }).map((fdata) => (
                                <tr className="border-b *:text-[8px] border-slate-700 *:p-4 " key={fdata.flight_code}>
                                    <th>
                                        <div className=" font-normal text-sm ">
                                            {fdata.flight_code}
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" font-normal text-sm">
                                            {fdata.Routes}
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" font-normal text-sm">
                                            {fdata.gate}
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" font-normal text-sm">
                                            {fdata.f_date}
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" font-normal text-sm">
                                            {fdata.departs}
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" font-normal text-sm">
                                            {fdata.aircraft}
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" font-normal text-sm">
                                            {fdata.f_load}%
                                        </div>
                                    </th>
                                    <th>
                                        <div className=" rounded-2xl bg-[rgb(20,58,62)] font-normal text-[8px] px-2  text-center py-1 text-amber-200">
                                            {fdata.f_status}
                                        </div>

                                    </th>
                                    <th>
                                        <button className="p-2  rounded-xl bg-slate-800 
                                        "
                                            onClick={() => handledelete(fdata.flight_code)}
                                        >
                                            <Trash2 size={14} color="#ef4444" />
                                        </button>
                                    </th>

                                </tr>
                            ))
                        }
                    </tbody>



                </table>

            </div>


            {showModel && (
                <div className="fixed inset-0  overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex justify-center items-start pt-10 z-50">
                    <div className="w-150 max-h-[900vh] rounded-2xl border border-slate-700 bg-[rgb(15,23,42)] shadow-2xl p-6">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold text-white">Add New Flight</h1>

                            <button
                                onClick={() => setshowModel(false)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handlesubmit} className="space-y-5">

                            {/* Flight Code + Gate */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-300">Flight Code</label>
                                    <input
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-500"
                                        value={flight_code}
                                        onChange={(e) => setflight_code(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-slate-300">Gate</label>
                                    <input
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-sky-500"
                                        value={gate}
                                        onChange={(e) => setgate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Route */}
                            <div>
                                <label className="text-sm text-slate-300">Route</label>
                                <select
                                    className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-200"
                                    value={r_id}
                                    onChange={(e) => setr_id(e.target.value)}
                                    required
                                >
                                    <option value="">Select an active route</option>
                                    {route.map((fd) => (
                                        <option key={fd.r_id} value={fd.r_id}>
                                            {fd.Origin} - {fd.Destination}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date + Departs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-300">Date</label>
                                    <input
                                        type="date"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={date}
                                        onChange={(e) => setdate(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-slate-300">Departs</label>
                                    <input
                                        type="time"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={departs}
                                        onChange={(e) => setdeparts(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Aircraft + Load */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-300">Aircraft</label>
                                    <input
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={aircraft}
                                        onChange={(e) => setaircraft(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-slate-300">Load %</label>
                                    <input
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={f_load}
                                        type="number"

                                        onChange={(e) => setf_load(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-sm text-slate-300">Status</label>
                                <select
                                    className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-200"
                                    value={f_status}
                                    onChange={(e) => setf_status(e.target.value)}
                                    required
                                >
                                    <option value="">Set Status</option>
                                    <option>On Time</option>
                                    <option>Security Checks</option>
                                    <option>Boarding</option>
                                    <option>Delayed</option>
                                </select>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-700 pt-4">
                                <h2 className="text-white font-semibold mb-3">
                                    Ticket Pricing (Rs)
                                </h2>

                                <div className="grid grid-cols-3 gap-3">
                                    <input
                                        placeholder="Economy"
                                        type="number"
                                        className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={eco}
                                        onChange={(e) => seteco(e.target.value)}
                                        required
                                    />

                                    <input
                                        placeholder="Business"
                                        type="number"
                                        className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={business}
                                        onChange={(e) => setbusiness(e.target.value)}
                                        required
                                    />

                                    <input
                                        placeholder="First"
                                        type="number"
                                        className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={first}
                                        onChange={(e) => setfirst(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setshowModel(false)}
                                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Save Flight
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}






        </div>
    );
}