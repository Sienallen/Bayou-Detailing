import { useState } from 'react';
import { validZips } from './ValidZip';
import { supabase } from '../SupabaseClient';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    zip: '',
    service: '',
    date: '',
    time_slot: '',
  });

  const [zipError, setZipError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setZipError(false);

    if (!validZips.includes(formData.zip.trim())) {
      setZipError(true);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('booking_forms').insert([formData]);

    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Booking has been made');
      setFormData({
        name: '',
        vehicle: '',
        date: '',
        zip: '',
        service: '',
        time_slot: '',
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-900 border-black border-2 rounded-md p-10 gap-5 w-[50%] m-auto justify-center items-center"
      >
        <h2>Book With Bayou Detail Co.</h2>
        <div className="flex flex-col w-[70%]">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            className="border-2 border-white rounded-md p-1 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="vehicle">Vehicle (Year/Make/ Model)</label>
          <input
            type="text"
            id="vehicle"
            className="border-2 border-white rounded-md p-1 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            placeholder="e.g., 2024 Honda Civic"
            required
          />
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="zip">Zip Code (Houston Area Only)</label>
          <input
            type="text"
            id="zip"
            className="border-2 border-white rounded-md p-1 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
            name="zip"
            maxLength={5}
            inputMode="numeric"
            value={formData.zip}
            onChange={handleChange}
            required
          />
          {zipError && (
            <p role="alert" className="text-red-500">
              Sorry, we don't service this zip code yet.
            </p>
          )}
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="service">Select Service</label>
          <select
            id="service"
            className="border-2 border-white rounded-md text-white bg-slate-900 p-1 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose a service
            </option>
            <option value="Wash & Wax">Wash & Wax</option>
            <option value="Interior Deep Clean">Interior Deep Clean</option>
            <option value="Full Detail">Full Detail</option>
            <option value="Ceramic Coating">Ceramic Coating</option>
            <option value="Maintenance Plan Visit">
              Maintenance Plan Visit
            </option>
          </select>
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="date">Pick a Date</label>
          <input
            type="date"
            name="date"
            className="custom-date-input border-white border-2 rounded-md p-1 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="flex flex-col w-[70%]">
          <label htmlFor="time_slot">Preferred Time Slot</label>
          <select
            id="time_slot"
            name="time_slot"
            className="border-2 border-white rounded-md p-1 bg-slate-900 hover:border-blue-400 focus:border-blue-400 focus:outline-none"
            value={formData.time_slot}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose a time window
            </option>
            <option value="8:00am - 10:00am">8:00am - 10:00am</option>
            <option value="10:00am - 12:00pm">10:00am - 12:00pm</option>
            <option value="12:00pm - 2:00pm">12:00pm - 2:00pm</option>
            <option value="2:00pm - 4:00pm">2:00pm - 4:00pm</option>
          </select>
        </div>

        <button
          type="submit"
          className="border-2 border-white rounded-md cursor-pointer w-fit p-1 hover:border-amber-200"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Book Mobile Detail'}
        </button>
      </form>
    </>
  );
};

export default BookingForm;
