import { isServer } from 'solid-js/web'

let ctx: AudioContext

export async function play() {
	if (isServer) {
		return
	}

	console.log('play!')

	if (ctx) {
		console.log('ctx on jo!')
		return
	}
	ctx = new AudioContext({ sampleRate: 48000 })

	let osc = new OscillatorNode(ctx, {
		type: 'sine',
		frequency: 440,
	})

	osc.connect(ctx.destination)
	osc.start(0)

	await ctx.resume()

}

