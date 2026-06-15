import { Eye, Plane, X, Plus, Trash2, Pencil } from "lucide-react";
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

    const { flights, loading, setflights, route } = useAppData();

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


    console.log(flights[0]);
    // API call for  adding data
    const handlesubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost/flight_management_system/Flights/flightinsert.php", {
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
                f_status

            })
        });

        const data = await res.json();
        if (data.success) {
            alert(data.message);
        } else {
            alert(data.error);
        }
        setshowModel(false)
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
                <table className=" w-full mb-2">
                    <thead>
                        <tr className="border-b *:p-3 *:pt-9 border-slate-700 text-slate-400">
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

                            flights.map((fdata) => (
                                <tr className="border-b *:text-normal border-slate-700 *:p-4 " key={fdata.flight_code}>
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
                                            {fdata.f_load}
                                        </div>
                                    </th>
                                    <th >
                                        <div className=" rounded-2xl bg-[rgb(20,58,62)] font-normal text-[12px] px-5 py-1 text-amber-200">
                                            {fdata.f_status}
                                        </div>

                                    </th>
                                    <th className="flex gap-2 justify-end">
                                        <button className="p-2  rounded-xl bg-slate-800"

                                        >
                                            <Eye size={14} color="#38bdf8" />
                                        </button>
                                        <button className="p-2  rounded-xl bg-slate-800"

                                        >
                                            <Pencil size={14} color="#f59e0b" />
                                        </button>
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
                <div className="fixed  overflow-y-auto inset-0 bg-slate-950/50 backdrop-blur-sm flex justify-center pt-10">
                    <div className="min-h-250  rounded-xl w-106 border p-3 bg-[rgb(15,23,42)]" >
                        <div className="flex justify-between items-center mb-5">
                            <h1>Add New Flight</h1>

                            <button className="bg-slate-700/50  border p-2 rounded-xl" onClick={() => setshowModel(false)}>
                                <X size={20} />
                            </button>

                        </div>
                        <form onSubmit={handlesubmit}>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="fc">
                                    Flight Code
                                </label>
                                <input type="text"
                                    name="fc"
                                    required
                                    id="fc"
                                    value={flight_code}
                                    onChange={(e) => setflight_code(e.target.value)}
                                />

                                <label htmlFor="routes">Routes</label>

                                <select

                                    id="routes"
                                    name="routes"
                                    required
                                    value={r_id}
                                    onChange={(e) => setr_id(e.target.value)}

                                    className="bg-slate-800 text-amber-200">
                                    <option disabled

                                        value="">Select an active Route</option>
                                    {route.map((fd) => (

                                        <option key={fd.r_id} value={fd.r_id}>
                                            {fd.Origin} - {fd.Destination}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <label htmlFor="gate">
                                    Gate
                                </label>
                                <label htmlFor="departs">
                                    Departs
                                </label>
                                <input
                                    type="text"
                                    required
                                    id="gate"
                                    name="gate"
                                    value={gate}
                                    onChange={(e) => setgate(e.target.value)}
                                />


                                <input
                                    type="datetime-local"
                                    id="departs"
                                    name="departs"
                                    required
                                    value={departs}
                                    onChange={(e) => setdeparts(e.target.value)}
                                />
                                <label htmlFor="aircraft">
                                    Aircraft
                                </label>
                                <label htmlFor="f_load">
                                    Load
                                </label>
                                <input
                                    type="text"
                                    id="aircraft"
                                    required
                                    name="aircraft"
                                    value={aircraft}
                                    onChange={(e) => setaircraft(e.target.value)}
                                />
                                <input
                                    type="text"
                                    id="f_load"
                                    name="f_load"
                                    required
                                    value={f_load}
                                    onChange={(e) => setf_load(e.target.value)}
                                />

                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="f_status">
                                    Status
                                </label>
                                <select className="bg-slate-800 text-amber-200 mb-10 "
                                    id="f_status"
                                    name="f_status"
                                    required
                                    value={f_status}
                                    onChange={(e) => setf_status(e.target.value)}
                                >
                                    <option value="On Time">On Time</option>
                                    <option value="Security Checks">Security Checks</option>
                                    <option value="Boarding">Boarding</option>
                                    <option value="Delayed">Delayed</option>
                                </select>

                            </div>
                            <div className="border-b-2"></div>
                            <div><h1>Ticket Pricing($)</h1></div>
                            <div className="grid grid-cols-3 gap-4 mt-3 ">
                                <label htmlFor="economy">
                                    Economy
                                </label>
                                <label htmlFor="business">
                                    Business
                                </label>
                                <label htmlFor="first">
                                    First Class
                                </label>
                                <input type="text" id="economy" name="economy" className="mr-5" required />
                                <input type="text" id="business" name="business" required />
                                <input type="text" id="first" name="first" required />
                            </div>
                            <button>Canel</button>
                            <button type="submit" className="bg-sky-500  rounded-xl p-2 gap-2 ml-auto px-3 hover:bg-sky-700 transition duration-300">
                                <Plus size={18} className="translate-y-1"></Plus>
                                <span className="text-md font-inter">Add Flight</span>
                            </button>



                        </form>
                    </div>
                </div>
            )}






        </div>
    );
}