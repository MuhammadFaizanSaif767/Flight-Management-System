import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './project/Components/Layout/layout';
import Home from './project/Pages/home';
import Routespage from './project/Pages/routes';
import Flights from './project/Pages/flights';
import Dashboard from './project/Pages/dashboard';
import Customers from './project/Pages/customers';
import Bookings from './project/Pages/booking';
import Maintainance from './project/Pages/maintainance';
import Crew from './project/Pages/crew';


export default function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="routes" element={<Routespage />} />
          <Route path="flights" element={<Flights />} />


          <Route path="customers" element={<Customers />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="maintainance" element={<Maintainance />} />
          <Route path="crew" element={<Crew />} />
        </Route>

      </Routes>
    </Router >
  );
}
