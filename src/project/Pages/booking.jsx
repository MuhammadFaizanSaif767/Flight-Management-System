import { Plus, Trash2, X, ClipboardList } from "lucide-react";
import { useState } from "react";

import { useAppData } from "../Context/Create_Context/flightcontext";

export default function Bookings() {
    const { booking, loading, setbooking, flights, customer, searchQuery } = useAppData();

    const [showmodel, setshowmodel] = useState(false);
    const [name, setname] = useState("");
    const [bclass, setbclass] = useState("Economy");
    const [payment, setpayment] = useState("Credit Card");
    const [price, setprice] = useState("0.00");
    const [status, setstatus] = useState("Confirmed");
    const [flightcode, setflightcode] = useState("");

    // Auto-compute price from flight data based on selected class
    const getAutoPrice = (code, cls) => {
        const flight = flights?.find((f) => f.flight_code === code);
        if (!flight) return "";
        if (cls === "Economy") return flight.eco || "";
        if (cls === "Business") return flight.business || "";
        if (cls === "First Class") return flight.first || "";
        return "";
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const generatedBkid = "BK" + Math.floor(1000 + Math.random() * 9000);

        try {
            const res = await fetch("http://localhost/flight_management_system/Bookings/bookingsinsert.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bk_id: generatedBkid,
                    bk_name: name,
                    class: bclass,
                    payment: payment,
                    price: price,
                    bk_status: status,
                    flight_code: flightcode,
                }),
            });

            const data = await res.json();

            if (data.success) {
                const newBooking = {
                    bk_id: generatedBkid,
                    bk_name: name,
                    class: bclass,
                    payment: payment,
                    price: price,
                    bk_status: status,
                    flight_code: flightcode,
                };

                setbooking((prev) => [...prev, newBooking]);

                setname("");
                setbclass("Economy");
                setpayment("Credit Card");
                setprice("0.00");
                setstatus("Confirmed");
                setflightcode("");

                alert(data.message || "Booking added successfully");
                setshowmodel(false);
            } else {
                alert(data.error || "Failed to add booking");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handledelete = async (code) => {
        try {
            const res = await fetch("http://localhost/flight_management_system/Bookings/bookingsdelete.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code
                })
            });

            const result = await res.json();

            if (result.success) {
                alert(result.message || "Deleted successfully");
                setbooking((prev) => prev.filter((f) => f.bk_id !== code));
            } else {
                alert(result.error || "Failed to delete");
            }
        } catch (err) {
            alert(err.message);
        }
    };



    return (
        <div className="mx-5 my-7 font-inter">
                <div className="flex gap-4">
                    <ClipboardList size={27} color="#38BDF8" className="translate-y-1" />
                    <h1 className="text-3xl font-inter font-bold">Booking Management</h1>
                    <button
                        className="flex bg-sky-500 rounded-xl p-2 gap-2 ml-auto px-3 hover:bg-sky-700 transition duration-300"
                        onClick={() => setshowmodel(true)}
                    >
                        <Plus size={18} className="translate-y-1" />
                        <span className="text-md font-inter">Add Booking</span>
                    </button>
                </div>

                <div className="mt-10 bg-[rgb(9,16,34)] w-full border border-slate-800 rounded-2xl p-3">
                    <table className="w-full mb-2">
                        <thead>
                            <tr className="border-b *:p-3 *:pt-9 border-slate-700 text-slate-400 text-left">
                                <th>Ref</th>
                                <th>Customer</th>
                                <th>Flight</th>
                                <th>Class</th>
                                <th>Payment</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={8} className="text-center font-bold p-5">
                                        Loading...
                                    </td>
                                </tr>
                            )}
                            {!loading && booking && booking
                                .filter((bdata) => {
                                    if (!searchQuery) return true;
                                    const term = searchQuery.toLowerCase();
                                    return (
                                        bdata.bk_id?.toLowerCase().includes(term) ||
                                        bdata.bk_name?.toLowerCase().includes(term) ||
                                        bdata.flight_code?.toLowerCase().includes(term) ||
                                        bdata.class?.toLowerCase().includes(term) ||
                                        bdata.bk_status?.toLowerCase().includes(term)
                                    );
                                })
                                .map((bdata) => (
                                    <tr className="border-b *:text-normal border-slate-700 *:p-3" key={bdata.bk_id}>
                                        <td><div className="font-normal text-sm">{bdata.bk_id}</div></td>
                                        <td><div className="font-normal text-sm">{bdata.bk_name}</div></td>
                                        <td><div className="font-normal text-sm">{bdata.flight_code}</div></td>
                                        <td><div className="font-normal text-sm">{bdata.class}</div></td>
                                        <td><div className="font-normal text-sm">{bdata.payment}</div></td>
                                        <td><div className="font-normal text-sm">Rs {bdata.price}</div></td>
                                        <td>
                                            <div className="inline-block rounded-2xl bg-[rgb(20,58,62)] font-normal text-[12px] px-3 py-1 text-amber-200">
                                                {bdata.bk_status}
                                            </div>
                                        </td>
                                        <td className="flex gap-2 justify-center">
                                            <button
                                                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700"
                                                onClick={() => handledelete(bdata.bk_id)}
                                            >
                                                <Trash2 size={14} color="#ef4444" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                {showmodel && (
                    <div className="fixed inset-0 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
                        <div className="w-[500px] mb-20 rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-xl font-semibold text-white">Create New Booking</h1>
                                <button
                                    onClick={() => setshowmodel(false)}
                                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handlesubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Customer</label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500 appearance-none"
                                            value={name}
                                            onChange={(e) => setname(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select a customer</option>
                                            {customer && customer.filter((c) => c.c_name && c.c_name.trim() !== "").map((c) => (
                                                <option key={c.c_id} value={c.c_name}>{c.c_name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Flight</label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500 appearance-none"
                                            value={flightcode}
                                            onChange={(e) => {
                                                const code = e.target.value;
                                                setflightcode(code);
                                                setprice(getAutoPrice(code, bclass));
                                            }}
                                            required
                                        >
                                            <option value="" disabled>Select a flight</option>
                                            {flights && flights.map((f) => (
                                                <option key={f.flight_code} value={f.flight_code}>
                                                    {f.flight_code} - {f.Routes?.split(/->|-/)[1]?.trim() || 'Unknown'}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Cabin Class</label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500 appearance-none"
                                            value={bclass}
                                            onChange={(e) => {
                                                const cls = e.target.value;
                                                setbclass(cls);
                                                setprice(getAutoPrice(flightcode, cls));
                                            }}
                                            required
                                        >
                                            <option value="Economy">Economy</option>
                                            <option value="Business">Business</option>
                                            <option value="First Class">First Class</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                                    </div>
                                </div>


                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Payment Method</label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500 appearance-none"
                                            value={payment}
                                            onChange={(e) => setpayment(e.target.value)}
                                            required
                                        >
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Bank Transfer">Bank Transfer</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Status</label>
                                    <div className="relative">
                                        <select
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500 appearance-none"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                            required
                                        >
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => setshowmodel(false)}
                                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-lg bg-[#0ea5e9] hover:bg-sky-600 text-white flex items-center gap-2 transition-colors font-medium"
                                    >
                                        Create Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </div>
    );
}
