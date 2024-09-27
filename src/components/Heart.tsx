import { createSignal } from 'solid-js'
import './Heart.css'

type Props = {
	x: number
	y: number
}

export default function Heart(props: Props) {
	let [x, setX] = createSignal(props.x)
	let [y, setY] = createSignal(props.y)

	let velX = (Math.random() * 2 - 1) * 0.1
	let velY = -0.25
	let gravity = 0.25

	let step = 1/60

	setInterval(() => {
		setX(x => x + velX * 1/60)
		setY(y => y + velY * 1/60)
		velY += gravity * step
	}, 1/60)
	return (
		<div
			class="Heart"
			style={{
				left: `${x() * 100}%`,
				top: `${y() * 100}%`,
			}}
		>
			<p>❤️</p>
		</div>
	)
}
