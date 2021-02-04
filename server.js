const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const ProductModel = require("./models/ProductSchema")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGODB , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get("/", (req, res) => {
    ProductModel.find({}, (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})


app.post("/add", async(req, res) => {
    const name = req.body.name
    const price = req.body.price
    const expire = req.body.expire
    const product = new ProductModel({proname: name, proprice: price, proexpire: expire})

    await product.save()

})

app.delete("/:id", async (req, res) => {
    const id = req.params.id
    await ProductModel.findByIdAndDelete(id).exec();
    res.send("deleted");
})

app.get("/edit/:id", async (req, res) => {
    const id = req.params.id
    const data = await ProductModel.findById({_id: id})
    res.send(data)
})


app.put("/update/:id", async (req, res) => {
    const id = req.params.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newExpire = req.body.expire

    await ProductModel.updateOne({_id: id}, {$set:{proname: newName, proprice: newPrice, proexpire: newExpire}})
    res.send("updated")
})


app.listen(process.env.PORT || 3001, () => {
    console.log("running on port 3001")
})