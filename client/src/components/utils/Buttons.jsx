export function BlueButton({ children, onClick = null }) {
	return (
		<button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none hover:cursor-pointer" onClick={onClick}>{children}</button>
	)
}

export function BlackButton({ children, onClick = null }) {
	return (
		<button onClick={onClick} className="bg-black text-white border-neutral-400/50 border-2 font-semibold py-2 px-4 rounded-lg focus:outline-none  hover:bg-blue-500 hover:cursor-pointer">{children}</button>
	)
}
