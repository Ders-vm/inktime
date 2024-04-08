"use client";
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import AppointmentForm from './SchedulingComponents/AppointmentForm';
import AppointmentList from './SchedulingComponents/AppointmentList';

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false); // New state to handle form visibility

  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  const cancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  return (
    <main>
      <NavBar />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Scheduling</h1>
        <div className="mt-8">
          <button onClick={() => setShowForm(true)} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">New Appointment</button>
          {/* Render AppointmentForm component conditionally */}
          {showForm && <AppointmentForm appointments={appointments} addAppointment={addAppointment} setShowForm={setShowForm} />}
        </div>
        {/* AppointmentList component */}
        <div className="mt-8">
          <AppointmentList appointments={appointments} cancelAppointment={cancelAppointment} />
        </div>
      </div>
    </main>
  );
};

export default Page;
