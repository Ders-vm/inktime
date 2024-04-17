"use client";
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import AppointmentForm from './SchedulingComponents/AppointmentForm';
import AppointmentList from './SchedulingComponents/AppointmentList';
import { useUserAuth } from "../_utils/auth-context";
import { getAppointments } from '../_services/InkTimeServices';

const Page = () => {
  const { user } = useUserAuth();
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to handle form visibility
  const [overlapWarning, setOverlapWarning] = useState(false); // State variable for overlap warning

  useEffect(() => {
    const loadAppointments = async () => {
      if (user) {
        const userAppointments = await getAppointments(user.uid);
        setAppointments(userAppointments);
      }
    };
    loadAppointments();
  }, [user]);

  const handleAddAppointment = async (newAppointment) => {
    setOverlapWarning(false); // Reset overlap warning when adding a new appointment
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <main>
      <NavBar />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8">Scheduling</h1>
        <div className="mt-8">
          <button onClick={() => setShowForm(!showForm)} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
            {showForm ? 'Close Form' : 'New Appointment'}
          </button>
          {/* Render AppointmentForm component conditionally */}
          {showForm && (
            <AppointmentForm
              userId={user?.uid}
              setAppointments={handleAddAppointment}
              setShowForm={setShowForm}
              appointments={appointments}
              setOverlapWarning={setOverlapWarning} // Pass the state setter function to AppointmentForm
            />
          )}
        </div>
        {/* Render AppointmentList component */}
        <div className="mt-8">
          <AppointmentList appointments={appointments} />
        </div>
      </div>
      {/* Overlap warning message */}
      {overlapWarning && <p className="text-red-500 text-center mt-4">There's already an appointment scheduled for this time slot.</p>}
    </main>
  );
};

export default Page;
