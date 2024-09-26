import { isServer } from 'solid-js/web'
import { organInit, organNoteOff, organNoteOn } from '~/organ'

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

	organInit(master)

	organNoteOn(0)
	setTimeout(() => {
		organNoteOn(4)
	}, 200)
	setTimeout(() => {
		organNoteOn(7)
	}, 400)
	setTimeout(() => {
		organNoteOn(12)
	}, 600)

	setTimeout(() => {
		organNoteOff(0)
	}, 2000)
	setTimeout(() => {
		organNoteOff(4)
	}, 2000)
	setTimeout(() => {
		organNoteOff(7)
	}, 2000)
	setTimeout(() => {
		organNoteOff(12)
	}, 2000)

	// osc.connect(ctx.destination)

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
	master = undefined
}
