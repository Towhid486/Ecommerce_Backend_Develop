const {CartListService,SaveListService,UpdateListService,RemoveListService} = require('../services/CartListServices')


exports.CartList = async(req,res)=>{
    let result =  await CartListService(req);
    return res.status(200).json(result);
}


exports.SaveCartList = async(req,res)=>{
    let result =  await SaveListService(req);
    return res.status(200).json(result);
}


exports.UpdateCartList = async(req,res)=>{
    let result =  await UpdateListService(req);
    return res.status(200).json(result);
}


exports.RemoveCartList = async(req,res)=>{
    let result =  await RemoveListService(req);
    return res.status(200).json(result);
}