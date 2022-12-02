const ProviderModel = require("../models/Provider_Model")



module.exports = {

    create: function(req, res) {


        req.body["image"] = req.file.filename

        const user = new ProviderModel(req.body)

        user.save(req.bady, function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Failed to register client", data: null })
            } else {
                res.status(201).json({ success: true, message: "success register", data: item })
            }
        })
    },

    getAll: function(req, res) {

        ProviderModel.find({}, function(err, items) {
            if (err) {
                res.status(404).json({ success: false, message: "Failed to got all clients", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Clients", data: items })
            }
        })
    },

    getById: function(req, res) {

        ProviderModel.findByIdAndUpdate(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({ success: false, message: "Failed to got  client by Id", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Clients", data: item })
            }
        })
    },
    getByName: function(req, res) {

        ProviderModel.find({ firstName: req.query.firstName }, function(err, items) {
            if (err) {
                res.status(404).json({ success: false, message: "Failed to got  client by Name", data: null })
            } else {
                res.status(201).json({ success: true, message: "List of Clients", data: items })
            }
        })
    },

    update: function(req, res) {

        ProviderModel.findByIdAndUpdate(req.params.id, req.body, function(err, item) {

            if (err) {
                res.status(404).json({ success: false, message: "Failed to updated ", data: null })
            } else {
                res.status(201).json({ success: true, message: "success updated", data: item })
            }
        })
    },
    delete: function(req, res) {
        ProviderModel.findByIdAndDelete(req.params.id, function(err, item) {


            if (err) {
                res.status(404).json({ success: false, message: "Failed to Deleted ", data: null })
            } else {
                res.status(201).json({ success: true, message: "success deleted", data: item })
            }
        })

    }
}