import { isServer } from 'solid-js/web'
import organ from '~/organ'
import { playSong } from '~/song'
import reverb from '~/reverb'

export let ctx: AudioContext

let analyser: AnalyserNode
let bufferLength: number
let dataArray: Uint8Array

let canvas: HTMLCanvasElement
let canvasCtx: CanvasRenderingContext2D

// Init just the canvas, really
export async function init() {
	if (isServer) {
		return
	}

	canvas = document.querySelector('canvas')!
	function resizeCanvas() {
		canvas.width = 2000;
		let windowAspectRatio = window.innerHeight / window.innerWidth
		canvas.height = windowAspectRatio * canvas.width
	}

	window.addEventListener('resize', resizeCanvas)
	resizeCanvas()

	canvasCtx = canvas.getContext('2d')!

	// draw()
}

export async function play() {
	if (isServer || ctx) {
		return
	}

	ctx = new AudioContext({ sampleRate: 48000 })
	await ctx.resume()

	let master = new GainNode(ctx, { gain: 0.15 })
	master.connect(ctx.destination)

	let reverbNode = await reverb.init(master)
	await organ.init(reverbNode)

	// analyzer
	analyser = new AnalyserNode(ctx, { fftSize: 2048 })
	bufferLength = analyser.frequencyBinCount
	dataArray = new Uint8Array(bufferLength)
	analyser.getByteTimeDomainData(dataArray)
	draw()

	//

	master.connect(analyser)

	playSong(organ)
}

function draw() {
	requestAnimationFrame(draw)

	analyser.getByteTimeDomainData(dataArray)

	// canvasCtx.fillStyle = 'rgb(200 200 200)'
	canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
	// canvasCtx.fillRect(0, 0, canvas.width, canvas.height)

	canvasCtx.lineWidth = 2
	canvasCtx.strokeStyle = 'rgb(255 0 0)'

	canvasCtx.beginPath()

	const sliceWidth = (canvas.width * 1.0) / bufferLength
	let x = 0

	for (let i = 0; i < bufferLength; i++) {
		const v = dataArray[i] / 128.0
		const y = (v * canvas.height) / 2

		if (i === 0) {
			canvasCtx.moveTo(x, y)
		} else {
			canvasCtx.lineTo(x, y)
		}

		x += sliceWidth
	}

	canvasCtx.lineTo(canvas.width, canvas.height / 2)
	canvasCtx.stroke()
}

export async function stop() {
	if (isServer || !ctx) {
		return
	}

	await ctx.suspend()
	await ctx.close()
	// @ts-ignore lol
	ctx = undefined
}
