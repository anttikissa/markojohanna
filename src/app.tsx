import './app.css'
import { useKeyDownEvent } from '@solid-primitives/keyboard'
import { createEffect, onCleanup } from 'solid-js'
import { play, stop } from '~/audio'

export default function App() {
	let keyDownEvent = useKeyDownEvent()

	createEffect(async () => {
		let ev = keyDownEvent()
		if (ev) {
			// console.log('ev.key', ev.key)

			if (ev.key === 'Meta' || ev.key === 'Control') {
				// Prevent cmd-tab and tab switch from playing :)
				return
			}

			if (ev.key === 's') {
				await stop()
			} else if (ev.key === 'r') {
				reload()
			} else {
				await play()
			}
		}
	})

	function reload() {
		window.location.reload()
	}
	onCleanup(async () => {
		await stop()
	})

	return (
		<main>
			<div class="player">
				<p>
					Press any key to
					<button onClick={play}>Play</button>
				</p>
				<p>
					Press s to <button onClick={stop}>Stop</button>
				</p>
				<p>
					Press r to <button onClick={reload}>Reload page</button>
				</p>
			</div>
		</main>
	)
}
