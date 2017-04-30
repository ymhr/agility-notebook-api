const Shows = require('../db/models/shows');
const Run = require('../db/models/runs');
const moment = require('moment');

module.exports = {
	getAll: (req, res) => {
		Shows.findAll({
			where: {
				userId: req.user.id
			},
			include: [Run]
		}).then(shows => {
			res.json(shows);
		});
	},
	get: (req, res) => {
		Shows.findOne({
			where: {
				userId: req.user.id,
				id: req.params.id
			},
			include: [Run]
		}).then(show => res.json(show))
			.catch(err => ({success: false, err}));
	},
	create: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		const dates = ['startDate', 'endDate', 'closingDate'];

		//Make sure the dates are in a format that we want to save
		dates.forEach(dateField => {
			data[dateField] = moment(data[dateField]).format('YYYY-MM-DD');
		});

		Shows.create(data)
			.then(instance => res.json({success: true, data: instance}))
			.catch(err => res.json({success:false, err}));
	},
	update: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		const {id} = req.params;

		const dates = ['startDate', 'endDate', 'closingDate'];

		dates.forEach(dateField => {
			data[dateField] = moment(data[dateField]).format('YYYY-MM-DD');
		});

		Shows.update(data, {
			where: {
				id,
				userId: data.userId
			}
		})
			.then((affectedCount, affectedRows) => res.json({success: true}))
			.catch(err => res.json({success:false, err}));
	},
	destroy: (req, res) => {
		const deleteShows = () => {
			return Shows.destroy({
				where: {
					userId: req.user.id,
					id: req.params.showId
				}
			})
		};

		const deleteRuns = () => {
			return Run.destroy({
				where: {
					userId: req.user.id,
					showId: req.params.showId
				}
			});
		};

		Promise.all([deleteShows(), deleteRuns()])
			.then(() => res.json({success: true}))
			.catch(err => res.json({success: false, err}));
	}
};
