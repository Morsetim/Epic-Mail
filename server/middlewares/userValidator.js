import validator from 'validator';


class userValidator{
    signUp(req, res, next){
        const{firstName, lastName, email, password} = req.body

        const errors = {};

        if(firstName == undefined || lastName == undefined || email == undefined || password == undefined){
           return res.status(400).json({status:'Failed', message:'All some fields are empty'});
        }
            if(!validator.isLength(firstName, {min:2})){
                errors.firstName = 'First name length must be at least two characters long';
            }
            if(firstName.search(/^[a-zA-Z]*$/) === -1){
            errors.firstName = 'Lastname should be Alphabets';
        }
            if(!validator.isLength(lastName, {min:2})){
                errors.lastName = 'First name length must be at least two characters long';
            }
            if(lastName.search(/^[a-zA-Z]*$/) === -1){
            errors.lastName = 'Lastname should be Alphabets';
    }
            if(!validator.isEmail(email)){
                errors.email = 'Field must be an Email format';
            }
        if(!validator.isEmpty(password)){
            if(!validator.isLength(password, {min:6})){
                errors.isLength = 'Password length must be at least six characters long';
            }
        }else{
            errors.password = 'Field cannot be Empty';
        }
        if(Object.keys(errors).length != 0){
            return res.status(400).json({errors});
        }
        next();
}
    loginUser(req, res, next){
        const {email, password} = req.body;

        const errors = {};

        if(email == undefined || password == undefined){
            return res.status(400).json({status:'Failed', message:'All some fields are empty'});
        }
            if(!validator.isEmail(email)){
                errors.email = 'Field must be an Email format';
            }

            if(!validator.isLength(password, {min:6, max:20})){
                errors.isLength = 'Password length must be at least six characters long';
            }
        if(Object.keys(errors).length != 0){
           return res.status(400).json({errors});
        }
        next();
    }
}

export default new userValidator();
