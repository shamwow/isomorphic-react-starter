module.exports = function(sequelize, DataTypes) {
  var Trail = sequelize.define('Trail', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    date_created: DataTypes.DATE,
    forked_from: DataTypes.STRING,
    num_views: DataTypes.INTEGER
  }, {
    tableName: 'Trail',
    classMethods: {
      associate: function(models) {
        Trail.hasMany(models.User, {through: 'Own'});
        Trail.hasMany(models.Resource, {through: 'Step'});
        Trail.hasMany(models.User, {through: 'TaggedBy'});
      }
    }
  });

  return Trail;
};