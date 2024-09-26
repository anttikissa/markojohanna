type Instrument = {
	noteOn: (note: number) => void
	noteOff: (note: number) => void
}

function lookup(note: string): number {
	let notes = note.split(' ')

	if (note[1] === 'b') {
		return lookup(note[0]) - 1
	}
	if (note[1] === '#') {
		return lookup(note[0]) + 1
	}
	return 'c d ef g a b'.indexOf(note)
}

function lookups(notes: string): number[] {
	return notes.split(' ').map(lookup)
}

let measureLength = 2000

export function playSong(instrument: Instrument) {
	let prevEnd: number = 0

	// First measure is this much shorter
	let offset = -0.75

	function note(notes: string | number[], length: number, start?: number) {
		if (typeof notes === 'string') {
			notes = lookups(notes)
		}
		if (start === undefined) {
			start = prevEnd
		}
		let end = start + length
		prevEnd = end
		for (let note of notes) {
			setTimeout(
				() => {
					instrument.noteOn(note)
				},
				(start + offset) * measureLength
			)
			setTimeout(
				() => {
					instrument.noteOff(note)
				},
				(end + offset) * measureLength - 25
			)

		}
	}

	let quarter = 1 / 4
	let tiny = quarter / 3
	let halfPlusSome = 0.75

	// let sixth = 1 / 6
	// let half = 1 / 2
	// 0
	note('c', tiny, 0.75)
	note('c', tiny)
	note('c', tiny)

	// 1
	note('c', halfPlusSome, 1)
	note('c', tiny)
	note('c', tiny)
	note('c', tiny)

	// 2
	note('c', halfPlusSome,2)
	note('c', tiny)
	note('c', tiny)
	note('c', tiny)

	// 3
	note('c e', quarter, 3)
	note('c e', tiny)
	note('c e', tiny)
	note('c e', tiny)

	note('c e', quarter)
	note('c e', tiny)
	note('c e', tiny)
	note('c e', tiny)

	// 4
	note('c e g', quarter)
	note('c e g', tiny)
	note('c e g', tiny)
	note('c e g', tiny)
	note('c e g', quarter)
	note('c e g', quarter)

}
