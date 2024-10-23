import { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

function AddFlight() {
  const [flightData, setFlightData] = useState({
    flight_name: '',
    takeoff_location: '',
    landing_location: '',
    operating_days: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    setFlightData((prevData) => ({
      ...prevData,
      operating_days: checked
        ? [...prevData.operating_days, value]
        : prevData.operating_days.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/flights/add', flightData);
      toast.success('Flight added successfully');
      setFlightData({
        flight_name: '',
        takeoff_location: '',
        landing_location: '',
        operating_days: [],
      });
    } catch (error) {
      toast.error('Error adding flight',error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className='m' name="flight_name" placeholder="Flight Name" onChange={handleChange} />
      <input type="text" name="takeoff_location" placeholder="Takeoff Location" onChange={handleChange} />
      <input type="text" name="landing_location" placeholder="Landing Location" onChange={handleChange} />
      <div>
        <label>
          <input type="checkbox" value="Monday" onChange={handleDayChange} /> Monday
        </label>
        <label>
          <input type="checkbox" value="Tuesday" onChange={handleDayChange} /> Tuesday
        </label>
        <label>
          <input type="checkbox" value="Wednesday" onChange={handleDayChange} /> Wednesday
        </label>
        <label>
          <input type="checkbox" value="Thursday" onChange={handleDayChange} /> Thursday
        </label>
        <label>
          <input type="checkbox" value="Friday" onChange={handleDayChange} /> Friday
        </label>
        <label>
          <input type="checkbox" value="Saturday" onChange={handleDayChange} /> Saturday
        </label>
        <label>
          <input type="checkbox" value="Sunday" onChange={handleDayChange} /> Sunday
        </label>
      </div>
      <button type="submit">Add Flight</button>
    </form>
  );
}

export default AddFlight;
