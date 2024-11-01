const express = require('express');
const mongoose = require('mongoose');
const Partner = require('./models/partner.model.js');
const Product = require("./models/product.model.js");
const Course = require("./models/course.model.js");
const Schedule = require("./models/schedule.model.js");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).json({message: "Welcome to Ikusasa Technology Solutions API"})
})

// ------------------------------------------------ Partner Endpoint ---------------------------------------------------//

// Endpoint for creating an partner object in the database
app.post('/api/partners', async (req, res) => {
    // get the name element 
    try {
        const partner = await Partner.create(req.body);
        res.status(200).json(partner);
    }catch(error){
        // this code block will run if an invalid body was inserted
        res.status(400).json({message: error.message})
    }
})

// Endpoint for reading a partners object in the database by providing the partner id
app.get('/api/partners/:id/', async (req, res) => {
    try {
        // get the partner
        const partner = await Partner.findById(req.params.id);
        if (!partner){
            return res.status(404).json({message: "Not found"})
        }
        res.status(200).json(partner)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})
// Read All for Partners
app.get('/api/partners', async (req, res) => {
    try {
        // get the partner
        const partners = await Partner.find();
        res.status(200).json(partners)
    }catch(error){
        res.status(400).json(error.message)
    }
})

// Update endpoint for partner
app.patch("/api/partners/:id", async (req, res) => {
    // 
    try{
        // get element
        const filter = {_id: req.params.id};
        const update = {name: req.body.name};
        const partner = await Partner.findOneAndUpdate(filter, update, {new: true})
        if (partner){
            res.status(200).json({message: "Successfully Update a Partner"});
        }else{
            res.status(500).json({message: "Unable to Update a partner"});
        }
    }catch(error){
        res.status(500).json({message: "Unable to update the Partner"});
    }
})

// Delete Endpoint for The Partner
app.delete("/api/partners/:id", async (req, res) => {
    // get the id
    try{
        const id = req.params.id;
        const partner = await Partner.findOneAndDelete({_id: id});

        if (!partner){
            return res.status(404).json({message: "Unable to delete the Partner"});
        }
        res.status(200).json({message: "Partner successfully deleted"});
    
       
    }catch(error){
        res.status(500).json({message: "Unable to delete Partner"})
    }

})

// ----------------------------------------Product CRUD Functionality----------------------------------------------------------//

// create functionality for the the product model
app.post("/api/products", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        // this code block will run if an invalid body was inserted
        res.status(400).json({message: error.message})
    }
})

