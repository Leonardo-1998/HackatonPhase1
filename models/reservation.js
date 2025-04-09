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

    formattedCheckIn (){
      let checkIn = this.check_in.toISOString()
      checkIn = checkIn.split("T")[0]
      return checkIn
    }

    formattedCheckOut (){
      let checkOut = this.check_out.toISOString()
      checkOut = checkOut.split("T")[0]
      return checkOut
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