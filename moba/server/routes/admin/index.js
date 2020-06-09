module.exports = app => {
    const express = require("express");
    const inflection = require("inflection");
    const multer = require("multer");
    const jwt = require("jsonwebtoken");
    const assert = require('http-assert')
    const User = require("../../models/User");

    const authMiddleware = async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录!')
        const { id } = jwt.verify(token, app.get('secret'))
        assert(id, 401, '请先登录!')
        req.userOne = await User.findById(id)
        assert(req.userOne, 401, '请先登录!')
        await next()
    };

    const resourceMiddleware = async (req, res, next) => {
        const modelName = inflection.classify(req.params.resource);
        req.model = require(`../../models/${modelName}`);
        await next();
    };

    const router = express.Router({
        mergeParams: true
    });

    router.post("/", async (req, res) => {
        const data = await req.model.create(req.body);
        res.send(data);
    });

    router.get("/", async (req, res) => {
        const queryOptions = {};
        if (req.model.modelName === "Category") {
            queryOptions.populate = "parent";
        }
        const data = await req.model.find().setOptions(queryOptions);
        res.send(data);
    });

    router.get("/:id", async (req, res) => {
        const data = await req.model.findById(req.params.id);
        res.send(data);
    });

    router.put("/:id", async (req, res) => {
        const data = await req.model.findByIdAndUpdate(req.params.id, req.body);
        res.send(data);
    });

    router.delete("/:id", async (req, res) => {
        await req.model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    });

    app.use(
        "/admin/api/rest/:resource",
        authMiddleware,
        resourceMiddleware,
        router
    );

    const upload = multer({ dest: __dirname + "/../../upload" });
    app.post("/admin/api/upload", authMiddleware, upload.single("file"), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });

    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body;

        const userOne = await User.findOne({ username }).select("+password");
        assert(userOne, 422, '用户名不存在!')
        const isValid = require("bcryptjs").compareSync(
            password,
            userOne.password
        );
        assert(isValid, 422, '密码错误!')
        const token = jwt.sign({ id: userOne._id }, app.get("secret"));
        res.send({ token });
    });

    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
};
