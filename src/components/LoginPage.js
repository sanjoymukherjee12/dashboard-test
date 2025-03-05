import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/Slicer";
import { memo } from "react";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { loading, error } = useSelector((state) => state.auth);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = useCallback(() => {
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address");
            return;
        }

        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => navigate("/dashboard"))
            .catch(() => {}); 
    }, [dispatch, email, password, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Welcome Back</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?  
                    <button 
                        className="text-blue-500 hover:underline ml-1" 
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default memo(LoginPage);
