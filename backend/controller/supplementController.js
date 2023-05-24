const SupplementModel = require("../models/SupplementModel");

//----------------------------------------------------
// add supplement
const addSupplement = async (req, res) => {
    const { name, category, price, src, link } = req.body;
    try {
        const existsupplement = await SupplementModel.findOne({ $and: [{ name: name }, { category: category }] });
        if (existsupplement) {
            return res.json({ success: false, message: "Supplement Already Exist" });
        }
        else {
            const supplement = new SupplementModel({
                name: name,
                category: category,
                price: price,
                src: src,
                link: link
            });
            supplement.save();
            return res.json({ success: true });
        }
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: "Service Error" });
    }
};

const displaySupplement = async (req, res) => {
    try {
        const supplement = await SupplementModel.find({});
        res.json(supplement);
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Service Error" });
    }
};

const deleteSupplement = async (req, res) => {
    try {
        const existsupplement = await SupplementModel.findOne({ _id: req.params.supplementID });
        if (existsupplement) {
            await SupplementModel.deleteOne({ _id: existsupplement._id });
            return res.json({ success: true })
        }
        else {
            return res.json({ success: false, message: "Service Error" });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Service Error" });
    }
};

const updateSupplement = async (req, res) => {
    try {
        await SupplementModel.findOneAndUpdate(req.params.supplementID, req.body);
        return res.json({ success: true })
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Service Error" });
    }
};
//----------------------------------------------------

module.exports = { addSupplement, displaySupplement, deleteSupplement, updateSupplement };