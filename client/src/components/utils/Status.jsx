export default function Status({ status }) {
	const text = {
		"todo": "Todo",
		"in_progress": "In Progress",
		"in_review": "In Review",
		"done": "Done"
	}

	const color = {
		"todo": "bg-neutral-700/50 text-white",
		"in_progress": "bg-blue-500 text-white",
		"in_review": "bg-purple-500 text-white",
		"done": "bg-green-500 text-white"
	}

	return (
		<span className={"px-2 py-1 text-sm self-baseline rounded " + color[status]}>{text[status]}</span>
	)
}
