import React from 'react';

const Appointment = ({ appointment }) => {
  const { name, email, deposit, amount, date, startTime, endTime, details, confirmed } = appointment;

  return (
    <div className="appointment">
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Deposit: {deposit}</p>
      <p>Quote: {amount}</p>
      <p>Date: {date}</p>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p>Details: {details}</p>
      <p>Confirmed: {confirmed ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Appointment;
