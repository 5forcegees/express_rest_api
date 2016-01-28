var pkg = require(__dirname + '/../../package.json');
var Sequelize = require('sequelize');

var seq = new Sequelize(pkg.database_name, pkg.database_user, pkg.database_pw, {
    host: 'localhost',
    dialect: 'mysql'
});

// load models, allows for adding models later if needed, just add them in app/models and then to this array
var models = [
    'whole_sheet'
];

models.forEach(function(model) {
    module.exports[model] = seq.import(__dirname + '/' + model);
});

// export connection
module.exports.seq = seq;
