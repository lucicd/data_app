const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	'demo',
	'postgres',
	'Huntsman2017', {
	host: '127.0.0.1',
	dialect: 'postgres',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 3000,
		idel: 1000,
	},
});

const User = sequelize.define('user', {
	username: {type: Sequelize.STRING},
	password: {type: Sequelize.STRING},
});

function connect(callback) {
	sequelize.authenticate().then(function() {
		console.log('Connection has been established successfully');
		callback();
	}).catch(function(err) {
		console.error('Unable to connect to the database:' + err);
	});
}


function createTables(callback) {
	
	User.sync({force: true}).then(callback);
}

function createUsers(callback) {
	User.create({
		username: 'joe',
		password: 'secret',
	}).then(callback);
}

function queryUsers(callback) {
	User.findAll().then(callback);	
}

connect(function() {
	createTables(function() {
		createUsers(function() {
			queryUsers(function(users) {
				console.log(users);
			});
		});
	});
});
