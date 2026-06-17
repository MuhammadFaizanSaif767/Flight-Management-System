import { Plus, Users, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useAppData } from "../Context/Create_Context/flightcontext";

export default function Customers() {
    const { customer, loading, setcustomer, searchQuery, booking } = useAppData();
    const [ph, setph] = useState("")
    const calculateTotalSpent = (customerName) => {
        if (!booking) return "0.00";
        const total = booking
            .filter((b) => b.bk_name === customerName && b.bk_status !== "Cancelled")
            .reduce((sum, b) => sum + Number(b.price || 0), 0);
        return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const [showmodel, setshowmodel] = useState(false);
    const [name, setname] = useState("");
    const [prefPayment, setprefPayment] = useState("");
    const [status, setstatus] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost/flight_management_system/Customers/customersinsert.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    c_name: name,
                    c_pef_payment: prefPayment,
                    c_status: status,
                    ph
                }),
            });

            const data = await res.json();

            if (data.success) {
                const newCustomer = {
                    c_id: data.c_id || Math.random(),
                    c_name: name,
                    c_pef_payment: prefPayment,
                    c_status: status,
                };

                setcustomer((prev) => [...prev, newCustomer]);

                setname("");
                setprefPayment("");
                setstatus("");

                alert(data.message || "Customer added successfully");
                setshowmodel(false);
            } else {
                alert(data.error || "Failed to add customer");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handledelete = async (code) => {
        try {
            const res = await fetch("http://localhost/flight_management_system/Customers/customersdelete.php", {
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
                setcustomer((prev) => prev.filter((f) => f.c_id !== code));
            } else {
                alert(result.error || "Failed to delete");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="mx-5 my-7 font-inter">
            <div className="flex gap-4 ">
                <Users size={27} color="#38BDF8" className="translate-y-1"></Users>
                <h1 className="text-3xl font-inter font-bold">Customer Management</h1>
                <button
                    className="flex bg-sky-500 rounded-xl p-2 gap-2 ml-auto px-3 hover:bg-sky-700 transition duration-300"
                    onClick={() => setshowmodel(true)}
                >
                    <Plus size={18} className="translate-y-1"></Plus>
                    <span className="text-md font-inter">Add Customer</span>
                </button>
            </div>

            <div className="mt-10 bg-[rgb(9,16,34)] w-full border border-slate-800 rounded-2xl p-3">
                <table className="w-full mb-2">
                    <thead>
                        <tr className="border-b *:p-3 *:pt-9 border-slate-700 text-slate-400 text-left">
                            <th>Name</th>
                            <th>Prefer Payment</th>
                            <th>Total Spent</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <tr>
                            <td colSpan={5} className="text-center font-bold p-5">
                                Loading...
                            </td>
                        </tr>}

                        {!loading && customer && customer.filter((cdata) => {
                            if (!cdata.c_name || cdata.c_name.trim() === "") return false;
                            if (!searchQuery) return true;
                            const term = searchQuery.toLowerCase();
                            return (cdata.c_name?.toLowerCase().includes(term) ||
                                cdata.c_pef_payment?.toLowerCase().includes(term) ||
                                cdata.c_status?.toLowerCase().includes(term));
                        }).map((cdata) => (
                            <tr className="border-b *:text-normal border-slate-700 *:p-3 " key={cdata.c_id}>
                                <td><div className="font-normal text-sm">{cdata.c_name}</div></td>
                                <td><div className="font-normal text-sm">{cdata.c_pef_payment}</div></td>
                                <td><div className="font-normal text-sm text-emerald-400 ">Rs {calculateTotalSpent(cdata.c_name)}</div></td>
                                <td><div className="font-normal text-sm text-emerald-400 ">{cdata.ph}</div></td>
                                <td>
                                    <div className="inline-block rounded-2xl bg-[rgb(20,58,62)] font-normal text-[12px] px-3 py-1 text-amber-200">
                                        {cdata.c_status}
                                    </div>
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700"
                                        onClick={() => handledelete(cdata.c_id)}
                                    >
                                        <Trash2 size={14} color="#ef4444" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showmodel && (
                <div className="fixed inset-0 overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex justify-center items-start pt-10 z-50">
                    <div className="w-150 mb-20 max-h-[900vh] rounded-2xl border border-slate-700 bg-[rgb(15,23,42)] shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold text-white">Add New Customer</h1>
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
                                    <label className="text-sm text-slate-300">Name</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-300">Contact</label>
                                    <input
                                        type="text"
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={ph}
                                        onChange={(e) => setph(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-300">Preferred Payment Method</label>
                                    <select
                                        className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                        value={prefPayment}
                                        onChange={(e) => setprefPayment(e.target.value)}
                                        required
                                    >
                                        <option disabled value="">Select Payment</option>
                                        <option>Credit Card</option>
                                        <option>Debit Card</option>
                                        <option>PayPal</option>
                                        <option>Bank Transfer</option>
                                        <option>Cash</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-slate-300">Status</label>
                                <select
                                    className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-200"
                                    value={status}
                                    onChange={(e) => setstatus(e.target.value)}
                                    required
                                >
                                    <option disabled value="">Set Status</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

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
                                    Save Customer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
