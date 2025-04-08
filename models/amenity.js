'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Amenity.belongsToMany(models.Room,{
        through: RoomAmenity,
        foreignKey: 'AmenityId',
        otherKey: 'RoomId'
      })
    }
  }
  Amenity.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Amenity',
  });
  return Amenity;
};