import './app.css'
import { useKeyDownEvent } from '@solid-primitives/keyboard'
import { createEffect } from 'solid-js'

export default function App() {
	function play() {
		console.log('Play!')
	}

	let keyDownEvent = useKeyDownEvent()

	createEffect(() => {
		let ev = keyDownEvent()
		if (ev) {
			play()
		}
	})

	return (
		<main>
			<div class="player">
				<p>
					Press any key to
					<button onClick={play}>Play</button>
				</p>
			</div>
		</main>
	)
}
