const handleProfileGet = (db) => (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				return res.json(user[0]);
			} else {
				res.status(400).json("Not found")
			}
		})
		.catch(err => res.status(400).json("Error getting user"))
}

module.exports = {
	handleProfileGet: handleProfileGet
}