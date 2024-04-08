import React, { useState } from 'react';

function AppointmentForm({ appointments, addAppointment, setShowForm }) {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '00:00',
    endTime: '01:00',
    name: '',
    email: '',
    deposit: '',
    amount: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startTime') {
      const newEndTime = new Date(`2000-01-01T${value}`);
      newEndTime.setHours(newEndTime.getHours() + 1);
      const formattedEndTime = newEndTime.toTimeString().slice(0, 5);
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
        endTime: formattedEndTime
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const isOverlap = (newDate, newStartTime, newEndTime, existingAppointments) => {
    const newStartDateTime = new Date(`${newDate}T${newStartTime}`);
    const newEndDateTime = new Date(`${newDate}T${newEndTime}`);

    for (const appointment of existingAppointments) {
      const appointmentStartDateTime = new Date(`${appointment.date}T${appointment.startTime}`);
      const appointmentEndDateTime = new Date(`${appointment.date}T${appointment.endTime}`);

      // Check for overlap
      if (
        (newStartDateTime >= appointmentStartDateTime && newStartDateTime < appointmentEndDateTime) ||
        (newEndDateTime > appointmentStartDateTime && newEndDateTime <= appointmentEndDateTime) ||
        (newStartDateTime <= appointmentStartDateTime && newEndDateTime >= appointmentEndDateTime)
      ) {
        return true; // There's an overlap
      }
    }
    return false; // No overlap found
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { date, startTime, endTime, name, email, deposit, amount, details } = formData;

    if (isOverlap(date, startTime, endTime, appointments)) {
      alert("There's already an appointment scheduled for this time slot.");
      return; // Do not proceed with adding the appointment
    }

    addAppointment({ date, startTime, endTime, name, email, deposit, amount, details });
    setShowForm(false);
  };

  const handleCancel = () => {
    // Clear the form data or close the form here
    setShowForm(false); // Close the form
  };

  return (
    <div>
      <h1>Event Form</h1>
      <form onSubmit={handleSubmit} className="mt-8 form-box">
        <label className="block text-pink-500">
          <span>Date:</span>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="custom-input mt-1 block w-full" />
        </label>
        <div className="flex justify-between">
          <label className="block mt-4 text-pink-500 mr-2">
            <span>Start Time:</span>
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="custom-input mt-1 block" />
          </label>
          <label className="block mt-4 text-pink-500">
            <span>End Time:</span>
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="custom-input mt-1 block" />
          </label>
        </div>
        <label className="block mt-4 text-pink-500">
          <span>Name:</span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="custom-input mt-1 block w-full" />
        </label>
        <label className="block mt-4 text-pink-500">
          <span>Email:</span>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="custom-input mt-1 block w-full" />
        </label>
        <label className="block mt-4 text-pink-500">
          <span>Deposit $:</span>
          <input type="number" name="deposit" value={formData.deposit} onChange={handleChange} className="custom-input mt-1 block w-full" />
        </label>
        <label className="block mt-4 text-pink-500">
          <span>Quote:</span>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="custom-input mt-1 block w-full" />
        </label>
        <label className="block mt-4 text-pink-500">
          <span>Message:</span>
          <textarea name="details" value={formData.details} onChange={handleChange} className="custom-input mt-1 block w-full"></textarea>
        </label>
        <div className="flex justify-between">
          <button type="button" onClick={handleCancel} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;
