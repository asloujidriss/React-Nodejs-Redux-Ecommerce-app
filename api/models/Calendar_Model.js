const mongoose = require("mongoose")


const CalendarSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
        
    },
      
        Start:{ 
        type: Date,
        required: true,
        
       
    },
       End:{
        type: Date,
        required: true,
    }

 

}, { timestamps: true })

module.exports = mongoose.model("calendars", CalendarSchema)