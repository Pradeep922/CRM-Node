import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import {connectToDatabase} from '../Database/db.js'

const protect = async (req, res, next) => {
    const client = await connectToDatabase();

    try{
        const db = client.db();

        const token = req.header('Authorization').replace('Bearer ','');
        const verify = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await db.collection('users').findOne({_id: ObjectId(verify._id), "tokens": token});

        if(!user){
            throw new Error('User does not Exsist')
        }

        req.token = token;
        req.user = user;

       return next();
    }catch(error){
res.status(401).send({ error: 'Please authenticate.' })
    }
}

export default protect;