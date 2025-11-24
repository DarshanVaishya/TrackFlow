import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/Login.jsx';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
)
