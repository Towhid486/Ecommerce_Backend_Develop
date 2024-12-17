const BrandModel= require('../models/BrandModel')
const CategoryModel = require('../models/CategoryModel')
const ProductModel = require('../models/ProductModel')
const ProductSliderModel = require('../models/ProductSliderModel')
const ProductDetailModel = require('../models/ProductDetailModel')
const ReviewModel = require('../models/ReviewModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


const BrandListService = async(req) =>{
    try {
        let data = await BrandModel.find();
        return {status:"success", data:data}
    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}

const CategoryListService = async(req) =>{
    try {
        let data = await CategoryModel.find();
        return {status:"success", data:data}
    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}

const SliderListService = async (req) => {
    try {
        let data= await ProductSliderModel.find();
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}







const ListByBrandService = async(req) =>{
    try {
        let BrandID = new ObjectId(req.params.BrandID);
        let MatchStage = {$match:{brandID:BrandID}}

        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinWithCategoryStage = {$lookup: {from:"categories", localField:"categoryID",foreignField: "_id",as:"category"}}
        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage ={$unwind:"$category"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:"success", data:data}

    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const ListByCategoryService = async(req) =>{
    try {
        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStage = {$match:{categoryID:CategoryID}}

        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinWithCategoryStage = {$lookup: {from:"categories", localField:"categoryID",foreignField: "_id",as:"category"}}
        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage ={$unwind:"$category"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductModel.aggregate([
            MatchStage, JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success", data:data}

    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const ListBySmilierService = async(req) =>{
    try {
        let CategoryID = new ObjectId(req.params.CategoryID);
        let MatchStage = {$match:{categoryID:CategoryID}}
        let limitStage={$limit:10}

        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinWithCategoryStage = {$lookup: {from:"categories", localField:"categoryID",foreignField: "_id",as:"category"}}

        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage ={$unwind:"$category"}
        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductModel.aggregate([
            MatchStage, limitStage, JoinWithBrandStage, JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success", data:data}

    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const ListByRemarkService = async (req) => {
    try {

        let Remark=req.params.Remark;
        let MatchStage={$match:{remark:Remark}}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const ListByKeywordService = async(req) =>{
    try {
        let Keyword = req.params.Keyword;
        let SearchRegex={"$regex":Keyword, "$options":"i"}
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams}

        let MatchStage={$match:SearchQuery}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};

        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  ProductModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        console.log(`Product found for ${Keyword}`)
        return {status:"success",data:data}


    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const DetailsService = async(req) =>{
    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match:{_id:ProductID}}

        let JoinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let JoinWithCategoryStage = {$lookup: {from:"categories", localField:"categoryID",foreignField: "_id",as:"category"}}
        let JoinWithDetailsStage = {$lookup: {from:"productdetails", localField:"_id",foreignField: "productID",as:"details"}}

        let UnwindBrandStage ={$unwind:"$brand"}
        let UnwindCategoryStage ={$unwind:"$category"}
        let UnwindDetailsStage ={$unwind:"$details"}

        let ProjectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductDetailModel.aggregate([
            MatchStage, JoinWithBrandStage, JoinWithCategoryStage,JoinWithDetailsStage,
            UnwindBrandStage, UnwindCategoryStage, UnwindDetailsStage, ProjectionStage
        ])
        console.log(`Product ${ProductID} Details Success`)
        return {status:"success", data:data}
    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const ReviewListService = async(req) =>{
    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let MatchStage = {$match:{productID:ProductID}}

        let JoinWithProfileStage = {$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}}
        let UnwindProfileStage = {$unwind:"$profile"}
        let ProjectionStage = {$project:{'des':1, 'rating':1, 'profile.cus_name':1, 'profile.userID':1}}


        let data = await ReviewModel.aggregate([
            MatchStage, JoinWithProfileStage,
            UnwindProfileStage, ProjectionStage
        ])

        console.log(`Product ${ProductID} Details Success`)
        return {status:"success", data:data}
    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const ListByFilterService = async(req) =>{
    try {

    }catch(e){
        return {status:"fail", data:e}.toString()
    }
}


const CreateReviewService = async (req) => {
    try{
        let user_id= req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        let data=await ReviewModel.create(reqBody)
        console.log(`Review created for product ${reqBody['productID']}`)
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e.toString()}
    }
}





module.exports={
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySmilierService,
    ListByKeywordService,
    ListByRemarkService,
    ListByFilterService,
    DetailsService,
    ReviewListService,
    CreateReviewService
}