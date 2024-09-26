import { isServer } from 'solid-js/web'

let ctx: AudioContext | undefined

export async function play() {
	if (isServer) {
		return
	}

	if (ctx) {
		console.log('playing already!')
		return
	}

	console.log('play!')

	ctx = new AudioContext({ sampleRate: 48000 })

	let osc = new OscillatorNode(ctx, {
		type: 'sine',
		frequency: 440,
	})

	osc.connect(ctx.destination)
	osc.start(0)

	await ctx.resume()
}

export async function stop() {
	if (isServer) {
		return
	}

	console.log('stop!')

	if (!ctx) {
		console.log('no context to stop')
		return
	}

	await ctx.suspend()
	await ctx.close()
	ctx = undefined
}
