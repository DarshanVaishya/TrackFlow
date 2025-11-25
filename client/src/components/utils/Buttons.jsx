export function BlueButton({ children, onClick = null, className = null, type = "", size = "py-2 px-4" }) {
	return (
		<button type={type} className={"bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none hover:cursor-pointer " + className + " " + size} onClick={onClick}>{children}</button>
	)
}

export function BlackButton({ children, onClick = null, className = null }) {
	return (
		<button onClick={onClick} className={"bg-black text-white border-neutral-400/50 border-2 font-semibold py-2 px-4 rounded-lg focus:outline-none  hover:bg-blue-500 hover:cursor-pointer " + className}>{children}</button>
	)
}

export function RedButton({ children, onClick = null, className = null }) {
	return (
		<button onClick={onClick} className={"bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none  hover:bg-red-700 hover:cursor-pointer " + className}>{children}</button>
	)
}
