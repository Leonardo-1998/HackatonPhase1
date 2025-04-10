'use strict';
const {
  Model
} = require('sequelize');
const {
  formattedRupiah,
  currentDate,
  datePlusOne
} = require('../helper/helper');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.User, { foreignKey: 'UserId' })
      Reservation.belongsTo(models.Room, { foreignKey: 'RoomId' })
    }

    formattedCheckIn() {
      let checkIn = this.check_in.toISOString()
      checkIn = checkIn.split("T")[0]
      return checkIn
    }

    formattedCheckOut() {
      let checkOut = this.check_out.toISOString()
      checkOut = checkOut.split("T")[0]
      return checkOut
    }

    get formattedPrice() {
      return formattedRupiah(this.totalPrice)
    }

  }

  Reservation.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    RoomId: DataTypes.INTEGER,
    check_in: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull:{
          msg: "You must insert Checkin Date" 
        },
        notEmpty:{
          msg: "You must insert Checkin Date" 
        },
        isAfter: {
          args: currentDate(),
          msg: "Check-In date must be after today"
        }
      }
    },
    check_out: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull:{
          msg: "You must insert Checkout Date" 
        },
        notEmpty:{
          msg: "You must insert Checkout Date" 
        },
        isAfter: {
          args: currentDate(Reservation.check_in),
          msg: "Check-Out must be after Check-In date"
        }
      }
    },
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};