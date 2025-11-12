import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/HomePage';
import BugsPage from './pages/BugsPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/bugs" element={<BugsPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

