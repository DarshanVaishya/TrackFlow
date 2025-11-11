import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BugsListPage from './pages/BugsListPage';


// Define custom theme configuration for Chakra UI v3
const customConfig = defineConfig({
	theme: {
		tokens: {
			colors: {
				slate: {
					50: { value: '#f8fafc' },
					100: { value: '#f1f5f9' },
					200: { value: '#e2e8f0' },
					300: { value: '#cbd5e1' },
					400: { value: '#94a3b8' },
					500: { value: '#64748b' },
					600: { value: '#475569' },
					700: { value: '#334155' },
					800: { value: '#1e293b' },
					900: { value: '#0f172a' },
					950: { value: '#020617' },
				},
				cyan: {
					50: { value: '#ecfeff' },
					100: { value: '#cffafe' },
					200: { value: '#a5f3fc' },
					300: { value: '#67e8f9' },
					400: { value: '#22d3ee' },
					500: { value: '#06b6d4' },
					600: { value: '#0891b2' },
					700: { value: '#0e7490' },
					800: { value: '#155e75' },
					900: { value: '#164e63' },
				},
			},
			fonts: {
				heading: { value: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` },
				body: { value: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif` },
			},
		},
	},
	globalCss: {
		body: {
			bg: 'white',
			color: 'slate.800',
		},
	},
});

// Create the system by merging with default config
const system = createSystem(defaultConfig, customConfig);

function App() {
	return (
		<ChakraProvider value={system}>
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/bugs" element={<BugsListPage />} />
				</Routes>
			</Router>
		</ChakraProvider>
	);
}

export default App;

