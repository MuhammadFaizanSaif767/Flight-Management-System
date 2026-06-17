import { Route, Plus, Trash2, X } from "lucide-react";

import { useAppData } from "../Context/Create_Context/flightcontext";
import { useState } from "react";

export default function Routespage() {

    const [showmodel, setshowmodel] = useState(false);
    const [origin, setorigin] = useState("");
    const [destination, setdestination] = useState("");
    const [distance, setdistance] = useState("");
    const [frequency, setfreq] = useState("");
    const [status, setstatus] = useState("");


    const { route, loading, setroute, searchQuery } = useAppData();


    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "http://localhost/flight_management_system/Routes/routesinsert.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        origin,
                        destination,
                        distance,
                        frequency,
                        status,
                    }),
                }
            );

            const data = await res.json();



            if (data.success) {

                const newRoute = {
                    Origin: origin,
                    Destination: destination,
                    Distance: distance,
                    Frequency: frequency,
                    Status: status
                };

                setroute((prev) => [...prev, newRoute]);

                setorigin("");
                setdestination("");
                setdistance("");
                setfreq("");
                setstatus("");

                alert(data.message);
                setshowmodel(false);

            } else {
                alert(data.error);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handledelete = async (code) => {
        try {
            const res = await fetch("http://localhost/flight_management_system/Routes/routesdelete.php", {
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

                setroute((prev) =>
                    prev.filter((f) => f.r_id !== code)
                );
            } else {
                alert(result.error);
            }
        }
        catch (err) {
            alert(err.message)
        }

    };



    return (
        <div className="mx-5 my-7 font-inter">
            <div className="flex gap-4 ">
                <Route size={27} color="#38BDF8" className="translate-y-1"></Route>
                <h1 className="text-3xl  font-inter font-bold">Route Management</h1>
                <button className="flex bg-sky-500  rounded-xl p-2 gap-2 ml-auto px-3 hover:bg-sky-700 transition duration-300"
                    onClick={() => setshowmodel(true)}>
                    <Plus size={18} className="translate-y-1"></Plus>
                    <span className="text-md font-inter">Add Route</span>
                </button>
            </div>
            <div className="mt-10 bg-[rgb(9,16,34)] w-full border border-slate-800 rounded-2xl p-3">
                <table className=" w-full mb-2">
                    <thead>
                        <tr className="border-b *:p-3 *:pt-9 border-slate-700 text-slate-400">
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Distance</th>
                            <th>Frequency</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr>
                            <td colSpan={5} className="text-center font-bold ">
                                Loading...
                            </td>

                        </tr>}



                        {

                            route.filter((rdata) => {
                                if (!searchQuery) return true;
                                const term = searchQuery.toLowerCase();
                                return (rdata.Origin?.toLowerCase().includes(term) ||
                                    rdata.Destination?.toLowerCase().includes(term) ||
                                    rdata.Status?.toLowerCase().includes(term));
                            }).map((rdata) => (
                                <tr className="border-b *:text-normal border-slate-700 *:p-3 " key={rdata.r_id}>
                                    <th><div className=" font-normal text-sm ">{rdata.Origin}</div></th>
                                    <th><div className=" font-normal text-sm">{rdata.Destination}</div></th>
                                    <th><div className=" font-normal text-sm">{rdata.Distance} Km</div></th>
                                    <th><div className=" font-normal text-sm">{rdata.Frequency}</div></th>


                                    <th className="flex gap-2 justify-center">



                                        <button className="p-2  rounded-xl bg-slate-800 
                                        "
                                            onClick={() => handledelete(rdata.r_id)}
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

            {showmodel && (
                <div className="fixed inset-0  overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex justify-center items-start pt-10 z-50">
                    <div className="w-150 mb-20 max-h-[900vh] rounded-2xl border border-slate-700 bg-[rgb(15,23,42)] shadow-2xl p-6">


                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold text-white">Add New Route</h1>

                            <button
                                onClick={() => setshowmodel(false)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handlesubmit} className="space-y-5">


                            <div className="flex flex-col gap-2">
                                <div>
                                    <label className="text-sm text-slate-300">Origin</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={origin}
                                        onChange={(e) => setorigin(e.target.value)}
                                        required
                                    />
                                    <label className="text-sm text-slate-300">Destination</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={destination}
                                        onChange={(e) => setdestination(e.target.value)}
                                        required
                                    />
                                    <label className="text-sm text-slate-300">Distance</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={distance}
                                        onChange={(e) => setdistance(e.target.value)}
                                        required
                                    />
                                </div>


                            </div>




                            <div>
                                <label className="text-sm text-slate-300">Frequency</label>
                                <select
                                    className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-200"
                                    value={frequency}
                                    onChange={(e) => setfreq(e.target.value)}
                                    required
                                >
                                    <option disabled value="">Set Frequency</option>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>4x Weekly</option>

                                </select>
                            </div>




                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setshowmodel(false)}
                                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Save Route
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}



        </div>
    );
}
