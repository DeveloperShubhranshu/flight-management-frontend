import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SearchFlights() {
    const [searchParams, setSearchParams] = useState({
        boarding_location: "",
        destination_location: "",
        date_of_travel: "",
    });
    const [flights, setFlights] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value,
        });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const { boarding_location, destination_location, date_of_travel } = searchParams;
        if (!boarding_location) {
            toast.error("Boarding Location is required");
            return;
        }
        if (!destination_location) {
            toast.error("Destination Location is required");
            return;
        }
        if (!date_of_travel) {
            toast.error("Date of Travel is required");
            return;
        }
        try {
            const response = await axios.get(
                "http://localhost:8000/api/flights/search",
                {
                    params: searchParams,
                }
            );
            if(response.data.length > 0){
              setFlights(response.data);
              toast.success("Flights fetched successfully");
            }else{
              toast.error("No flights found");
              setFlights([]);
            }
            
        } catch (error) {
            console.log("Error fetching flights", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    name="boarding_location"
                    placeholder="Boarding Location"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="destination_location"
                    placeholder="Destination Location"
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="date_of_travel"
                    onChange={handleChange}
                />
                <button type="submit">Search Flights</button>
            </form>

            <ul>
                {flights.length === 0 ? (
                    <p>No Flights Found</p>
                ) : (
                    flights.map((flight) => (
                        <li key={flight.id}>
                            {flight.flight_name} from {flight.takeoff_location}{" "}
                            to {flight.landing_location}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default SearchFlights;
