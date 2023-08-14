import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

// api functions
export async function postRegister(data) {
    try {
        const response = await api.post("/register", data);
        alert(response.data.message);
        // console.log(response);
        // console.log('user to be registered: ', data);
    } catch (error) {
        alert(error.response.data);
        // console.log('error registering user: ', error);
    }   
}

export async function postLogin(data) {
    try {
        const response = await api.post("/login", data);
        // alert(response.data.message);
        console.log('response: ', response.data.message);
        // console.log('user to be logged in: ', data);
        return response;
    } catch (error) {
        // alert(error.response.data);
        // console.log('error logging in user: ', error);
        return error.response.data;
    } 
}