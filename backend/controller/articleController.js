const ArticleModel = require("../models/ArticleModel");

//----------------------------------------------------
const displayArticle = async (req, res) => {
    try {
        const article = await ArticleModel.find({});
        if (article) {
            return res.status(200).send(article);
        }
        else {
            return res.send({ success: false, message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
};


const addArticle = async (req, res) => {
    const { title, content } = req.body;
    try {
        const existtitle = await ArticleModel.findOne({ Title: title });
        if (existtitle) {
            return res.json({ success: false, message: "Title Exists" });
        }
        else {
            const article = new ArticleModel({
                Title: title,
                content: content
            })
            article.save();
            return res.json({ success: true });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });

    }
};

const updateArticle = async (req, res) => {
    try {
        await ArticleModel.findOneAndUpdate(req.params.articleID, req.body);
        return res.status(200).send({ success: true });
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const existarticle = await ArticleModel.findOne({ _id: req.params.articleID });
        if (existarticle) {
            await ArticleModel.deleteOne({ _id: existarticle._id });
            return res.status(200).send({ success: true });
        }
        else {
            return res.send({ success: false, message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Service Error" });
    }
};

//----------------------------------------------------
module.exports = { displayArticle, addArticle, updateArticle, deleteArticle };