export default function Spinner({ size = 'h-10 w-10' }) {
	return (
		<div className="flex justify-center items-center my-10">
			<div className={"border-4 border-blue-500 border-t-transparent rounded-full animate-spin " + size}></div>
		</div >

	)
}
