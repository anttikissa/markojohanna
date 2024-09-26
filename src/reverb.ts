import { ctx } from '~/audio'

async function init(output: AudioNode) {
	let inpulseResponse = await (await fetch('/stalbans_a_ortf.wav')).arrayBuffer()
	let impulseResponseDecoded = await new Promise((resolve, reject) => {
		ctx.decodeAudioData(inpulseResponse, resolve, reject)
	}) as AudioBuffer

	let reverb = new ConvolverNode(ctx, { buffer: impulseResponseDecoded })

	reverb.connect(output)

	return reverb
}

export default {
	init,
}
