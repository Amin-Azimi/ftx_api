const {DataTypes, Model} = require('sequelize');
var sequelize = require('../datasources/ftx-db')

class Fixture extends Model{}
Fixture.init(
    {
        id:{
            type:DataTypes.NUMBER,
            allowNull:false,
            primaryKey:true,
            field:'match_id'
        },
        status :{
            type:DataTypes.STRING
                }
    },
    {
        sequelize,
        modelName:'Fixture',
        tableName: 'ft_matchs'
    }
);
module.exports = Fixture;