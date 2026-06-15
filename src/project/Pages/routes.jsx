import { Route, Plus, Trash2 } from "lucide-react";

import { useAppData } from "../Context/Create_Context/flightcontext";

export default function Routespage() {



    const { route, loading, setroute } = useAppData();


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
                <button className="flex bg-sky-500  rounded-xl p-2 gap-2 ml-auto px-3 hover:bg-sky-700 transition duration-300">
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
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr>
                            <td colSpan={6} className="text-center font-bold ">
                                Loading...
                            </td>

                        </tr>}



                        {

                            route.map((rdata) => (
                                <tr className="border-b *:text-normal border-slate-700 *:p-3 " key={rdata.r_id}>
                                    <th><div className=" font-normal text-sm ">{rdata.Origin}</div></th>
                                    <th><div className=" font-normal text-sm">{rdata.Destination}</div></th>
                                    <th><div className=" font-normal text-sm">{rdata.Distance}</div></th>
                                    <th><div className=" font-normal text-sm">{rdata.Frequency}</div></th>

                                    <th >
                                        <div className=" rounded-2xl bg-[rgb(20,58,62)] font-normal text-[12px] px-5 py-1 text-amber-200">   {rdata.Status}  </div>

                                    </th>
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





        </div>
    );
}
