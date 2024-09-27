import { ctx } from '~/audio'

// gains turn sound on and off
let gains = [] as GainNode[]

async function init(master: AudioNode) {
	// YOLO array indexing with negative numbers lol
	// Notes range for C0 to C4, just enough for Mendelssohn (E0 is lowest)
	for (let i = -24; i < 25; i++) {
		gains[i] = new GainNode(ctx, { gain: 0 })

		function rank(offset: number, gain: number) {
			let node = new GainNode(ctx, { gain })
			let osc = new OscillatorNode(ctx, {
				frequency: 440 * Math.pow(2, (i + 3 + offset) / 12),
			})
			osc.connect(node).connect(gains[i])
			osc.start()
		}

		rank(-36, 2.0)
		rank(-24, 1.0)
		rank(-12, 1.5)
		rank(0, 1.0)
		rank(-12, 0.7)
		rank(-24, 0.5)

		gains[i].connect(master)
	}
}

let maxGain = 0.2

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
