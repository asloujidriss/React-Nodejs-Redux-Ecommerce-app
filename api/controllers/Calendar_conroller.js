const CalendarModel = require("../models/Calendar_Model")


module.exports = {

    create: function(req, res, next) {

        const appointement = new CalendarModel(req.body)

        appointement.save(req.body, function(err, item) {
            if (err) {
                res.status(406).json({ status: 406, message: "create appointement failed", data: null })
            } else {
            res.status(201).json({ status: 201, message: "appointement created successfly", data: item })
                
            }
        })
    },
    getall: function(req, res, next) {

        CalendarModel.find({},function(err, items) {
            if (err) {
                res.status(404).json({ status: 404, message: "cannot founded appointements", data: null })
            } else {
                res.status(201).json({ status: 200, message: "list of appointement", data: items })
            }
        })

    },
    update: function(req, res, next) {
       

        CalendarModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, item) {

            if (err) {
                res.status(404).json({ status: 404, message: "failed to updated appointement", data: null })
            } else {
                res.status(200).json({ status: 201, message: "appointement updated successufly", data: item })
            }
        })
    },
    
    getbyId: function(req, res, next) {

        CalendarModel.findById(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ status: 404, message: "cannot find category", data: null })
            } else {
                res.status(200).json({ status: 201, message: "appointement founded", data: item })
            }
        })
    },
    delete: function(req, res, next) {
        CalendarModel.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ status: 404, message: "failed to deleted Appointement", data: null })

            } else {
                res.status(201).json({ status: 200, message: "appointement deleted successufly", data: item })
            }
        })
    }


}