const Runs = require('../db/models/runs');
const Dog = require('../db/models/dogs');

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
	}
	// getAll: (req, res) => {
	// 	Shows.findAll({
	// 		where: {
	// 			userId: req.user.id
	// 		}
	// 	}).then(shows => {
	// 		res.json(shows);
	// 	});
	// },
	// get: (req, res) => {
	// 	Shows.findOne({
	// 		where: {
	// 			userId: req.user.id,
	// 			id: req.params.id
	// 		}
	// 	}).then(show => res.json(show))
	// 		.catch(err => ({success: false, err}));
	// },
	// create: (req, res) => {
	// 	const data = req.body;
	// 	data.userId = req.user.id;
	//
	// 	const dates = ['startDate', 'endDate'];
	//
	// 	//Make sure the dates are in a format that we want to save
	// 	dates.forEach(dateField => {
	// 		data[dateField] = moment(data[dateField], 'dddd Do MMMM, YYYY').format('YYYY-MM-DD');
	// 	});
	//
	// 	Shows.create(data)
	// 		.then(instance => res.json({success: true, data: instance}))
	// 		.catch(err => res.json({success:false, err}));
	// },
	// update: (req, res) => {
	// 	const data = req.body;
	// 	data.userId = req.user.id;
	//
	// 	const {id} = req.params;
	//
	// 	const dates = ['startDate', 'endDate'];
	//
	// 	dates.forEach(dateField => {
	// 		data[dateField] = moment(data[dateField], 'dddd Do MMMM, YYYY').format('YYYY-MM-DD');
	// 	});
	//
	// 	Shows.update(data, {
	// 		where: {
	// 			id,
	// 			userId: data.userId
	// 		}
	// 	})
	// 		.then((affectedCount, affectedRows) => res.json({success: true}))
	// 		.catch(err => res.json({success:false, err}));
	// }
};
