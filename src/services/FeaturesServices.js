const FeaturesModel = require('../models/FeaturesModel')
const LegalModel = require('../models/LegalModel')


exports.FeaturesListService = async(req)=>{
    try{
        let data = await FeaturesModel.find();
        return {status:"success", data:data}
    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


exports.LegalDetailsService = async(req)=>{
    try{
        let type = req.params.type;
        let data = await LegalModel.find({type:type});
        return {status:"success", data:data}
    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}