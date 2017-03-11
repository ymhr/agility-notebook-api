const Dog = require('../db/models/dogs');

module.exports = {
	getAll: (req, res) => {
		Dog.findAll({
			where: {
				userId: req.user.id
			}
		}).then(runs => res.json(runs))
			.catch(err => ({success: false, err}));
	},
	get: (req, res) => {
		Dog.find({
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

		Dog.update(data, {
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

		Dog.create(data)
			.then(instance => res.json({success: true, data: instance}))
			.catch(err => res.json({success:false, err}));
	}
};
