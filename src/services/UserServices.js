const EmailSend = require('../utility/EmailHelper')
const {EncodeToken} = require ("../utility/TokenHelper");
const UserModel = require('../models/UserModel')
const ProfileModel = require('../models/ProfileModel')


exports.UserOTPService = async (req)=>{
    try{
        let email = req.params.email;
        let code = Math.floor(100000+Math.random()*900000);
        let EmailText = `Your Verification Code is ${code}`;
        let EmailSubject = `Email Verification`
        await EmailSend(email,EmailText,EmailSubject)

        await UserModel.updateOne({email:email},{$set:{otp:code}}, {upsert:true});
        return {status:"success", message:"6 Digit OTP has been send"}
    }
    catch(e){
        return {status:"fail", message:"Something went wrong"}
    }
}



exports.VerifyLoginService = async (req)=>{
        try{
            let email = req.params.email;
            let otp = req.params.otp;
            let total = await UserModel.find({email:email, otp:otp}).countDocuments();

            if(total===1){

                //User ID Read
                let user_id = await UserModel.find({email:email, otp:otp}).select('_id')

                //User Token Create
                let token = EncodeToken(email,user_id[0]['_id'].toString())

                //OTP Code Update to ZERO (0)
                await UserModel.updateOne({email:email},{$set:{otp:"0"}});

                return {status:"success", message:"Valid OTP", token:token, total:total}

            }else{
                return {status:"fail", message:"Invalid OTP"}
            }
        }
        catch(e){
            return {status:"fail", message:"Invalid OTP"}
        }
}



exports.SaveProfileService = async (req)=>{
    try{
        let user_id =  req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID=user_id;

        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {status:"success", message:"Profile Save Success"}

    }
    catch(e){
        return {status:"fail", message:e}
    }
}




exports.ReadProfileService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let data = await ProfileModel.findOne({userID:user_id});
        console.log(`Profile found for user_id ${user_id}`)
        return {status:"success", message:"Profile found successfully", data:data}

    }
    catch(e){
        return {status:"fail", message:e}
    }
}


exports.ReadProfileAllService = async (req)=>{
    try{

        let data = await ProfileModel.find();
        console.log("All Profile Found")
        return {status:"success", message:"Profile found successfully", data:data}

    }
    catch(e){
        return {status:"fail", message:e}
    }
}


