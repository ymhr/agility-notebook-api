const Runs = require('../db/models/runs');
const Dog = require('../db/models/dogs');
const Show = require('../db/models/shows');
const moment = require('moment');

module.exports = {
	getAll: (req, res) => {
		Runs.findAll({
			where: {
				userId: req.user.id
			}
		}).then(runs => res.json(runs))
			.catch(err => ({success: false, err}));
	},
	getByShow: (req, res) => {
		Runs.findAll({
			where: {
				userId: req.user.id,
				showId: req.params.showId
			}
		})
			.then(runs => res.json(runs))
			.catch(err => ({success: false, err}));
	},
	get: (req, res) => {
		Runs.find({
			where: {
				userId: req.user.id,
				id: req.params.id
			}
		}).then(run => res.json(run))
			.catch(err => ({success: false, err}));
	},
	create: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;
		//
		// Show.get(req.body.showId)
		// 	.then(show => {
		// 		const showStartDate = moment(show.starDate);
		// 		const diff = moment().diff(showStartDate);
		//
		// 		let clear = false;
		//
		// 		if(diff > 0){
		// 			if(data.faults > 0){
		// 				clear = true;
		// 			}
		// 		}
		//
		// 		data.clear = clear;
		//
		// 		Runs.create(data)
		// 			.then(instance => res.json({success: true, data: instance}))
		// 			.catch(err => res.json({success:false, err}));
		// 	})
		// 	.catch(err => res.json({success: false, err}));
		//
		Runs.create(data)
			.then(instance => res.json({success: true, data: instance}))
			.catch(err => res.json({success:false, err}));


	}
};
