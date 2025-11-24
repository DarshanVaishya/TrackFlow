export default function TextInput({ label, type = "text", placeholder = "", value, onChange }) {
	return (
		<>
			<label className="text-white self-baseline font-bold mb-2" >{label}</label>
			<input className="text-white px-2 py-1 mb-4 border border-neutral-500/50 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" type={type} placeholder={placeholder || label} value={value} onChange={onChange} required />
		</>
	)
}
