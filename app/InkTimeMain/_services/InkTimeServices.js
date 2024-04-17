// InkTimeServices.js
import { db } from "../_utils/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

// Function to get all appointments for a user
export const getAppointments = async (userId) => {
  const appointments = [];
  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "appointments"));
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return []; // Return empty array if fetching fails
  }
};

// Function to add a new appointment for a user
export const addAppointment = async (userId, appointmentData) => {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "appointments"), appointmentData);
    return docRef.id; // Return the ID of the newly added appointment
  } catch (error) {
    console.error("Error adding appointment:", error);
    return null; // Return null if adding fails
  }
};

// Function to cancel an appointment for a user
export const cancelAppointment = async (userId, appointmentId) => {
  try {
    await deleteDoc(doc(db, "users", userId, "appointments", appointmentId));
    return true; // Return true if cancellation is successful
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return false; // Return false if cancellation fails
  }
};
