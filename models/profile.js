'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {foreignKey:'UserId'})
    }
  }
  Profile.init({
    UserId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    profile_pic : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};