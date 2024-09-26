
// Note 0: 440 Hz
// Note 12: 880 Hz
// etc.

import { ctx } from '~/audio'

type Note = number

let oscs = [] as OscillatorNode[]
let gains = [] as GainNode[]

async function init(master: GainNode) {
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

function setVol(note: number, vol: number) {
	gains[note].gain.setTargetAtTime(vol, ctx.currentTime, 0.01)
}

function noteOn(note: number) {
	setVol(note, maxGain)
}

function noteOff(note: number) {
	setVol(note, 0)
}

export default { init, noteOn, noteOff }
