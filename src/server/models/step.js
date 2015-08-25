module.exports = function(sequelize, DataTypes) {
  var Step = sequelize.define('Step', {
	order: DataTypes.INTEGER,
	annotations: DataTypes.TEXT
  }, {
  	tableName: 'Step'
  });

  return Step;
};