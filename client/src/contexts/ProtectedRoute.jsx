import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Spinner from "../components/utils/Spinner";

export default function ProtectedRoute() {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <Spinner />;
	if (!user) return <Navigate to="/login" replace />;
	return <Outlet />;
}
