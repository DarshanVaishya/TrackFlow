// pages/HomePage.jsx
import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustBadges from '../components/TrustBadges';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

export default function HomePage() {
	return (
		<Box>
			<Navbar />
			<Hero />
			<TrustBadges />
			<Features />
			<HowItWorks />
			<Testimonials />
			<CTASection />
			<Footer />
		</Box>
	);
}

