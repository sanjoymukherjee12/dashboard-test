import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { logout } from "../redux/Slicer";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (!user) return;

        const fetchUserData = async () => {
            try {
                const projectsRes = await axios.get(
                    `https://67c856710acf98d0708618f2.mockapi.io/users/projects?userId=${user.id}`
                );
                setProjects(projectsRes.data);
                setFilteredProjects(projectsRes.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, [user]);

    const handleSearch = useCallback(
        debounce((query) => {
            const filtered = projects.filter((p) =>
                p.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProjects(filtered);
        }, 500),
        [projects]
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        localStorage.setItem("theme", theme); 
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    return user ? (
        <div className={`flex min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-900 text-white p-5 space-y-4 transition-transform transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:relative`}
            >
                <button
                    className="absolute top-4 right-4 text-white md:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
                <nav>
                    <ul className="space-y-2">
                        <li className="hover:bg-blue-700 p-3 rounded">
                            <a href="#" className="block">🏠 Home</a>
                        </li>
                        <li className="hover:bg-blue-700 p-3 rounded">
                            <a href="#" className="block">📁 Projects</a>
                        </li>
                        <li className="hover:bg-blue-700 p-3 rounded">
                            <a href="#" className="block">📌 Tasks</a>
                        </li>
                        <li className="hover:bg-blue-700 p-3 rounded">
                            <a href="#" className="block">📊 Reports</a>
                        </li>
                        <li className="hover:bg-red-600 p-3 rounded cursor-pointer" onClick={handleLogout}>
                            🚪 Logout
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 p-6">
                <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden text-gray-600 dark:text-white text-xl"
                    >
                        ☰
                    </button>
                    <h2 className="text-xl font-semibold">Welcome, {user.email}!</h2>

                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    >
                        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />

                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-6">Your Projects</h3>
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="bg-blue-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                                <h4 className="font-semibold text-lg text-blue-900 dark:text-white">{project.title}</h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No projects found.</p>
                )}
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

export default memo(Dashboard);
