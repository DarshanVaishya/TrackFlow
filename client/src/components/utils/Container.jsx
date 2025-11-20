export default function Container({ children }) {
	return (
		<div className="container mx-auto px-4 min-h-screen">
			{children}
		</div>
	)
}
