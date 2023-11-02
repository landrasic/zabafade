import axios from "axios";

export async function fetchAppointments() {
  const url = "http://localhost:8000/appointment/";

  try {
    const { data: response } = await axios.get(url);
    if (!response || response.length === 0) throw new Error("No data found!");
    return response;
  } catch (err) {
    console.log(`There was an error: ${err}`);
    return err;
  }
}

export async function fetchAppointmentByFilter(filter, value) {
  const url = `http://localhost:8000/appointment/?${filter}=${value}`;

  try {
    const { data: response } = await axios.get(url);
    if (!response) throw new Error("No data found!");
    return response;
  } catch (err) {
    console.log(`There was an error: ${err}`);
    return err;
  }
}

export async function postAppointment(appointment) {
  const url = "http://localhost:8000/appointment/";

  try {
    await axios.post(url, {
      client: appointment.clientId,
      dateTime: appointment.dateTime,
    });
    return "success";
  } catch (err) {
    console.log(`There was an error: ${err}`);
    return "error";
  }
}
