import statusCodes from "../constantKeys/statusCode.js";
import dotenv from 'dotenv'
import articleModel from "../model/article.js";
import userModel from "../model/user.js";
import localStorage from "localStorage";
import textMessages from "../constantKeys/constantKeys.js";

dotenv.config({ path: "config.env" })


export const postArticle = (req, res) => {
    if (localStorage.getItem(textMessages.userTextKeys.loginToggle) == textMessages.userTextKeys.loginToggleTrue) {
        const { title, description } = req.body;
        userModel.findById({ _id: req.params.userid }).then(() => {
            articleModel.findOne({ user_id: req.params.userid }).then((user) => {
                if (user) {
                    return res.status(statusCodes.OK).send({ message: textMessages.articleTextKeys.existAlready })
                }
                else {
                    const article = articleModel({
                        user_id: req.params.userid,
                        title: title,
                        description: description
                    })
                    article.save().then((article) => {
                        res.status(statusCodes.CREATED).send({ message: textMessages.articleTextKeys.articleAdded, article })
                    }).catch((err) => {
                        res.status(statusCodes.BAD_REQUEST).send({ message: textMessages.errorTextKeys.dataSavingError, err })
                    })
                }
            }).catch((err) => {
                res.send({ message: textMessages.errorTextKeys.datafetchingError, err })
            })

        })
    }
    else {
        res.status(statusCodes.OK).send({ message: textMessages.authTextKeys.unAuthorized })
    }
}

export const getArticles = (req, res) => {
    if (localStorage.getItem(textMessages.userTextKeys.loginToggle) == textMessages.userTextKeys.loginToggleTrue) {
        articleModel.find({}).then((articles) => {
            res.status(statusCodes.OK).send({ message: articles })
        }).catch((err) => {
            res.send({ message: textMessages.errorTextKeys.datafetchingError, err })
        })
    }
    else {
        res.status(statusCodes.OK).send({ message: textMessages.authTextKeys.unAuthorized })
    }
}



