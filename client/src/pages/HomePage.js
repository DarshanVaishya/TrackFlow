import React from 'react';
import {
	Container,
	Typography,
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	Link,
	Divider,
} from '@mui/material';
import {
	BugReport,
	Description,
	Group,
	ViewKanban,
	Api,
	Settings,
	Lock,
	Code,
	Rocket,
	GitHub,
	Stars,
} from '@mui/icons-material';

const colors = {
	primary: "#2563eb",
	secondary: "#3b82f6",
	dark: "#0f172a",
	cardBg: "#eaf0fb",
	sectionBg: "#f3f5fc",
	lightGray: "#f9fafb",
};

function FeatureCard({ icon, title, description }) {
	return (
		<Paper
			elevation={6}
			sx={{
				bgcolor: colors.cardBg,
				p: { xs: 3, md: 4 },
				borderRadius: '20px',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
				boxShadow: "0 6px 24px 0 rgba(37,99,235,0.07)",
				gap: 3,
				height: '100%',
			}}
		>
			<Box sx={{ color: colors.primary, fontSize: 44 }}>{icon}</Box>
			<Box>
				<Typography variant="h6" sx={{ fontWeight: 700, color: colors.dark, mb: 1 }}>
					{title}
				</Typography>
				<Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.6 }}>
					{description}
				</Typography>
			</Box>
		</Paper>
	);
}

function TrustCard({ icon, title, description }) {
	return (
		<Paper
			elevation={5}
			sx={{
				bgcolor: colors.cardBg,
				p: { xs: 3, md: 4 },
				mb: 4,
				borderRadius: '20px',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'flex-start',
				boxShadow: "0 4px 18px 0 rgba(37,99,235,0.10)",
				gap: 3,
				maxWidth: { xs: '100%', md: '600px' },
				width: '100%',
			}}
		>
			<Box sx={{ color: colors.primary, fontSize: 44 }}>{icon}</Box>
			<Box>
				<Typography variant="h6" sx={{ fontWeight: 700, color: colors.dark, mb: 1 }}>
					{title}
				</Typography>
				<Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.6 }}>
					{description}
				</Typography>
			</Box>
		</Paper>
	);
}

