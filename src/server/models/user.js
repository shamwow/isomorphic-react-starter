module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    date_created: DataTypes.DATE,
    last_login: DataTypes.DATE,
    dob: DataTypes.DATE,
    education_level: DataTypes.STRING,
    field: DataTypes.STRING,
    gender: DataTypes.ENUM('M', 'F'),
    password: DataTypes.STRING
  }, {
    tableName: 'User',
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Trail, {through: 'Own'});
      }
    }
  });

  return User;
};