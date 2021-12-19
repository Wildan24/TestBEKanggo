const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");


const app           = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// database
const db    = require("./app/models");
const Role  = db.role;
const Product = db.product;

db.sequelize.sync({ force: true}).then(() => {
    initial();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to My Website." });
});

//DAFTARIN ROUTES
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/order.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    const newLocal = 'Server is running on port ${PORT}.';
    console.log(newLocal);
});


function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });

    Product.create({
        product_id: 1,
        product_name: "Kaos Polos",
        price: "50000",
        qty: 5
    });

    Product.create({
        product_id: 2,
        product_name: "Celana Jeans",
        price: "100000",
        qty: 5
    });
}