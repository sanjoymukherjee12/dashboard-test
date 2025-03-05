import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/AuthService";
import axios from "axios";

const projectAPI = "https://67c856710acf98d0708618f2.mockapi.io/users/projects";

const SignupPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const createDefaultProjects = async (userId) => {
      const defaultProjects = Array.from({ length: 2 }, (_, index) => ({
        userId,
        title: `Project ${String.fromCharCode(65 + index)}`,
        description: `Default project created on ${new Date().toLocaleDateString()}`
    }));
        await Promise.all(defaultProjects.map(project => axios.post(projectAPI, project)));
    };

    const handleSignup = async () => {
        try {
            const userResponse = await signupUser({ email, password });
            if (userResponse.id) {
                await createDefaultProjects(userResponse.id);
                setSuccess("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-5 border rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Sign Up</h2>
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="w-full p-2 mb-2 border" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full p-2 mb-2 border" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                <button className="w-full bg-green-500 text-white p-2 mb-2" onClick={handleSignup}>
                    Sign Up
                </button>
                <p className="text-center text-sm">
                    Already have an account? 
                    <button 
                        className="text-blue-500 hover:underline ml-1" 
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
