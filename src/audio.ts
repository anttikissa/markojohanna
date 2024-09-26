import { isServer } from 'solid-js/web'
import organ from '~/organ'
import { playSong } from '~/song'

export let ctx: AudioContext

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

	osc.start()

	let master = new GainNode(ctx, { gain: 0.15 })
	master.connect(ctx.destination)

	await organ.init(master)

	playSong(organ)

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
	// @ts-ignore lol
	ctx = undefined
}
