const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to ecommerce API-Node", status: true });
});

// Import routes
const authRouters = require("./routes/auth.route.js");
app.use("/auth", authRouters);


const userRouters = require("./routes/user.route.js");
app.use("/api/users", userRouters); 

const productRouter=require("./routes/product.routes.js")
app.use("/api/products",productRouter);

const adminProductRouter=require("./routes/adminProduct.routes.js")
app.use("/api/admin/products",adminProductRouter);


const cartRouter=require("./routes/cart.routes.js");
app.use("/api/cart",cartRouter);

const cartItemRouter=require("./routes/cartItem.routes.js");
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./routes/order.routes.js");
app.use("/api/orders",orderRouter);

const adminOrderRouter=require("./routes/adminOrder.routes.js")
app.use("/api/admin/orders",adminOrderRouter);

const reviewRouter=require("./routes/review.routes.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./routes/rating.routes.js");
app.use("/api/ratings",ratingRouter);


// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).send({ message: "Route not found", status: false });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong", status: false });
});

module.exports = app;
