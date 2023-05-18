const jwt = require( "jsonwebtoken");
const bcrypt = require( "bcrypt");

const User = require( "../models/User.js");

 const registerUser = async (req, res) => {
   
    try{
        //get values= require( request data
        console.log(req.body);


        const userData = req.body;

        const {username, password} = userData;
        
        //error: missing request data
        if(!username || !password){
            res.status(422).json({error: "Username and password required"});
        }else{
            const user = await User.findOne({username});          

            //error: user exists
            if(user){
                return res.status(409).json({error: "User already exists."})
            }

            //encrypts password with a salt of 10
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username:  username,
                password: hashedPassword,
            });

            //data you want to send back goes in here
            const userData = {username: newUser.username, id: newUser._id}

            //generates a token based on the user's id and sends it in response
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            res.json({token, user: userData, message: "Succsessfully registered user!"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({error: "An unexpected error occurred."})
    }

   
};

 const getUser = async (req, res) => {
    try {

        const token = req.headers.authorization.split(" ")[1]; // Extract token= require( Authorization header
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        const user = await User.findById(userId);
        
        console.log(user);

        const {_id, username} = user;
        if (user) {
          return res.status(200).json({_id, username});
        } else {
          return res.status(400).json({error: "Authentication Error: User Does Not Exist"});
        }
      } catch (error) {
        return res.status(401).json({error: "Authentication Error: Invalid Token"});
      }
}

 const loginUser = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user){
        return res.status(400).json({error: "User does not exist!"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.json({error: "Incorrect username or password!"});
    }

    //data you want to send back goes in here
    const userData = {username: user.username, id: user._id};

    //generates a token based on the user's id and sends it in response
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

    res.json({token, user: userData});

};



 const verifyToken = (req, res, next) => {
    
    // Extract token= require( the header
    const token = req.headers.authorization.split(' ')[1];
    console.log("TOKEN: " + token)
    // Verify and decode the token
    try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
   
    } catch (err) {
    console.error(err);
    // JsonWebTokenError: invalid signature
    }
}

module.exports = {verifyToken, getUser, loginUser, registerUser}