export default function HomePage() {
	return (
		<Box sx={{ bgcolor: colors.lightGray }}>
			{/* Hero */}
			<Box
				sx={{
					background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
					color: 'white',
					py: { xs: 10, md: 16 },
					textAlign: 'center',
					px: 3,
				}}
			>
				<Container maxWidth="md" sx={{ mb: 4 }}>
					<Typography
						variant="h2"
						component="h1"
						gutterBottom
						sx={{ fontWeight: 800, lineHeight: 1.1 }}
					>
						Track Bugs That Actually Get Fixed
					</Typography>
					<Typography
						variant="h6"
						sx={{ my: 3, fontWeight: 400, opacity: 0.95, maxWidth: 600, mx: 'auto' }}
					>
						A lightweight, open-source issue tracker built for developers who want simplicity without sacrificing power. Self-hosted, fully customizable, and designed to keep your team focused on shipping.
					</Typography>
					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={2}
						justifyContent="center"
						maxWidth={420}
						mx="auto"
					>
						<Button
							variant="contained"
							size="large"
							sx={{ px: 5, py: 1.5, fontWeight: 600, borderRadius: 3, bgcolor: 'white', color: colors.primary, '&:hover': { bgcolor: colors.cardBg } }}
						>
							Get Started Free
						</Button>
						<Button
							variant="outlined"
							size="large"
							startIcon={<GitHub />}
							sx={{
								px: 5,
								py: 1.5,
								borderColor: 'rgba(255, 255, 255, 0.7)',
								color: 'rgba(255, 255, 255, 0.97)',
								fontWeight: 600,
								borderRadius: 3,
								'&:hover': {
									borderColor: 'white',
									bgcolor: 'rgba(255,255,255,0.08)',
								},
							}}
						>
							View on GitHub
						</Button>
					</Stack>
				</Container>
			</Box>

			{/* Value Proposition */}
			<Container maxWidth="lg" sx={{ py: 8 }}>
				<Typography
					variant="h5"
					align="center"
					sx={{ fontWeight: 600, color: colors.primary, mb: 4 }}
				>
					Stop losing bugs in Slack threads, scattered emails, or endless spreadsheets.
				</Typography>
				<Typography
					variant="body1"
					align="center"
					maxWidth={720}
					sx={{ mx: 'auto', color: "#334155", fontSize: '1.125rem', lineHeight: 1.7 }}
				>
					This bug tracker gives you a centralized system where every issue has a home, a history, and a clear path to resolution. Built with FastAPI and React, it's fast to deploy, easy to extend, and completely yours to control. Whether you're a solo developer or a small team, you get enterprise-level tracking without the enterprise complexity.
				</Typography>
			</Container>

			{/* Trust/Tech Section */}
			<Box sx={{ bgcolor: colors.sectionBg, py: 8 }}>
				<Container maxWidth="lg">
					<Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" justifyContent="center">
						<TrustCard
							icon={<Lock />}
							title="100% Open Source & Self-Hosted"
							description="Your data stays on your infrastructure. No vendor lock-in, no monthly fees, no privacy compromises. Fork it, modify it, and make it work exactly how you need it to."
						/>
						<TrustCard
							icon={<Code />}
							title="Built by a Developer, for Developers"
							description="Created as a solo project to solve real workflow pain points. Every feature exists because it makes development faster, not to pad a feature list."
						/>
						<TrustCard
							icon={<Rocket />}
							title="Modern Tech Stack"
							description="FastAPI backend for speed and Python's ecosystem. React with Chakra UI frontend for a responsive, accessible interface. Deploy anywhere in minutes."
						/>
					</Stack>
				</Container>
			</Box>

			<Divider sx={{ maxWidth: 800, my: 8, mx: 'auto', bgcolor: colors.cardBg }} />

			{/* Features Overview - 3 cols x 2 rows */}
			<Box sx={{ bgcolor: colors.sectionBg, py: 8 }}>
				<Container maxWidth="xl">
					<Typography
						variant="h4"
						align="center"
						sx={{ fontWeight: 800, color: colors.primary, mb: 6 }}
					>
						Features Overview
					</Typography>

					{/* Use display: grid instead of Grid container for precise control */}
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",     // 1 column on mobile
								sm: "repeat(2, 1fr)", // 2 columns on tablets
								md: "repeat(3, 1fr)", // 3 columns on desktop
							},
							gap: 4,
						}}
					>
						{[
							{
								icon: <BugReport />,
								title: 'Smart Issue Organization',
								description:
									'Create, categorize, and prioritize bugs with customizable fields, labels, and status workflows. Filter and search to find exactly what you need when you need it.',
							},
							{
								icon: <Description />,
								title: 'Detailed Issue Tracking',
								description:
									'Capture comprehensive bug details including reproduction steps, environment info, attachments, and links to commits or pull requests. Keep all context in one place so developers spend time fixing, not investigating.',
							},
							{
								icon: <Group />,
								title: 'Team Collaboration',
								description:
									"Comment threads, assignees, and activity logs keep everyone on the same page. Track who's working on what and maintain a complete history of decisions and changes.",
							},
							{
								icon: <ViewKanban />,
								title: 'Kanban & List Views',
								description:
									'Visualize your workflow with drag-and-drop boards or dive into detailed list views with sorting and filtering. Switch perspectives based on your current task.',
							},
							{
								icon: <Api />,
								title: 'API-First Design',
								description:
									'Full REST API access means you can integrate with CI/CD pipelines, automate issue creation, or build custom tooling around your workflow.',
							},
							{
								icon: <Settings />,
								title: 'Customizable & Extensible',
								description:
									'Add custom fields, modify issue types, and adjust workflows to match your team’s process. It’s your tracker—make it work your way.',
							},
						].map((f, i) => (
							<FeatureCard key={i} {...f} />
						))}
					</Box>
				</Container>
			</Box>


			{/* How It Works */}
			<Box sx={{ bgcolor: "#fff", py: 10 }}>
				<Container maxWidth="md">
					<Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 8, color: colors.primary }}>
						How It Works
					</Typography>
					<Grid container spacing={6}>
						{[{
							step: '1',
							title: 'Set Up in Minutes',
							desc: 'Clone the repository, configure your environment, and run with Docker or deploy to your preferred hosting. Full setup documentation included.',
						}, {
							step: '2',
							title: 'Create & Organize Issues',
							desc: 'Report bugs with all necessary details in one form. Automatically links related issues and tracks dependencies as your project grows.',
						}, {
							step: '3',
							title: 'Track Progress to Resolution',
							desc: 'Move issues through your custom workflow stages. Assign team members, set priorities, and watch your bug count drop in real-time dashboards.',
						}, {
							step: '4',
							title: 'Learn & Improve',
							desc: 'Built-in analytics show patterns in your bugs—which components are fragile, which types of issues recur, and where to focus quality efforts.',
						}].map(({ step, title, desc }, i) => (
							<Grid key={i} item xs={12} md={6}>
								<Box sx={{ display: 'flex', gap: 3 }}>
									<Box
										sx={{
											alignSelf: 'start',
											bgcolor: colors.primary,
											color: 'white',
											borderRadius: '50%',
											width: 44,
											height: 44,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											fontWeight: 700,
											fontSize: '1.2rem',
										}}
									>
										{step}
									</Box>
									<Box>
										<Typography variant="h6" sx={{ fontWeight: 700, color: colors.dark }}>
											{title}
										</Typography>
										<Typography variant="body2" sx={{ color: "#334155" }}>
											{desc}
										</Typography>
									</Box>
								</Box>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>

			{/* Secondary CTA */}
			<Box sx={{ bgcolor: colors.sectionBg, py: 8 }}>
				<Container maxWidth="md">
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: colors.primary }}>
							Ready to Take Control of Your Bug Tracking?
						</Typography>
						<Typography variant="body1" sx={{ mb: 5, color: "#334155" }}>
							Deploy your own instance and start tracking issues in under 10 minutes. Join other developers who've ditched overcomplicated tools for something that just works.
						</Typography>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
							<Button variant="contained" size="large" sx={{ bgcolor: colors.primary, px: 5, py: 1.5, fontWeight: 700, borderRadius: 3 }}>
								View Documentation
							</Button>
							<Button
								variant="outlined"
								startIcon={<Stars />}
								size="large"
								sx={{
									px: 5,
									py: 1.5,
									fontWeight: 700,
									borderRadius: 3,
									borderColor: colors.primary,
									color: colors.primary,
									'&:hover': {
										bgcolor: colors.primary,
										color: 'white',
									},
								}}
							>
								Star on GitHub
							</Button>
						</Stack>
					</Box>
				</Container>
			</Box>

			{/* About Section */}
			<Box sx={{ bgcolor: colors.lightGray, py: 8 }}>
				<Container maxWidth="md">
					<Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 4, color: colors.primary }}>
						Built in the Open
					</Typography>
					<Typography variant="body1" sx={{ mb: 3, color: "#334155", lineHeight: 1.8 }}>
						This project started as a solo effort to create the bug tracker I wished existed—powerful enough for real projects, simple enough to understand in an afternoon. Built with modern tools (FastAPI, React, Chakra UI) and designed to be maintainable, extensible, and genuinely useful.
					</Typography>
					<Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.8 }}>
						Contributions, feedback, and feature requests are always welcome. Check out the roadmap on GitHub to see what's coming next.
					</Typography>
				</Container>
			</Box>

			{/* Final CTA */}
			<Box sx={{ bgcolor: colors.sectionBg, py: 8 }}>
				<Container maxWidth="md">
					<Box sx={{ textAlign: 'center' }}>
						<Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: colors.primary }}>
							Start Tracking Better, Today
						</Typography>
						<Typography variant="body1" sx={{ mb: 4, color: "#334155" }}>
							No credit card. No trial period. No strings attached. Just clone, deploy, and start fixing bugs more efficiently.
						</Typography>
						<Stack justifyContent="center" direction={{ xs: 'column', sm: 'row' }} spacing={3}>
							<Button variant="contained" size="large" sx={{ bgcolor: colors.primary, px: 5, py: 1.5, fontWeight: 700, borderRadius: 3 }}>Get Started</Button>
							<Button variant="outlined" size="large" sx={{ px: 5, py: 1.5, fontWeight: 700, borderRadius: 3, borderColor: colors.primary, color: colors.primary, '&:hover': { bgcolor: colors.primary, color: 'white' } }}>Documentation</Button>
							<Button variant="outlined" startIcon={<GitHub />} size="large" sx={{ px: 5, py: 1.5, fontWeight: 700, borderRadius: 3, borderColor: colors.primary, color: colors.primary, '&:hover': { bgcolor: colors.primary, color: 'white' } }}>GitHub Repository</Button>
						</Stack>
					</Box>
				</Container>
			</Box>

			{/* Footer */}
			<Box sx={{ bgcolor: colors.dark, color: 'white', py: 6 }}>
				<Container maxWidth="lg">
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6} md={3}>
							<Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
								TrackFlow
							</Typography>
							<Typography variant="body2" sx={{ color: "#cbd5e1" }}>
								Open-source bug tracking for developers
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
								Product
							</Typography>
							<Stack spacing={1}>
								<Link href="#" color="inherit" underline="hover">Features</Link>
								<Link href="#" color="inherit" underline="hover">Documentation</Link>
								<Link href="#" color="inherit" underline="hover">Roadmap</Link>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
								Community
							</Typography>
							<Stack spacing={1}>
								<Link href="#" color="inherit" underline="hover">GitHub</Link>
								<Link href="#" color="inherit" underline="hover">Contributing</Link>
								<Link href="#" color="inherit" underline="hover">GitHub Issues</Link>
							</Stack>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
								Legal
							</Typography>
							<Stack spacing={1}>
								<Link href="#" color="inherit" underline="hover">MIT License</Link>
								<Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
							</Stack>
						</Grid>
					</Grid>
					<Divider sx={{ bgcolor: "#334155", my: 4 }} />
					<Typography variant="body2" align="center" sx={{ opacity: 0.75 }}>
						© 2025 TrackFlow. Open source under MIT License.
					</Typography>
				</Container>
			</Box>
		</Box>
	);
}

