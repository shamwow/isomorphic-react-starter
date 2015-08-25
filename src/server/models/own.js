module.exports = function(sequelize, DataTypes) {
  var Own = sequelize.define('Own', {
    deleted: DataTypes.DATE,
    date: DataTypes.DATE
  }, {
  	tableName: 'Own'
  });

  return Own;
};