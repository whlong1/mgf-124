import mongoose from 'mongoose'


const ticketSchema = new mongoose.Schema({
	seat: {
		type: String,
		match: /[A-F][1-9]\d?/
	},
	price: {
		type: Number,
		min: 0
	}
}, { timestamps: true })


const flightSchema = new mongoose.Schema({
	airline: {
		type: String,
		enum: ['American', 'Southwest', 'United'],
	},
	airport: {
		type: String,
		enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
		default: 'DEN'
	},
	flightNo: {
		type: Number,
		min: 10,
		max: 9999,
		required: true,
	},
	monday: [String],
	departs: {
		type: Date,
		default: function () {
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
			// A. new Date object set to time of creation || B. look at year and add 1 || C. Update OG obj year
			const today = new Date() //=> 2021-10-29T12:07:43.072Z
			const oneYearFromNow = today.getFullYear() + 1 //=> 2022
			today.setFullYear(oneYearFromNow) //=> 2022-10-29T12:13:04.759Z
			return today
		},
	},
	tickets: [ticketSchema],
	destinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }]
}, { timestamps: true })

const Flight = mongoose.model('Flight', flightSchema)

export {
	Flight
}