import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddFlight from "./components/AddFlight.jsx";
import SearchFlights from "./components/SearchFlights.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SearchFlights />} />
                <Route path="/add-flight" element={<AddFlight />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
