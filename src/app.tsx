import './app.css'

export default function App() {
	function play() {
		console.log('Play!')
	}
	
	return (
		<main>
			<div class="player">
				<button onClick={play}>Play</button>
			</div>
		</main>
	)
}
