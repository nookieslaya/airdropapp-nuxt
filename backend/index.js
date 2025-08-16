const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Ustaw dozwolone origin (dostosuj po wdrożeniu frontu)
const allowedOrigins = [process.env.CORS_ORIGIN || 'http://localhost:3000']
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
	})
)

app.use(express.json())

// Healthcheck (dla render.com)
app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api', require('./routes/users'))
app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/links'))
app.use('/api', require('./routes/projects'))
app.use('/api', require('./routes/airdrops'))
app.use('/api', require('./routes/db-status'))

const PORT = process.env.PORT || 4000
// Render/Vercel/Railway wymagają nasłuchu na 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
	console.log(`API działa na http://localhost:${PORT}`)
})
