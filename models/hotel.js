'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {

    static async filterRegion(region){
      let option = {}
      if (region){
        option.where = {region}
      }
      return await Hotel.findAll(option)
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Room,{foreignKey: 'HotelId'})
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};