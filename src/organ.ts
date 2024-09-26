
// Note 0: 440 Hz
// Note 12: 880 Hz
// etc.

import { ctx } from '~/audio'

type Note = number

let oscs = [] as OscillatorNode[]
let gains = [] as GainNode[]

export async function organInit(master: GainNode) {
	for (let i = 0; i < 24; i++) {
		oscs[i] = new OscillatorNode(ctx, {
			type: 'sine',
			frequency: 440 * Math.pow(2, i / 12),
		})
		oscs[i].start()
		gains[i] = new GainNode(ctx, { gain: 0 })
		oscs[i].connect(gains[i]).connect(master)
	}
}

let maxGain = 0.4

export async function organNoteOn(note: number) {
	gains[note].gain.setTargetAtTime(maxGain, ctx.currentTime, 0.01)
}

export async function organNoteOff(note: number) {
	gains[note].gain.setTargetAtTime(0, ctx.currentTime, 0.01)
}
