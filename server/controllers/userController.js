import userData from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import env from 'dotenv'; 

env.config();

export default class userDatabase {
    static addUser(req, res){
        const newUserId = userData[userData.length - 1].id + 1;
        const {email, firstName, lastName, password} = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);;

       for(let i=0; i<userData.length; i++){
        if(userData[i].email == email){
            res.status(409).json({
                status: 409,
                message:'User already exist'
            });
        }
       }
        const payload = {
                id:newUserId,
                email
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 10}); // Expires in 10 hours
            req.token = token;
            // console.log(token);
        userData.push({
            id:newUserId,
            email,
            firstName,
            lastName,
            hashedPassword
        });
        
        return res.status(201)
            .json({
                status: 201,
                // message:'A new user has been added',
                data:[{
                    token:token
                }]
                // token
            });
            return res.status(401).json({status:401, message:'Unauthorized'});
    }

    static loginUser(req, res){
        const { email, password } = req.body;
        let checkObject = userData.find(x => x.email == email);
        
        if (checkObject){
            console.log(checkObject);
            const checkedPassword = bcrypt.compareSync(password, checkObject.hashedPassword);
            if(checkedPassword){
                const payload = {
                    id:checkObject.id,
                    email
                }
                const token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 60 * 60 * 10 // 10 hours
                  });
                  req.token = token;
                  return res.status(200)
                    .json({
                      status: 'Success',
                      message: 'successfull login',
                      token
                 });

            }          
            
        }
        return res.json({status:400, error: 'unauthorized user'})

        }
        
 }
    