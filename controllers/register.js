
const handleRegister = (db, bcrypt) => (req, res) => {
	const {email, name, password} = req.body;
	const hash = bcrypt.hashSync(password);

	if (!email || !name || !password) {
		return res.status(400).json("unable to register, missing some parameter")
	}
	db.transaction(trx => {
		trx.insert({
			email: email,
			hash: hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: loginEmail[0],
						joined: new Date()
					})
					.then(user => {
							res.json(user[0]);
					})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("unable to register"));
}
//TODO valid Email and Name and Password
module.exports = {
	handleRegister: handleRegister
}