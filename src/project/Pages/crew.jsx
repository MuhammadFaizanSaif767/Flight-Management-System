import { Users, Plus, Trash2, ShoppingCart, X, PlaneTakeoff } from "lucide-react";
import { useState } from "react";
import { useAppData } from "../Context/Create_Context/flightcontext";

export default function Crew() {
    const { crew, loading, setcrew, flights, searchQuery } = useAppData();

    const [showmodel, setshowmodel] = useState(false);
    const [name, setname] = useState("");
    const [role, setrole] = useState("");
    const [base, setbase] = useState("");
    const [status, setstatus] = useState("");

    // Assignment Cart State
    const [cart, setCart] = useState([]);
    const [targetFlight, setTargetFlight] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost/flight_management_system/Crew/crewinsert.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    crew_name: name,
                    crew_role: role,
                    crew_base: base,
                    flight_code: null, // New members start unassigned
                    crew_statue: status || "On Rest",
                }),
            });

            const data = await res.json();

            if (data.success) {
                const newCrew = {
                    crew_id: data.crew_id || Math.random(),
                    crew_name: name,
                    crew_role: role,
                    crew_base: base,
                    flight_code: null,
                    crew_statue: status || "On Rest"
                };

                setcrew((prev) => [...prev, newCrew]);

                setname("");
                setrole("");
                setbase("");
                setstatus("");

                alert(data.message || "Crew added successfully");
                setshowmodel(false);
            } else {
                alert(data.error || "Failed to add crew");
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    const handledelete = async (code) => {
        try {
            const res = await fetch("http://localhost/flight_management_system/Crew/crewdelete.php", {
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
                // Also remove from cart if they were there
                setCart(prev => prev.filter(c => c.crew_id !== code));
                setcrew((prev) => prev.filter((f) => f.crew_id !== code));
            } else {
                alert(result.error || "Failed to delete");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const addToCart = (crewMember) => {
        if (!cart.find(c => c.crew_id === crewMember.crew_id)) {
            setCart(prev => [...prev, crewMember]);
        }
    };

    const removeFromCart = (crewId) => {
        setCart(prev => prev.filter(c => c.crew_id !== crewId));
    };

    const handleDispatch = async () => {
        if (!targetFlight) {
            alert("Please select a target flight.");
            return;
        }
        if (cart.length === 0) {
            alert("Cart is empty.");
            return;
        }

        // Ideally, we'd make a single bulk API call here. 
        // For now, we'll try to update each member. If there is a bulk endpoint, you can swap this out.
        let successCount = 0;

        for (const member of cart) {
            try {
                // This assumes an endpoint exists for updating crew. 
                // If not, this is an optimistic UI update.
                const res = await fetch("http://localhost/flight_management_system/Crew/crewupdate.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        crew_id: member.crew_id,
                        flight_code: targetFlight,
                        crew_statue: "On Flight"
                    })
                });

                // We proceed optimistically
                successCount++;
            } catch (err) {
                console.error("Failed to update member", member.crew_id, err);
            }
        }

        // Update local state optimistically
        setcrew(prev => prev.map(member => {
            if (cart.find(c => c.crew_id === member.crew_id)) {
                return { ...member, flight_code: targetFlight, crew_statue: "On Flight" };
            }
            return member;
        }));

        alert(`Successfully dispatched ${successCount} crew members to ${targetFlight}`);
        setCart([]);
        setTargetFlight("");
    };

    const handleStatusChange = async (crew_id, newValue) => {
        if (newValue.startsWith("On Flight")) return;

        try {
            const res = await fetch("http://localhost/flight_management_system/Crew/crewupdate.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    crew_id: crew_id,
                    flight_code: "",
                    crew_statue: newValue
                })
            });
            const result = await res.json();
            if (result.success) {
                setcrew(prev => prev.map(c => c.crew_id === crew_id ? { ...c, crew_statue: newValue, flight_code: null } : c));
                // Remove from cart if they were there just in case
                setCart(prev => prev.filter(c => c.crew_id !== crew_id));
            } else {
                alert(result.error || "Failed to update status");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="mx-5 my-7 font-inter text-slate-200">
            {/* Header */}
            <div className="flex gap-4 items-center">
                <Users size={32} color="#38BDF8" className="" />
                <h1 className="text-3xl font-inter font-bold text-white">Crew Management</h1>
                <button
                    className="flex bg-[#0ea5e9] rounded-xl p-2 gap-2 ml-auto px-4 hover:bg-sky-600 transition duration-300 text-white font-medium items-center"
                    onClick={() => setshowmodel(true)}
                >
                    <Plus size={18} />
                    <span>Add Member</span>
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex gap-6 mt-8 items-start">

                {/* Left Column: Crew Table */}
                <div className="flex-1 bg-[#0b1120] border border-slate-800 rounded-2xl p-4 shadow-lg">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-left text-sm">
                                <th className="pb-4 font-medium pl-2">Name</th>
                                <th className="pb-4 font-medium">Role</th>
                                <th className="pb-4 font-medium">Base</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 font-medium text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <tr>
                                <td colSpan={5} className="text-center font-bold p-8 text-slate-500">
                                    Loading crew data...
                                </td>
                            </tr>}

                            {!loading && crew && crew.filter((cdata) => {
                                if (!searchQuery) return true;
                                const term = searchQuery.toLowerCase();
                                return (cdata.crew_name?.toLowerCase().includes(term) ||
                                        cdata.crew_role?.toLowerCase().includes(term) ||
                                        cdata.crew_base?.toLowerCase().includes(term) ||
                                        cdata.flight_code?.toLowerCase().includes(term) ||
                                        cdata.crew_statue?.toLowerCase().includes(term));
                            }).map((cdata) => {
                                const inCart = cart.some(c => c.crew_id === cdata.crew_id);
                                return (
                                    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors" key={cdata.crew_id}>
                                        <td className="py-4 pl-2 font-medium text-white">{cdata.crew_name}</td>
                                        <td className="py-4 text-slate-300">{cdata.crew_role}</td>
                                        <td className="py-4 text-slate-300">{cdata.crew_base}</td>
                                        <td className="py-4">
                                            <div className="relative inline-block">
                                                <select
                                                    className={`appearance-none rounded-full pl-3 pr-6 py-1 text-xs focus:outline-none cursor-pointer border transition-colors ${cdata.flight_code
                                                            ? 'bg-[#1e3a4c] border-[#2a5a75] text-[#7dd3fc] hover:bg-[#264b63]'
                                                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                                                        }`}
                                                    value={cdata.flight_code ? `On Flight (${cdata.flight_code})` : (cdata.crew_statue || "On Rest")}
                                                    onChange={(e) => handleStatusChange(cdata.crew_id, e.target.value)}
                                                >
                                                    {cdata.flight_code && (
                                                        <option value={`On Flight (${cdata.flight_code})`}>On Flight ({cdata.flight_code})</option>
                                                    )}
                                                    <option value="On Rest">On Rest</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Standby">Standby</option>
                                                    <option value="On Leave">On Leave</option>
                                                </select>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] opacity-70">
                                                    ▼
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    className={`p-2 rounded-lg transition-colors ${inCart || cdata.flight_code ? 'bg-[#164e63] text-sky-400 cursor-not-allowed opacity-50' : 'bg-[#1e293b] text-slate-400 hover:bg-slate-700 hover:text-sky-400'}`}
                                                    onClick={() => !inCart && !cdata.flight_code && addToCart(cdata)}
                                                    disabled={inCart || !!cdata.flight_code}
                                                    title={inCart ? "Already in cart" : (cdata.flight_code ? "Already on a flight" : "Add to Assignment Cart")}
                                                >
                                                    <ShoppingCart size={16} />
                                                </button>
                                                <button
                                                    className="p-2 rounded-lg bg-[#1e293b] text-slate-400 hover:bg-[#451a23] hover:text-red-400 transition-colors"
                                                    onClick={() => handledelete(cdata.crew_id)}
                                                    title="Remove Member"
                                                >
                                                    <Trash2 size={16} color='red' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Right Column: Assignment Cart */}
                <div className="w-[380px] bg-[#0b1120] border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col min-h-[500px]">

                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-xl font-semibold text-white">Assignment Cart</h2>
                        <div className="bg-[#0ea5e9] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {cart.length}
                        </div>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">Select Target Flight</p>

                    <div className="relative mb-6">
                        <select
                            className="w-full appearance-none bg-[#111827] border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-sky-500"
                            value={targetFlight}
                            onChange={(e) => setTargetFlight(e.target.value)}
                        >
                            <option value="">Select a flight...</option>
                            {flights && flights.map(f => (
                                <option key={f.flight_code} value={f.flight_code}>
                                    {f.flight_code} - {f.Routes?.split(/->|-/)[1]?.trim() || 'Unknown'}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>

                    {/* Cart Body */}
                    <div className="flex-1 overflow-y-auto mb-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 mt-20">
                                <ShoppingCart size={48} className="mb-4 opacity-20" />
                                <p className="text-center text-sm px-8">Select crew members to assign them to a flight.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cart.map(member => (
                                    <div key={member.crew_id} className="flex justify-between items-center bg-[#111827] border border-slate-800 p-3 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-white">{member.crew_name}</p>
                                            <p className="text-xs text-slate-400">{member.crew_role}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(member.crew_id)}
                                            className="text-slate-500 hover:text-red-400 p-1"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer / Dispatch Button */}
                    <button
                        className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${cart.length > 0 && targetFlight ? 'bg-[#0ea5e9] text-white hover:bg-sky-600 shadow-lg shadow-sky-900/20' : 'bg-[#1e293b] text-slate-500 cursor-not-allowed'}`}
                        onClick={handleDispatch}
                        disabled={cart.length === 0 || !targetFlight}
                    >
                        <PlaneTakeoff size={18} />
                        Dispatch Crew
                    </button>
                </div>
            </div>

            {/* Add Member Modal */}
            {showmodel && (
                <div className="fixed inset-0 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
                    <div className="w-[500px] mb-20 rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-xl font-semibold text-white">Add New Member</h1>
                            <button
                                onClick={() => setshowmodel(false)}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handlesubmit} className="space-y-5">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        required
                                        placeholder="e.g. Aisha Rahman"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-1 block">Role</label>
                                    <input
                                        type="text"
                                        className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                                        value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                        required
                                        placeholder="e.g. Captain, First Officer"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-slate-400 mb-1 block">Base</label>
                                        <input
                                            type="text"
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                                            value={base}
                                            onChange={(e) => setbase(e.target.value)}
                                            required
                                            placeholder="e.g. JFK, DXB"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-slate-400 mb-1 block">Status</label>
                                        <select
                                            className="w-full p-2.5 rounded-lg bg-[#1e293b] border border-slate-700 text-white focus:outline-none focus:border-sky-500 appearance-none"
                                            value={status}
                                            onChange={(e) => setstatus(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="On Rest">On Rest</option>
                                            <option value="Active">Active</option>
                                            <option value="Standby">Standby</option>
                                            <option value="On Leave">On Leave</option>
                                        </select>
                                    </div>
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
                                    <Plus size={16} />
                                    Add Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
