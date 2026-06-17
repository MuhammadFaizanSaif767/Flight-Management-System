import {
    Plane, Clock3, Wallet, Users, TrendingUp, MapPin,
    Ticket, UserCheck, AlertTriangle, CheckCircle2,
    ArrowUpRight, ArrowDownRight, BarChart3, Activity
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppData } from "../Context/Create_Context/flightcontext";

export default function Dashboard() {
    const { flights, booking, crew, customer, route, loading } = useAppData();
    const [dashdata, setdashdata] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        fetch("http://localhost/flight_management_system/Dashboard/dashboard.php")
            .then((res) => res.json())
            .then((data) => setdashdata(data))
            .catch((err) => console.error(err));
    }, []);

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Derived stats from context data
    const totalFlights = flights?.length || 0;
    const totalBookings = booking?.length || 0;
    const totalCrew = crew?.length || 0;
    const totalCustomers = customer?.filter((c) => c.c_name && c.c_name.trim() !== "").length || 0;
    const totalRoutes = route?.length || 0;

    const onTimeFlights = flights?.filter((f) => f.f_status === "On Time").length || 0;
    const delayedFlights = flights?.filter((f) => f.f_status === "Delayed").length || 0;
    const boardingFlights = flights?.filter((f) => f.f_status === "Boarding").length || 0;
    const securityFlights = flights?.filter((f) => f.f_status === "Security Checks").length || 0;

    const onTimeRate = totalFlights > 0 ? Math.round((onTimeFlights / totalFlights) * 100) : 0;

    const confirmedBookings = booking?.filter((b) => b.bk_status === "Confirmed").length || 0;
    const pendingBookings = booking?.filter((b) => b.bk_status === "Pending").length || 0;
    const cancelledBookings = booking?.filter((b) => b.bk_status === "Cancelled").length || 0;

    const totalRevenue = booking?.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0) || 0;

    const avgLoad = totalFlights > 0
        ? Math.round(flights.reduce((sum, f) => sum + (parseFloat(f.f_load) || 0), 0) / totalFlights)
        : 0;

    // Recent bookings (last 5)
    const recentBookings = booking?.slice(-5).reverse() || [];

    // Upcoming flights (next 5 by date)
    const upcomingFlights = [...(flights || [])]
        .filter((f) => f.f_date)
        .sort((a, b) => new Date(a.f_date) - new Date(b.f_date))
        .slice(0, 5);

    const statCards = [
        {
            title: "Total Flights",
            value: dashdata.totalflights ?? totalFlights,
            icon: <Plane size={20} />,
            gradient: "from-sky-500/20 to-blue-600/10",
            iconBg: "bg-sky-500/20",
            iconColor: "text-sky-400",
            change: `${onTimeFlights} on time`,
            changeUp: true,
        },
        {
            title: "On-Time Rate",
            value: `${dashdata.ontime ?? onTimeRate}%`,
            icon: <Clock3 size={20} />,
            gradient: "from-emerald-500/20 to-green-600/10",
            iconBg: "bg-emerald-500/20",
            iconColor: "text-emerald-400",
            change: `${delayedFlights} delayed`,
            changeUp: onTimeRate >= 80,
        },
        {
            title: "Total Passengers",
            value: dashdata.totalcustomers ?? totalCustomers,
            icon: <Users size={20} />,
            gradient: "from-violet-500/20 to-purple-600/10",
            iconBg: "bg-violet-500/20",
            iconColor: "text-violet-400",
            change: `${totalBookings} bookings`,
            changeUp: true,
        },
        {
            title: "Est. Revenue",
            value: `Rs ${(dashdata.revenue ?? totalRevenue).toLocaleString()}`,
            icon: <Wallet size={20} />,
            gradient: "from-amber-500/20 to-orange-600/10",
            iconBg: "bg-amber-500/20",
            iconColor: "text-amber-400",
            change: `${confirmedBookings} confirmed`,
            changeUp: true,
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "On Time": return "text-emerald-400 bg-emerald-500/15";
            case "Delayed": return "text-red-400 bg-red-500/15";
            case "Boarding": return "text-sky-400 bg-sky-500/15";
            case "Security Checks": return "text-amber-400 bg-amber-500/15";
            default: return "text-slate-400 bg-slate-500/15";
        }
    };

    const getBookingStatusColor = (status) => {
        switch (status) {
            case "Confirmed": return "text-emerald-400 bg-emerald-500/15";
            case "Pending": return "text-amber-400 bg-amber-500/15";
            case "Cancelled": return "text-red-400 bg-red-500/15";
            default: return "text-slate-400 bg-slate-500/15";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[80vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-5 my-7 font-inter">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <BarChart3 size={27} color="#38BDF8" />
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                    </div>
                    <p className="text-slate-400 text-sm ml-10">
                        Operations overview — {currentTime.toLocaleDateString("en-US", {
                            weekday: "long", year: "numeric", month: "long", day: "numeric",
                        })}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-sky-400 tabular-nums tracking-wider">
                        {currentTime.toLocaleTimeString("en-US", { hour12: true })}
                    </div>
                    <div className="flex items-center gap-1.5 justify-end mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-emerald-400 font-medium">Live</span>
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {statCards.map((card, i) => (
                    <div
                        key={i}
                        className={`bg-gradient-to-br ${card.gradient} border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-all duration-300`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-400 font-medium">{card.title}</span>
                            <div className={`${card.iconBg} ${card.iconColor} p-2 rounded-lg`}>
                                {card.icon}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-2">{card.value}</div>
                        <div className="flex items-center gap-1 text-xs">
                            {card.changeUp ? (
                                <ArrowUpRight size={14} className="text-emerald-400" />
                            ) : (
                                <ArrowDownRight size={14} className="text-red-400" />
                            )}
                            <span className={card.changeUp ? "text-emerald-400" : "text-red-400"}>
                                {card.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Second Row: Flight Status + Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Flight Status Breakdown */}
                <div className="col-span-2 bg-[rgb(9,16,34)] border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Activity size={18} className="text-sky-400" />
                            Flight Status
                        </h2>
                        <span className="text-xs text-slate-500">{totalFlights} total flights</span>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { label: "On Time", count: onTimeFlights, icon: <CheckCircle2 size={18} />, color: "emerald" },
                            { label: "Boarding", count: boardingFlights, icon: <Plane size={18} />, color: "sky" },
                            { label: "Security", count: securityFlights, icon: <UserCheck size={18} />, color: "amber" },
                            { label: "Delayed", count: delayedFlights, icon: <AlertTriangle size={18} />, color: "red" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl p-4 text-center`}
                                style={{
                                    background: `rgba(${item.color === "emerald" ? "16,185,129" : item.color === "sky" ? "14,165,233" : item.color === "amber" ? "245,158,11" : "239,68,68"}, 0.08)`,
                                    borderColor: `rgba(${item.color === "emerald" ? "16,185,129" : item.color === "sky" ? "14,165,233" : item.color === "amber" ? "245,158,11" : "239,68,68"}, 0.2)`,
                                }}
                            >
                                <div className={`mx-auto mb-2 text-${item.color}-400`}
                                    style={{
                                        color: item.color === "emerald" ? "#34d399" : item.color === "sky" ? "#38bdf8" : item.color === "amber" ? "#fbbf24" : "#f87171",
                                        display: "flex", justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div className="text-2xl font-bold text-white">{item.count}</div>
                                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Progress bar */}
                    {totalFlights > 0 && (
                        <div className="mt-5">
                            <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-slate-800">
                                {onTimeFlights > 0 && (
                                    <div
                                        className="bg-emerald-500 rounded-l-full transition-all duration-700"
                                        style={{ width: `${(onTimeFlights / totalFlights) * 100}%` }}
                                        title={`On Time: ${onTimeFlights}`}
                                    />
                                )}
                                {boardingFlights > 0 && (
                                    <div
                                        className="bg-sky-500 transition-all duration-700"
                                        style={{ width: `${(boardingFlights / totalFlights) * 100}%` }}
                                        title={`Boarding: ${boardingFlights}`}
                                    />
                                )}
                                {securityFlights > 0 && (
                                    <div
                                        className="bg-amber-500 transition-all duration-700"
                                        style={{ width: `${(securityFlights / totalFlights) * 100}%` }}
                                        title={`Security: ${securityFlights}`}
                                    />
                                )}
                                {delayedFlights > 0 && (
                                    <div
                                        className="bg-red-500 rounded-r-full transition-all duration-700"
                                        style={{ width: `${(delayedFlights / totalFlights) * 100}%` }}
                                        title={`Delayed: ${delayedFlights}`}
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> On Time</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> Boarding</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Security</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Delayed</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Stats Side Panel */}
                <div className="bg-[rgb(9,16,34)] border border-slate-800 rounded-2xl p-5">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                        <TrendingUp size={18} className="text-sky-400" />
                        Quick Stats
                    </h2>
                    <div className="space-y-4">
                        {[
                            { label: "Active Routes", value: totalRoutes, icon: <MapPin size={16} />, color: "text-sky-400" },
                            { label: "Crew Members", value: totalCrew, icon: <UserCheck size={16} />, color: "text-violet-400" },
                            { label: "Avg. Load", value: `${avgLoad}%`, icon: <BarChart3 size={16} />, color: "text-emerald-400" },
                            { label: "Confirmed", value: confirmedBookings, icon: <CheckCircle2 size={16} />, color: "text-emerald-400" },
                            { label: "Pending", value: pendingBookings, icon: <Clock3 size={16} />, color: "text-amber-400" },
                            { label: "Cancelled", value: cancelledBookings, icon: <AlertTriangle size={16} />, color: "text-red-400" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className={item.color}>{item.icon}</span>
                                    <span className="text-sm text-slate-400">{item.label}</span>
                                </div>
                                <span className="text-lg font-bold text-white">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Third Row: Recent Bookings + Upcoming Flights */}
            <div className="grid grid-cols-2 gap-4">
                {/* Recent Bookings */}
                <div className="bg-[rgb(9,16,34)] border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Ticket size={18} className="text-sky-400" />
                            Recent Bookings
                        </h2>
                        <span className="text-xs text-slate-500">{totalBookings} total</span>
                    </div>

                    {recentBookings.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            <Ticket size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No bookings yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentBookings.map((b, i) => (
                                <div
                                    key={b.bk_id || i}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center">
                                            <Ticket size={16} className="text-sky-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">{b.bk_name}</div>
                                            <div className="text-xs text-slate-500">{b.bk_id} · {b.flight_code}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-white">Rs {parseFloat(b.price || 0).toLocaleString()}</div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getBookingStatusColor(b.bk_status)}`}>
                                            {b.bk_status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Upcoming Flights */}
                <div className="bg-[rgb(9,16,34)] border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Plane size={18} className="text-sky-400" />
                            Flight Schedule
                        </h2>
                        <span className="text-xs text-slate-500">{totalFlights} total</span>
                    </div>

                    {upcomingFlights.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            <Plane size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No scheduled flights</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {upcomingFlights.map((f, i) => (
                                <div
                                    key={f.flight_code || i}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
                                            <Plane size={16} className="text-violet-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-white">{f.flight_code}</div>
                                            <div className="text-xs text-slate-500">{f.Routes || "—"}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400">{f.f_date || "TBD"}</div>
                                        <div className="text-xs text-slate-500">Gate {f.gate || "—"} · {f.departs || "—"}</div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getStatusColor(f.f_status)}`}>
                                            {f.f_status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}