const Dog = require('../db/models/dogs');
const Handler = require('../db/models/handlers');

module.exports = {
	getAll: (req, res) => {
		Handler.findAll({
			where: {
				userId: req.user.id
			}
		}).then(runs => res.json(runs))
			.catch(err => ({success: false, err}));
	},
	get: (req, res) => {
		Handler.find({
			where: {
				userId: req.user.id,
				id: req.params.id
			}
		}).then(run => res.json(run))
			.catch(err => ({success: false, err}));
	},
	update: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		const {id} = req.params;

		Handler.update(data, {
			where: {
				id,
				userId: data.userId
			}
		})
			.then((affectedCount, affectedRows) => res.json({success: true}))
			.catch(err => res.json({success:false, err}));
	},
	create: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		Handler.create(data)
			.then(instance => res.json({success: true, data: instance}))
			.catch(err => res.json({success:false, err}));
	}
};
