import './app.css'
import { useKeyDownEvent } from '@solid-primitives/keyboard'
import { createEffect, createSignal, For, onCleanup } from 'solid-js'
import { play, stop } from '~/audio'
import Heart from '~/components/Heart'
import { isServer } from 'solid-js/web'

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

	type HeartData = {
		x: number
		y: number
		size: number
	}
	let [hearts, setHearts] = createSignal<HeartData[]>([])

	function addHeart(x: number, y: number, size: number) {
		// @ts-ignore
		setHearts((hearts) => [...hearts, { x, y, size }])
	}

	if (!isServer) {
		function newHeart(e: CustomEvent<{ note: number; length: number }>) {
			// if (!e.detail) {
			// 	debugger
			// }
			let { note, length } = e.detail
			// console.log('event', note, length)

			let size = length + 0.75
			addHeart(
				(note / 48 + 0.5) * 0.8 + Math.random() * 0.01,
				0.167 + Math.random() * 0.01,
				size
			)
		}

		// @ts-ignore
		window.addEventListener('newHeart', newHeart)

		onCleanup(() => {
			// @ts-ignore
			window.removeEventListener('newHeart', newHeart)
		})
	}

	let fancyRef: HTMLParagraphElement

	function reveal() {
		if (!fancyRef) {
			return
		}
		console.log('REVEAL')

		console.log('ref', fancyRef)

		let first = fancyRef.querySelector('span:not(.visible)')
		if (first) {
			first.classList.add('visible')
		}
	}

	if (!isServer) {
		window.addEventListener('reveal', reveal)
	}

	let names = 'Marko & Johanna'
	// Tasa-arvoinen nimijärjestys
	if (Math.random() > 0.5) {
		names = names.split(' & ').reverse().join(' & ')
	}

	let [playHidden, setPlayHidden] = createSignal(false)

	function playAndHide() {
		play()
		setPlayHidden(true)
	}

	return (
		<main>
			<div class="player">
				<p>
					<button
						onClick={playAndHide}
						classList={{ hidden: playHidden() }}
					>
						Play
					</button>
				</p>

				<p class="fancy-text" ref={fancyRef}>
					<span>Paljon</span> <span>onnea</span>{' '}
					<span>hääpäivänänne,</span> <span>rakkaat</span>{' '}
					<span>{names}</span>
					<span>
						, <br />
						ja sitäkin{' '}
					</span>
					<span>enemmän</span> <span>kaikkina</span>{' '}
					<span>tulevina</span> <span>päivinä.</span>
					<br />
					<br />
					<span>Antti</span>
					<br />
					<span>28.9.2024</span>
					<br />
					<span>❤️</span>
					<br />
					<br />
					<span>
						<button onClick={reload} class="small">
							Uudestaan!
						</button>
					</span>
					<br />
					<br />
					<span>
						<a href="https://github.com/anttikissa/markojohanna">
							View Source
						</a>
					</span>
				</p>
			</div>
			<For each={hearts()}>
				{({ x, y, size }) => <Heart x={x} y={y} size={size}></Heart>}
			</For>
		</main>
	)
}
