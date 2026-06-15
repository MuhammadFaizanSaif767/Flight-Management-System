
import { Plane, Clock3, Wallet, Users } from "lucide-react";
import { useEffect, useState } from "react";
export default function Dashboard() {

    const [dashdata, setdashdata] = useState([])
    useEffect(() => {
        fetch("http://localhost/flight_management_system/Dashboard/dashboard.php")
            .then(res => res.json())
            .then(data => setdashdata(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="p-4">
            <div className="border-2  *:border grid grid-cols-4">
                <div>
                    <div className="flex justify-between">
                        <h1>Active Flights</h1>
                        <Plane />
                    </div>
                    <div>
                        {dashdata.totalflights}
                    </div>
                    <div>Live Updates</div>


                </div>
                <div >
                    <div className="flex justify-between">
                        <h1>On Time Rate</h1>
                        <Clock3 />
                    </div>
                    <div>Live Updates</div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <h1>Est.Passengers</h1>
                        <Users />
                    </div>
                    <div>
                        {dashdata.totalcustomers}
                    </div>
                    <div>Live Updates</div>
                </div>
                <div>
                    <div className="flex justify-between">
                        <h1>Est.Revenue</h1>
                        <Wallet />
                    </div>
                    <div>
                        {dashdata.revenue}
                    </div>
                    <div>Live Updates</div>
                </div>
            </div>
        </div>
    );
}