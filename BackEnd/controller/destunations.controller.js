const Destination = require('../models/destinations.model');

// post new destination
exports.createDestination = async(req, res) => {
    const data = req.body
    try{
        const destination = new Destination(data)
        await destination.save() 
        res.status(200).json(destination)
    }catch(error){
        res.status(500).json(error.message)
    }
}