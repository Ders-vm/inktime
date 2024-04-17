// AppointmentList.js
import React from 'react';
import Appointment from './Appointment';
import { cancelAppointment } from '../../_services/InkTimeServices';

const AppointmentList = ({ appointments, userId, setAppointments }) => {
  const sortedAppointments = appointments.sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.startTime}`);
    const timeB = new Date(`${b.date}T${b.startTime}`);
    return timeA - timeB;
  });

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (confirmCancel) {
      const isCancelled = await cancelAppointment(userId, appointmentId);
      if (isCancelled) {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);
      } else {
        alert("Failed to cancel the appointment. Please try again later.");
      }
    }
  };

  return (
    <div className="appointment-list mt-8">
      <h2 className="text-2xl mb-4">Appointments</h2>
      {sortedAppointments.map((appointment) => (
        <div key={appointment.id} className="appointment-box border border-gray-200 p-4 mb-4">
          <Appointment appointment={appointment} />
          <button onClick={() => handleCancel(appointment.id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
