import { ctx } from '~/audio'

type Instrument = {
	noteOn: (note: number) => void
	noteOff: (note: number) => void
}

function lookup(note: string): number {
	let offset = 0
	if (note.match(/[0-5]$/)) {
		offset = ('012345'.indexOf(note[note.length - 1]) - 2) * 12
		note = note.slice(0, -1)

		// console.log('!!! note note, offset', note, offset)
	}

	let notes = note.split(' ')

	if (note[1] === 'b') {
		return lookup(note[0]) - 1 + offset
	}
	if (note[1] === '#') {
		return lookup(note[0]) + 1 + offset
	}
	return 'c d ef g a b'.indexOf(note) + offset
}

function lookups(notes: string): number[] {
	return notes.split(' ').map(lookup)
}

let measureLength = 2000

export function playSong(instrument: Instrument) {
	let prevEnd: number = 0

	// First measure is this much shorter
	let offset = -0.75

	function reveal(after: number = 0) {
		setTimeout(() => {
			window.dispatchEvent(new CustomEvent('reveal'))
		}, (prevEnd + offset + after) * measureLength)
	}

	function note(notes: string | number[], length: number, start?: number) {
		let updateEnd = true
		if (typeof notes === 'string' && notes.endsWith('+')) {
			updateEnd = false
			notes = notes.slice(0, -1).trim()
		}
		if (typeof notes === 'string') {
			notes = lookups(notes)
		}
		if (start === undefined) {
			start = prevEnd
		}
		let end = start + length
		if (updateEnd) {
			prevEnd = end
		}
		for (let note of notes) {
			setTimeout(
				() => {
					if (!ctx) {
						return
					}
					instrument.noteOn(note)

					window.dispatchEvent(new CustomEvent('newHeart', {
						detail: { note, length }
					}))
				},
				(start + offset) * measureLength
			)
			setTimeout(
				() => {
					if (!ctx) {
						return
					}
					instrument.noteOff(note)
				},
				(end + offset) * measureLength - 25
			)
		}
	}

	let quarter = 1 / 4
	let quarterPlusSome = quarter * 1.5
	let eighth = quarter / 2
	let tiny = quarter / 3
	let half = 0.5
	let halfPlusSome = 0.75
	let sixteenth = quarter / 4

	// let testSong = 1
	//
	// if (testSong) {
	// 	note('c0', 0.25, 0.75)
	//
	//
	// 	return
	// }

	// default octave is 2 (c == c2)
	// 1
	note('c', tiny, 0.75)
	note('c', tiny)
	note('c', tiny)

	reveal()

	// 2
	note('c', halfPlusSome, 1)
	note('c', tiny)
	note('c', tiny)
	note('c', tiny)

	reveal()

	// 3
	note('c', halfPlusSome, 2)
	note('c', tiny)
	note('c', tiny)
	note('c', tiny)

	reveal()

	// 4
	note('c e', quarter, 3)
	note('c e', tiny)
	note('c e', tiny)
	note('c e', tiny)

	note('c e', quarter)
	note('c e', tiny)
	note('c e', tiny)
	note('c e', tiny)

	reveal()

	// 5
	note('c e g', quarter)
	note('c e g', tiny)
	note('c e g', tiny)
	note('c e g', tiny)
	note('c e g', quarter)
	note('c e g', quarter)

	reveal()

	// 6
	note('a0 a1 +', half)
	note('e3 f#3 c4', half)

	note('b0 b1 +', half)
	note('d#3 f3 b3', quarterPlusSome)

	note('b2 d#3 f3', eighth)

	reveal()

	// 7
	note('e0 e1 +', quarter)
	note('b2 f#3 a3', quarter)

	note('e0 e1 +', quarter)
	note('b2 e3 g3', quarter)

	reveal()

	note('f0 f1 +', quarter)
	note('a2 d3 f3', quarter)

	note('f0 f1 +', quarter)
	note('f2 a2 d3', quarter)

	reveal()

	// 8
	note('g0 g1 +', half)
	note('c3', half - 2 * sixteenth)
	note('b2', sixteenth)
	note('c3', sixteenth)

	reveal()

	note('g0 g1 +', quarter)
	note('f2 g2 d3', quarter)

	note('g0 g1 +', quarter)
	note('g2', quarter * 0.75)
	note('d3', quarter * 0.25)

	reveal()

	// 9
	note('c1 c2 g2 c3 e3', quarter)
	note('c2', eighth)
	note('e2', eighth)
	note('g2', eighth)
	note('c3', eighth)
	note('e3', eighth)
	note('g3', eighth)

	reveal()

	// 10
	note('a0 a1 +', half)
	note('e3 f#3 c4', half)

	note('b0 b1 +', half)
	note('d#3 f3 b3', quarterPlusSome)

	note('b2 d#3 f3', eighth)

	reveal()

	// 11
	note('e0 e1 +', half)
	note('b2 f#3 a3', quarter)

	note('b2 e3 g3', quarter)

	note('f0 f1 +', half)
	note('a2 d3 f3', quarter)

	note('f2 a2 d3', quarter)

	reveal()

	// 12
	note('g0 g1 +', half)
	note('c3', half - 2 * sixteenth)
	note('b2', sixteenth)
	note('c3', sixteenth)

	note('c1 +', quarter)
	note('g2 c3 e3', quarter)

	note('g1 +', quarter)
	note('g2 b2 d3', quarter * 0.75)
	note('e3', quarter * 0.25)

	// reveal()

	// 13
	note('g0 g2 b2 d3', half)
	note('c1 e2 g2 c3', quarter)

	reveal(0.5)

	reveal(2)

}
