import jwt from 'jsonwebtoken';

export const generateauthtoken = async(user) => {

    if(user.insertedId){
        const token = await jwt.sign({_id:user.insertedId}, process.env.SECRET_KEY);

        return token;
    }
   
    const token = await jwt.sign({_id:user._id}, process.env.SECRET_KEY);
   
    return token;  
}
