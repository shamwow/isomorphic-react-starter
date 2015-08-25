module.exports = function(sequelize, DataTypes) {
  var Resource = sequelize.define('Resource', {
	id: {
		type: DataTypes.INTEGER,
    autoIncrement: true,
		primaryKey: true
	},
	type: DataTypes.ENUM('link'),
	data: DataTypes.TEXT
  }, {
  	tableName: 'Resource',
    classMethods: {
      associate: function(models) {
        Resource.hasMany(models.Trail, {through: 'Step'});
      }
    }
  });

  return Resource;
};