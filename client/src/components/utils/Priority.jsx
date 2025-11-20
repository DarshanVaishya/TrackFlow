export default function Priority({ priority }) {
	const color = {
		"low": "text-gray-300",
		"medium": "text-blue-500",
		"high": "text-yellow-500",
		"top": "text-red-500"
	}

	return (
		<span className={"py-1 text-sm rounded capitalize " + color[priority]}>{priority}</span>
	)
}
