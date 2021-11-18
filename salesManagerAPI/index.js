require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;

const utils = require("./utils.js");

async function main() {
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  await mongoose.connect(DB_URL);

  // -----------------------------USER-------------------------

  const userSchema = new mongoose.Schema(
    {
      username: String,
      fullname: String,
      address: String,
      password: String,
      role: String,
    },
    {
      collection: "User",
    }
  );

  const UserModel = mongoose.model("User", userSchema);

  // Login
  app.post("/api/login", async function (req, res) {
    const account = req.body;
    try {
      const findUser = await UserModel.findOne({
        username: account.username.trim(),
      });

      if (await utils.comparePassword(account.password, findUser.password)) {
        const token = jwt.sign(
          {
            username: findUser.username,
            role: findUser.role,
          },
          SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          username: findUser.username,
          token: token,
          role: findUser.role,
        });
      }
    } catch (err) {
      res.status(404).json({ message: "Username or Password is wrong", err });
    }
  });

  // Authorization
  async function authorization(req, res, next) {
    if (!req.headers.authorization) {
      res
        .status(401)
        .json({ message: "Bạn cần đăng nhập để thực hiện hành động này" });
      return;
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, SECRET_KEY, async function (err, data) {
      if (err) {
        res.status(401).json({
          message: "Phiên đăng nhập hết hạn",
        });
        return;
      } else {
        try {
          const findUser = await UserModel.findOne({
            username: data.username,
          });

          if (!findUser) {
            res.status(400).json({
              message: "Tài khoản hiện không còn khả dụng",
            });
            return;
          }
          req.body =
            findUser.role === "admin"
              ? { ...req.body, isAdmin: true }
              : req.body;

          next();
        } catch (err) {
          res.status(500).json({
            message: "Có lỗi xảy ra",
            err,
          });
        }
      }
    });
  }

  // Check Admin
  async function authenAdmin(req, res, next) {
    if (!req.body.isAdmin) {
      res.status(403).json({
        message: "Ban không có quyền thực hiện hành động này",
      });
      return;
    } else {
      const newBody = { ...req.body };
      delete newBody.isAdmin;
      req.body = newBody;
      next();
    }
  }

  // Create User
  app.post(
    "/api/createUser",
    authorization,
    authenAdmin,
    async function (req, res) {
      const account = req.body;

      if (!(account.username && account.password && account.fullname)) {
        res.status(400).json({ message: "Không để trống" });
        return;
      }

      try {
        const users = await UserModel.find({
          username: account.username,
        });
        if (users.length) {
          res.status(400).json({ message: "Đã tồn tại user này" });
          return;
        }

        const newUser = new UserModel({
          username: account.username,
          fullname: account.fullname,
          password: await utils.genEncodePassword(account.password),
          address: account.address,
          role: "staff",
        });
        await newUser.save();
        delete newUser["_doc"].password;
        res.status(200).json({
          message: "Tạo tài khoản thành công",
          payload: {
            ...newUser["_doc"],
          },
        });
      } catch (err) {
        res.status(500).json({ message: "Có lỗi không xác định", err });
      }
    }
  );

  //-------------------------------PRODUCT--------------------------------

  const productSchema = new mongoose.Schema(
    {
      _id: String,
      name: String,
      desc: String,
      price: Number,
      quantity: Number,
      type: String,
      img: String,
    },
    {
      collection: "Products",
    }
  );

  const ProductModel = mongoose.model("Products", productSchema);

  // Get Products
  app.get("/api/getproducts", async function (req, res) {
    const limit = req.query.limit ?? 5;
    const skip = req.query.page ?? 0;

    const name = req.query.name ?? "";

    let filter;

    if (name != "") filter = { name: name };

    if (skip != "") skip = (skip - 1) * limit;

    try {
      const countDocuments = await ProductModel.countDocuments(filter).exec();
      const products = await ProductModel.find({})
        .skip(skip)
        .limit(limit)
        .exec();
      res.status(200).json({
        products: products,
        totalProducts: countDocuments,
        message: "Lấy dữ liệu product thành công",
      });
    } catch (err) {
      res.status(500).json({
        message: "Lấy dữ liệu product thất bại",
        err,
      });
    }
  });

  app.post("/api/createProduct", async function (req, res) {
    if (
      !Object.keys(req.body).every((key) => {
        return req.body[key] !== "";
      })
    ) {
      res.status(400).json("Không có trường nào được trống");
      return;
    }

    try {
      const checkExist = await ProductModel.find({
        type: req.body.type,
      }).exec();

      const newProduct = new ProductModel({
        ...req.body,
        _id: `${req.body.type}${checkExist.length + 1}`,
        price: Number(req.body.price),
        quantity: Number(req.body.quantity) > 0 ? Number(req.body.quantity) : 0,
      });

      const saveProduct = await newProduct.save();

      res.status(200).json({
        message: "Thành công",
        product: saveProduct,
      });
    } catch (err) {
      res.status(500).json({
        message: "Có lỗi không xác định",
        err,
      });
    }
  });

  //Listen on port
  app.listen(port, function () {
    console.log(`Now listening on port ${port}`);
  });
}

main().catch((err) => {
  console.log(err);
});
