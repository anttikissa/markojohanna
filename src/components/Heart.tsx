import { createSignal, Show } from 'solid-js'
import './Heart.css'

type Props = {
	x: number
	y: number,
	size: number
}

export default function Heart(props: Props) {
	let [x, setX] = createSignal(props.x)
	let [y, setY] = createSignal(props.y)

	let velX = (Math.random() * 2 - 1) * 0.015
	let velY = -0.25
	let gravity = 0.25

	let step = 1/60

	setInterval(() => {
		setX(x => x + velX * step)
		setY(y => y + velY * step)
		velY += gravity * step
	}, step)

	return (
		<Show when={y() < 1.1}>
			<div
				class="Heart"
				style={{
					left: `${x() * 100}%`,
					top: `${y() * 100}%`,
					transform: `scale(${props.size})`,
				}}
			>
				<p>❤️</p>
			</div>
		</Show>

	)
}
