import joi from "joi";

export const userValidation = joi.object( {
    username: joi.string().min(3).max(30).allow(""),
     email:joi.string().email().required(),
        password: joi.string().min(6).required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).message("Password must be at least 6 characters long and contain at least one letter and one number")
        });
        

        export const userValidationForLogin = joi.object( {
    email:joi.string().email().required(),
        password: joi.string().min(6).required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).message("Password must be at least 6 characters long and contain at least one letter and one number")
        });
        