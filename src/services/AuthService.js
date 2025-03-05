import axios from "axios";

const mockAPI = "https://67c856710acf98d0708618f2.mockapi.io/users/user";

export const mockLogin = async ({ email, password }) => {
    try {
        const response = await axios.get(`${mockAPI}?email=${email}`);

        if (!response.data.length) {
            throw new Error("User not found. Please check your email.");
        }

        const user = response.data.find(user => user.password === password);

        if (!user) {
            throw new Error("Incorrect password. Please try again.");
        }

        return { token: "mockToken123", user };

    } catch (error) {
        throw new Error(error.message || "Error connecting to authentication server");
    }
};

export const signupUser = async ({ email, password }) => {
    try {
        const response = await axios.post(mockAPI, { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Error creating user");
    }
};
