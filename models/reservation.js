'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, {foreignKey: 'UserId'})
      Reservation.belongsTo(models.Room, {foreignKey: 'RoomId'})
    }
  }
  Reservation.init({
    UserId: {
      type :  DataTypes.INTEGER
    },
    RoomId: DataTypes.INTEGER,
    check_in: DataTypes.INTEGER,
    check_out: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};