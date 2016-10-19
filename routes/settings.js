const Setting = require('../db/models/settings');

module.exports = {
	getAll: (req, res) => {
		// User.find({
		// 	where: {
		// 		id: req.user.id
		// 	}
		// })
		// 	.then(profile => res.json(profile));
		Setting.findAll({
			where: {
				userId: req.user.id
			}
		})
			.then(settings => res.json(settings));
	},

	get: (req, res) => {
		Setting.find({
			where: {
				userId: req.user.id,
				name: req.params.name
			}
		})
	},

	update: (req, res) => {
		const data = req.body;
		data.userId = req.user.id;

		const {name, value} = req.body;

		Setting.update({value}, {
			where: {
				name,
				userId: data.userId
			}
		})
			.then((affectedCount, affectedRows) => res.json({success: true}))
			.catch(err => res.json({success: false, err}));
		;

	}
};