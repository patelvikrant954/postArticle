import userModel from "../model/user.js";
import Jwt from "jsonwebtoken";
import statusCodes from "../constantKeys/statusCode.js";
import dotenv from 'dotenv'
import textMessages from "../constantKeys/constantKeys.js";
import localStorage from 'localStorage'

dotenv.config({ path: "config.env" })
export const generatejwtToken = (id, email) => {
    const token = (Jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TIME }))
    return token;
}
export const register = (req, res) => {

    const { name, age, email, password } = req.body;
    if (name && age && email && password) {
        userModel.findOne({ email: email }).then((user) => {
            if (user) {
                return res.status(statusCodes.OK).send({ message: textMessages.userTextKeys.existAlready })
            }
            else {
                const user = userModel({
                    name: name,
                    email: email,
                    age: age,
                    password: password
                })
                user.save().then((user) => {
                    res.status(statusCodes.CREATED).send({ message: textMessages.userTextKeys.registerSuccessfully })
                })
            }
        }).catch((err) => {
            res.send(err)
        })
    }
    else {
        return res.status(statusCodes.NOT_FOUND).send({ message: textMessages.userTextKeys.enterAllDetails })
    }
}
export const login = (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        userModel.findOne({ email: email }).then((user) => {
            if (user.password === password) {
                const token = generatejwtToken(user._id, user.email);
                localStorage.setItem(textMessages.userTextKeys.loginToggle,textMessages.userTextKeys.loginToggleTrue)
                res.status(statusCodes.OK).send({ message: textMessages.userTextKeys.loginSuccessfully, name: user.name, email: user.email, id: user._id, token })
            }
            else {
                res.status(statusCodes.UNAUTHORIZED).send({ message: textMessages.userTextKeys.invalidPassword });
            }
        }).catch((err) => {
            res.status(statusCodes.NOT_FOUND).send({ message: textMessages.userTextKeys.invalidUser, err });
        })
    }
    else {
        res.status(statusCodes.OK).send({ message: textMessages.userTextKeys.enterAllDetails })
    }

}



export const updateUser = (req, res) => {
    if(localStorage.getItem(textMessages.userTextKeys.loginToggle)==textMessages.userTextKeys.loginToggleTrue)
    {
    const { name, age } = req.body;
    if (name && age) {
        userModel.findByIdAndUpdate(req.params.userid, { name: name, age: age }).then((user) => {
            res.status(statusCodes.OK).send({ message: textMessages.userTextKeys.userUpdated })
        }).catch((err) => {
            res.status(statusCodes.BAD_REQUEST).send({ message: err })

        })
    }
    else {
        res.status(statusCodes.BAD_REQUEST).send({ message: textMessages.userTextKeys.enterAllDetails });

    }
}
else
{
    res.status(statusCodes.OK).send({message:textMessages.authTextKeys.unAuthorized})
}
 }

export const invalidUrl = (req, res) => {
    res.status(statusCodes.BAD_REQUEST).send({ message: textMessages.authTextKeys.invalidUrl })
}