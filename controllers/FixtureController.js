var { Op } = require('sequelize');
const fxr = require('../models/Fixture')

exports.fixture_detail=function(req,res,next)
{
    fxr.findAll(
    {
        where:
        {
            id:{
                [Op.gt]:req.params.id
            }
        }
        ,limit:15
    }
    )
    .then(fixtures => res.json(fixtures))
    .catch(function(err){
        next(err);
    });
}
