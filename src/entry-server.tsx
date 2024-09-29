// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

export default createHandler((event) => {

	let req = event.request
	let path = new URL(req.url).pathname
	let method = req.method

	let headers = Object.fromEntries(req.headers)

	let ip = headers['x-forwarded-for'] || event.clientAddress

	let ts = new Date().toISOString().replace('T', ' ').replace('Z', '')
	console.log(`${ts} ${ip}: ${method} ${path}`)

	return (
		<StartServer
			document={({ assets, children, scripts }) => (
				<html lang="en">
				<head>
					<meta charset="utf-8"/>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<link rel="icon" href="/favicon.ico"/>
					<title>Paljon onnea Marko & Johanna</title>
					{assets}
				</head>
				<body>
				<div id="app">{children}</div>
				{scripts}
				</body>
				</html>
			)}
		/>
	)
})
