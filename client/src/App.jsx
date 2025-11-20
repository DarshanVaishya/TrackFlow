import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/Login.jsx';
import BugsPage from './pages/BugsPage.jsx';
import { useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './contexts/AuthContext.jsx';

export default function App() {
	const { setUser } = useContext(AuthContext)

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			try {
				const user = jwtDecode(token);
				setUser(user);
			} catch (e) {
				console.error("Failed to decode token:", e);
				setUser(null);
			}
		}
	}, [setUser]);

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/bugs' element={<BugsPage />} />
		</Routes>
	);
}

