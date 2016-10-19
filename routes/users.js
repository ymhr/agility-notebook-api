const User = require('../db/models/user');

module.exports = {
	get: (req, res) => {
		User.find({
			where: {
				id: req.user.id
			}
		})
			.then(profile => res.json(profile));
	}
};