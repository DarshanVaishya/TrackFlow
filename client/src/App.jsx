import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/Login.jsx';
import BugsPage from './pages/BugsPage.jsx';
import { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import BugPage from './pages/BugPage.jsx';
import NewBugPage from './pages/NewBugPage.jsx';
import EditBugPage from './pages/EditBugPage.jsx';
import ProtectedRoute from './contexts/ProtectedRoute.jsx';
import { AuthContext } from './contexts/AuthContext.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import NewProjectPage from './pages/NewProjectPage.jsx';
import EditProjectPage from './pages/EditProjectPage.jsx';
import axios from 'axios';

export default function App() {
	const { setUser, setLoading } = useContext(AuthContext)

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			try {
				const data = jwtDecode(token);
				const user = data.user
				setUser(user);
				console.log("DEFAULT SET")
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			} catch (e) {
				console.error("Failed to decode token:", e);
				setUser(null);
			}
		}
		setLoading(false)
	}, [setUser, setLoading]);

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route path='/projects' element={<ProjectsPage />} />
				<Route path='/projects/new' element={<NewProjectPage />} />
				<Route path='/projects/:project_id/edit' element={<EditProjectPage />} />
				<Route path='/projects/:project_id/bugs' element={<BugsPage />} />
				<Route path='/projects/:project_id/bugs/:bug_id' element={<BugPage />} />
				<Route path='/projects/:project_id/bugs/new' element={<NewBugPage />} />
				<Route path='/projects/:project_id/bugs/:bug_id/edit' element={<EditBugPage />} />
			</Route>
		</Routes>
	);
}

