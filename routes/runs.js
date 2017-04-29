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
		Runs.findOne({
			where: {
				userId: req.user.id,
				id: req.params.runId,
				showId: req.params.showId
			}
		}).then(run => res.json(run))
			.catch(err => ({success: false, err}));
	},
	create: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		const dates = ['date'];

		dates.forEach(dateField => {
			data[dateField] = moment(data[dateField]).format('YYYY-MM-DD');
		});

		Runs.create(data)
			.then(instance => res.json({success: true, data: instance}))
			.catch(err => res.json({success:false, err}));
	},
	update: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		const {runId, showId} = req.params;

		const dates = ['date'];

		dates.forEach(dateField => {
			data[dateField] = moment(data[dateField]).format('YYYY-MM-DD');
		});

		if(data.faults === '') data.faults = null;

		Runs.update(data, {
			where: {
				id: runId,
				showId: showId,
				userId: data.userId
			}
		})
			.then((affectedCount, affectedRows) => res.json({success: true}))
			.catch(err => res.status(500).json({success:false, err}));
	},
	destroy: (req, res) => {
		Runs.destroy({
			where: {
				userId: req.user.id,
				id: req.params.runId
			}
		}).then(() => res.json({success: true}))
			.catch(err => res.json({success: false, err}));
	}
};
