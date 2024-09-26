import { isServer } from 'solid-js/web'
import organ from '~/organ'

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

	organ.init(master)

	organ.noteOn(0)
	setTimeout(() => {
		organ.noteOn(4)
	}, 200)
	setTimeout(() => {
		organ.noteOn(7)
	}, 400)
	setTimeout(() => {
		organ.noteOn(12)
	}, 600)

	setTimeout(() => {
		organ.noteOff(0)
	}, 2000)
	setTimeout(() => {
		organ.noteOff(4)
	}, 2000)
	setTimeout(() => {
		organ.noteOff(7)
	}, 2000)
	setTimeout(() => {
		organ.noteOff(12)
	}, 2000)

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