// read product by ID
app.get('/api/products/:id/', async (req, res) => {
    try {
        // get the product
        const product = await Product.findById(req.params.id);
        if (!product){
            return res.status(404).json({message: "Unable to Find the Product"})
        }
        res.status(200).json(product)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// Read All for Products
app.get('/api/products', async (req, res) => {
    try {
        // get all the products
        const products = await Product.find();
        res.status(200).json(products)
    }catch(error){
        res.status(400).json(error.message)
    }
})

// Read all the products by that belong to specific partner
app.get('/api/products/partner/:id', async (req, res) => {
    try {
        // get all the products
        const partner = req.params.id;
        const products = await Product.find({"partner": partner });
        res.status(200).json(products)
    }catch(error){
        res.status(400).json(error.message)
    }
})

// Update endpoint for Product
app.patch("/api/products/:id", async (req, res) => {
    // 
    try{
        // get element
        const filter = {_id: req.params.id};
        const update = req.body;
        const product = await Product.findOneAndUpdate(filter, update, {new: true})
        if (product){
            res.status(200).json({message: "Successfully Updated a Product"});
        }else{
            res.status(404).json({message: "Unable to Update the Product"});
        }
    }catch(error){
        res.status(500).json({message: "Unable to update the Partner"});
    }
})

app.delete("/api/products/:id", async (req, res) => {
    // get the id
    try{
        const id = req.params.id;
        const product = await Product.findOneAndDelete({_id: id});

        if (!product){
            return res.status(404).json({message: "Unable to delete the Product"});
        }
        res.status(200).json({message: "Product successfully deleted"});
    
       
    }catch(error){
        res.status(500).json({message: "Unable to delete Product"})
    }

})
// -------------------------------------------------------------------- CRUD Functionality For Course --------------------------------------------//

// Endpoint for creating an Course object in the database
app.post('/api/courses', async (req, res) => {
    // get the name element 
    try {
        const course = await Course.create(req.body);
        res.status(200).json(course);
    }catch(error){
        // this code block will run if an invalid body was inserted
        res.status(400).json({message: error.message})
    }
})

// Read All for Courses
app.get('/api/courses', async (req, res) => {
    try {
        // get the partner
        const courses = await Course.find();
        res.status(200).json(courses)
    }catch(error){
        res.status(400).json(error.message)
    }
})

app.get('/api/courses/:id/', async (req, res) => {
    try {
        // get the product
        const course = await Course.findById(req.params.id);
        if (!course){
            return res.status(404).json({message: "Unable to Find the Course"})
        }
        res.status(200).json(course)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// Read all the Courses by that belong to specific product
app.get('/api/courses/products/:id', async (req, res) => {
    try {
        // get all the products
        const product = req.params.id;
        const courses = await Course.find({"product": product });
        res.status(200).json(courses);
    }catch(error){
        res.status(400).json(error.message)
    }
})

// Delete course By ID
app.delete("/api/courses/:id", async (req, res) => {
    // get the id
    try{
        const id = req.params.id;
        const course = await Course.findOneAndDelete({_id: id});

        if (!course){
            return res.status(404).json({message: "Unable to delete the Product"});
        }
        res.status(200).json({message: "Product successfully deleted"});
    
       
    }catch(error){
        res.status(500).json({message: "Unable to delete Product"})
    }

})

// Update endpoint for Product
app.patch("/api/courses/:id", async (req, res) => {
    // 
    try{
        // get element
        const filter = {_id: req.params.id};
        const update = req.body;
        const course = await Course.findOneAndUpdate(filter, update, {new: true})
        if (course){
            res.status(200).json({message: "Successfully Updated a Product"});
        }else{
            res.status(404).json({message: "Unable to Update the Product"});
        }
    }catch(error){
        res.status(500).json({message: "Unable to update the Partner"});
    }
})

// ---------------------------------------------------------------CRUD Functionality for the Schedule -------------------------------------------------

// Endpoint for creating an Schedule object in the database
app.post('/api/schedules', async (req, res) => {
    // get the name element 
    try {
        const schedule = await Schedule.create(req.body);
        res.status(200).json(schedule);
    }catch(error){
        // this code block will run if an invalid body was inserted
        res.status(400).json({message: error.message})
    }
})

// Read All for Schedules
app.get('/api/schedules', async (req, res) => {
    try {
        // get the schedule
        const schedules = Schedule.find();
        res.status(200).json(schedules);
    }catch(error){
        res.status(400).json(error.message)
    }
})

app.get('/api/schedules/:id/', async (req, res) => {
    try {
        // get the product
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule){
            return res.status(404).json({message: "Unable to Find the Schedule"})
        }
        res.status(200).json(schedule)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})
app.get('/api/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules)
    }catch(error){
        res.status(400).json(error.message)
    }
})

// Read all the Schedules that belong to specific course
app.get('/api/schedules/courses/:id', async (req, res) => {
    try {
        // get all the products
        const course = req.params.id;
        const schedules = await Schedule.find({"course": course});
        res.status(200).json(schedules);
    }catch(error){
        res.status(400).json(error.message)
    }
})


mongoose.connect("mongodb://mxolisinkosi2360:DTLQnrMZf30oRN5Q@ikusasa-shard-00-00.c4jic.mongodb.net:27017,ikusasa-shard-00-01.c4jic.mongodb.net:27017,ikusasa-shard-00-02.c4jic.mongodb.net:27017/?ssl=true&replicaSet=atlas-i1lvpx-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Ikusasa")
.then(() =>{ 
    console.log("connected");
    app.listen(3000, ()=> {
        console.log("The app is running on port 3000");
    })

})
.catch(() => console.log("not connected"));
