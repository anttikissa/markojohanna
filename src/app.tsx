import './app.css'
import { useKeyDownEvent } from '@solid-primitives/keyboard'
import { createEffect } from 'solid-js'
import { play } from '~/audio'

export default function App() {
	let keyDownEvent = useKeyDownEvent()

	createEffect(async () => {
		let ev = keyDownEvent()
		if (ev) {
			await play()
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
