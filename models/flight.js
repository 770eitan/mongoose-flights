import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: { type: String, match: /[A-F][1-9]\d?/},
   price: {type:Number, min:0}
 },{
  timestamps: true
})


const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"]
  },
  airport: {
    type: String,
    airportCode: {type:String, default: "DEN"},
    enum: ["","AUS", "DFW", "DEN", "LAX" , "SAN"]
  },
  flightNo: {
    type: Number, 
    required:true,
    minlength: 10,
    maxlength:9999
  },
  departs: {
    type: Date,
    timestamps: { timestamps: () => Math.floor(Date.now() / 1000) }
    },
  tickets: [ticketSchema] 
},{
  timestamps: true
})



const Flight = mongoose.model('Flight', flightSchema)



export {
  Flight
}