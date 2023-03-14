const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const brands = require("./routes/brand");
const category = require("./routes/category");
const products = require("./routes/product");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
const users = require("./routes/user");
const stripe = require("./routes/stripe");
const refreshToken = require("./routes/refresh-token");
const errorHandler = require("./middleware/error");

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB connection successful!"))
  .catch((error) => console.log(error));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use("/api/stripe", stripe);
app.use(
  express.json({
    limit: "100mb",
    extended: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/brands", brands);
app.use("/api/categories", category);
app.use("/api/products", products);

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/users", users);
app.use("/api/refresh-token", refreshToken);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
