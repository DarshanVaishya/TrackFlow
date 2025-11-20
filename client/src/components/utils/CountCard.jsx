export default function CountCard({ count, label }) {
	return (
		<div className="p-3 border-1 border-neutral-500/50 bg-neutral-900/40 rounded-lg flex flex-col gap-3">
			<span className="text-neutral-400">{label}</span>
			<span className="text-xl font-bold">{count}</span>
		</div>
	)
}
