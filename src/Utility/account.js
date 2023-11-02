import axios from "axios";

export async function fetchUsers() {
  const url = "http://localhost:8000/user/";

  try {
    const { data: response } = await axios.get(url);
    if (!response || response.length === 0) throw new Error("No data found!");
    return response;
  } catch (err) {
    console.log(`There was an error: ${err}`);
    return err;
  }
}

export async function fetchUser(id) {
  const url = `http://localhost:8000/user/${id}/`;

  try {
    const { data: response } = await axios.get(url);
    if (!response) throw new Error("No data found!");
    return response;
  } catch (err) {
    console.log(`There was an error: ${err}`);
    return err;
  }
}

export async function postUser(user) {
  const url = "http://localhost:8000/user/";

  try {
    await axios.post(url, {
      name: user.name,
      pwd: user.pwd,
      email: user.email,
    });
    return "success";
  } catch (err) {
    console.log(`There was an error: ${err}`);
    return "error";
  }
}
