import { useState, useEffect } from "react";
import { AppData } from "../Create_Context/flightcontext";


export default function DataProvider({ children }) {

    const [flights, setflights] = useState([]);
    const [route, setroute] = useState([]);
    const [crew, setcrew] = useState([]);
    const [customer, setcustomer] = useState([]);
    const [booking, setbooking] = useState([]);
    const [loading, setloading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        Promise.all([
            fetch("http://localhost/flight_management_system/Flights/flightget.php")
                .then(res => res.json())
                .catch(err => {
                    console.error("Flight fetch error:", err);
                    return [];
                }),

            fetch("http://localhost/flight_management_system/Routes/routesget.php")
                .then(res => res.json())
                .catch(err => {
                    console.error("Routes fetch error:", err);
                    return [];
                }),
            fetch("http://localhost/flight_management_system/Bookings/bookingget.php")
                .then(res => res.json())
                .catch(err => {
                    console.error("Bookings fetch error:", err);
                    return [];
                }),
            fetch("http://localhost/flight_management_system/Crew/crewget.php")
                .then(res => res.json())
                .catch(err => {
                    console.error("Crew fetch error:", err);
                    return [];
                }),
            fetch("http://localhost/flight_management_system/Customers/customersget.php")
                .then(res => res.json())
                .catch(err => {
                    console.error("Customer fetch error:", err);
                    return [];
                })

        ]).then(([flightsData, routeData, bookingData, crewData, customerData]) => {
            console.log("Flights:", flightsData);
            console.log("Routes:", routeData);
            console.log("Booking:", bookingData);
            console.log("Crew:", crewData);
            console.log("Customer:", customerData);

            setflights(Array.isArray(flightsData) ? flightsData : []);
            setroute(Array.isArray(routeData) ? routeData : []);
            setbooking(Array.isArray(bookingData) ? bookingData : []);
            setcrew(Array.isArray(crewData) ? crewData : []);
            setcustomer(Array.isArray(customerData) ? customerData : []);
        })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setloading(false);
            });
    }, []);

    return (

        <AppData.Provider value={{
            flights,
            setflights,

            route,
            setroute,
            crew,
            setcrew,
            customer,
            setcustomer,
            booking,
            setbooking,
            loading,
            searchQuery,
            setSearchQuery,
        }}>
            {children}
        </AppData.Provider>

    );
}

