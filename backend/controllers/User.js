const jwt = require( "jsonwebtoken");
const bcrypt = require( "bcrypt");

const User = require( "../models/User.js");

 const registerUser = async (req, res) => {
   
    try{
        //get values= require( request data
        console.log(req.body);


        const userData = req.body;

        const {username, email, password} = userData;
        
        //error: missing request data
        if(!username || !password || !email){
            res.status(422).json({error: "All fields required."});
        }else{
            const userWithEmail = await User.findOne({email});          
            const userWithName = await User.findOne({username});

            //User Alreadt Exists (cannot create new user)
            if(userWithEmail){
                return res.status(409).json({error: "A user with that email already exists."})
            }else if(userWithName){
                return res.status(409).json({error: "A user with that name already exists."})
            }

            //encrypts password with a salt of 10
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username:  username,
                email: email,
                password: hashedPassword,
            });

            //user data sent back to the client
            const userData = {username: newUser.username, id: newUser._id, email: newUser.email, preferences: newUser.preferences}


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

        console.log(token)

        //gets user ID from client's token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log(decodedToken)
        
        const userId = decodedToken.id;
        const user = await User.findById(userId);
        
        console.log(user);

        const {_id, username, email, preferences} = user;

        //if the user is found via token send user data back
        if (user) {
          return res.status(200).json({user: {_id, username, email, preferences}});
        } else {
          return res.status(400).json({error: "Authentication Error: User Does Not Exist"});
        }
      } catch (error) {
        return res.status(401).json({error: "Authentication Error: Invalid Token"});
      }
}

 const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    //a user with the email entered could not be found
    if(!user){
        return res.status(400).json({error: "User does not exist!"});
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword){
        return res.json({error: "Incorrect password!"});
    }

    //data you want to send back goes in here
    const userData = {email: user.email, username: user.username, id: user._id, preferences: user.preferences};

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