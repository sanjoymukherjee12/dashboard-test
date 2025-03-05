import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../components/LoginPage"));
const SignupPage = lazy(() => import("../components/SignupPage"));
const Dashboard = lazy(() => import("../components/Dashboard"));

const Loading = () => (
    <div className="flex justify-center items-center h-screen text-gray-700 text-xl font-semibold">
        Loading...
    </div>
);

const Root = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Suspense>
    );
};

export default Root;
