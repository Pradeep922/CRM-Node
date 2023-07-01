import { connectToDatabase } from '../Database/db.js'
import { generateauthtoken } from '../utils/token.js';
import bcrypt from 'bcryptjs'

export const createUser = async (req, res) => {

    const { name, password, isAdmin = false, tokens = [] } = req.body;

    const client = await connectToDatabase();

    const generated_tokens = [];

    try {
        const db = client.db();

        const alreadypresent = await db.collection('users').find({ name: name }).toArray();


        if (alreadypresent.length != 0) {
            return res.status(201).send("Already Present");
        }

        const hashedpassword = await bcrypt.hash(password, 8);

        const result = await db.collection('users').insertOne({
            name: name,
            password: hashedpassword,
            isAdmin: isAdmin
        });

        const authtoken = await generateauthtoken(result);

        generated_tokens.push(authtoken);

        await db.collection('users').updateOne({ _id: result.insertedId }, {
            $set: {
                tokens: generated_tokens
            }
        })

        const user = await db.collection('users').findOne({ _id: result.insertedId });

        res.status(201).json(user);
        client.close();
    } catch (error) {

        res.status(401).send(error.message);
        client.close();
    }
}

export const getUsers = async (req, res) => {

    const client = await connectToDatabase();

    try {
        const db = client.db();
        const result = await db.collection('users').find({}).toArray();
        res.status(201).json(result);
        client.close();

    } catch (error) {

        res.status(401).send(error.message);
        client.close();
    }
}

export const loginUser = async (req, res) => {

    const { name, password } = req.body;

    const client = await connectToDatabase();

    try {
        const db = client.db();

        const result = await db.collection('users').findOne({ name: name });

        if (!result) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, result.password);

        if (!isMatch) {
            throw new Error(`Passport did'nt match`)
        }

        const token = await generateauthtoken(result);
        const generated_tokens = [];
        generated_tokens.push(token)

       
        await db.collection('users').updateOne({ _id: result._id }, {
            $set: {
                tokens: generated_tokens
            }
        })

        const logged_user = await db.collection('users').findOne({ _id: result._id });

        res.status(201).json(logged_user);
        client.close();

    } catch (error) {

        res.status(401).send(error.message);
        client.close();
    }
}

export const logoutUser = async (req, res) => {
    const client = await connectToDatabase();

    try {
        const db = client.db();

        await db.collection('users').updateOne({ _id: req.user._id }, {
            $set: {
                tokens: []
            }
        })

        res.status(201).send("Loggeed out");
    } catch (error) {

        res.status(401).send(error.message);
        client.close();
    }
}