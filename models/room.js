'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Hotel,{foreignKey:'HotelId'})
      Room.hasMany(models.Reservation,{foreignKey:'RoomId'})

      Room.belongsToMany(models.Amenity,{
        through: RoomAmenity,
        foreignKey: 'RoomId',
        otherKey: 'AmenityId'
      })
    }
  }
  Room.init({
    HotelId: DataTypes.INTEGER,
    room_number: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};