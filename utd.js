// async function createConnection() {
//   const client = new MongoClient(MONGO_URL, {useNewUrlParser: true  });
//   await client.connect();
//   console.log("Mongo is connected ✌😊");
//   return client;
// }

// const client = await createConnection();

app.use(cors());


// app.get("/mobiles", async function (req, response) {
//   // const mobiles = await client
//   // .db("mobile-ecom")
//   // .collection('mobiles')
//   // .tofind({})
//   // .toArray();
// console.log("req");
// console.log("response");
//   response.send("admin");
// })

// app.post("/mobiles", async function (req, response) {
//   // const mobiles = await client
//   // .db("mobile-ecom")
//   // .collection('mobiles')
//   // .tofind({})
//   // .toArray();
// console.log("req");
// console.log("response");
//    response.send("manager");
// })

// // Post request to get all the Mobiles
//  app.post("/mobiles", async function (req, response) {
//    const data = req.body
//    console.log(data);
//    const result = await client
//    .db('mobile-ecom')
//    .collection('mobiles')
//    .insertMany(data);
//    response.send(result);
//  });

//  app.delete("/mobiles/:id", async function (req, response) {
//   const {id} = req.params;
  
//   console.log(id);


  
//   const token = req.header("x-auth-token");
//   console.log(token);

//   const userSession = await client
//   .db('mobile-ecom')
//   .collection('session')
//   .findOne( {token:token} );

//   // If User is Admin
// if (userSession && userSession.isAdmin) {
//   const mobiles = await client
//   .db('mobile-ecom')
//   .collection('mobiles')
//   .deleteOne({_id: ObjectId(id)});
//   response.send(mobiles);
// } else {
//   response.status(401).send({msg: "Access denied"});
// }
// });


//  async function genHashedPassword(password) {
//   const NO_OF_ROUNDS = 10;const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   return hashedPassword;
// }

//  app.post("/users/signup", async function (req, response) {
//   const {username, password, isAdmin } = req.body;
//   const userFromDb = await client
//   .db('mobile-ecom')
//   .collection('users')
//   .findOne( {username:username} );

// if (userFromDb){
//   response.status(400).send({msg: "User already exists"});
// } else {
//   const hashedPassword = await genHashedPassword(password);
//   console.log(hashedPassword);
//   const result = await client
//   .db('mobile-ecom')
//   .collection('users')
//   .insertOne({username:username, password:password, isAdmin:isAdmin});
//   response.send(result);
// }
// });

// app.post("/users/login", async function (req, response) {
//   const {username, password} = req.body;
//   const userFromDb = await client
//   .db('mobile-ecom')
//   .collection('users')
//   .findOne( {username:username} );

// if (!userFromDb){
//   response.status(401).send({msg: "Invalid Credits"});
// } else {
//   const storePassword = userFromDb.password;
//   const isPasswordMatch = await bcrypt.compare(password, storePassword);
//   console.log(isPasswordMatch);

//   if (isPasswordMatch) {
//     const token = jwt.signin({id: userFromDb._id}, process.env.SECRET_KEY);
//     await client
//   .db('mobile-ecom')
//   .collection('session')
//   .insertOne({
//     userId: userFromDB._id, 
//    isAdmin: userFromDb.isAdmin,
//    username: userFromDb.username,
//    token: token,
//   });
//   response.send({msg:"Successful Login", token: token});
//   } else {
//     response.status(401).send({msg: "Invalid Credits"})
//   }
// }
// });
