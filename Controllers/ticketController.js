import {connectToDatabase} from '../Database/db.js'

export const getTickets = async (req, res) => {

    const client = await connectToDatabase();
   
    try{
    const db = client.db();
   
    const result = await db.collection('tickets').find({}).toArray();
   
    res.status(201).json(result);
    client.close();
   
    }catch(error){
   
    res.status(401).send(error.message);
    client.close();
    }
}

export const createTicket = async(req, res) => {

    const {title, description, category, priority, progress, status} = req.body;
   
    const client = await connectToDatabase();
   
    try{
    const db = client.db();
   
    const result = await db.collection('tickets').insertOne({
        title: title,
        description: description,
        category: category,
        priority: priority,
        progress: progress,
        status: status
      });
   
      res.status(201).json(result);
      client.close();
    }catch(error){
   
    res.status(401).send(error.message);
    client.close();
    }
   
    }