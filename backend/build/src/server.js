"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const app = express_1.default();
const port = 8000;
app.use(express_1.default.json());
class User {
}
class blogInterface {
}
class comment {
}
const withDB = (operations, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield mongodb_1.MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('linnet');
        yield operations(db);
        client.close();
    }
    catch (err) {
        res.status(500).json({ message: "error connecting to db", err });
    }
});
app.post(`/api/login`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var body = req.body;
    if (body) {
        withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield db.collection('user').findOne({ username: body.username });
            if (user) {
                // check user password with hashed password stored in the database
                const validPassword = yield bcrypt_1.default.compare(body.password, user.password);
                if (validPassword) {
                    const accessToken = jsonwebtoken_1.default.sign({ username: user.username }, 'secret');
                    var newUser = user;
                    newUser.token = accessToken;
                    res.status(200).json(newUser);
                }
                else {
                    res.status(400).json({ error: "Invalid Password" });
                }
            }
            else {
                res.status(401).json({ error: "User does not exist" });
            }
        }), res);
    }
}));
app.get('/api/logins', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db.collection('user').find({}).toArray();
        res.status(200).json(user);
    }), res);
}));
app.post('/api/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var login = req.body;
    const salt = yield bcrypt_1.default.genSalt(10);
    login.password = yield bcrypt_1.default.hash(login.password, salt);
    console.log('login', login);
    withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
        db.collection('user').insertOne(login);
        const updatedArticleInfo = yield db.collection('user').findOne({ _id: login._id });
        res.status(200).json(updatedArticleInfo);
    }), res);
}));
app.get('/api/signup/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
        var x = new User();
        x._id = `${Math.floor(Math.random() * Date.now())}`;
        res.status(200).json(x);
    }), res);
}));
app.get('/api/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield db.collection('blog').find({}).toArray();
        const newBlog = blog.map(x => x.blog);
        console.log(newBlog);
        res.status(200).json(newBlog !== null && newBlog !== void 0 ? newBlog : 'error');
    }), res);
}));
app.post('/api/blog', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let blog = req.body;
    console.log('blog:', blog);
    withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
        db.collection('blog').insertOne(blog);
        const updatedArticleInfo = yield db.collection('blog').findOne({ blog: { _id: blog._id } });
        res.status(200).json(updatedArticleInfo);
    }), res);
}));
app.put('/api/comment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let blog = req.body;
    console.log('blog:', blog);
    let newBlog = blog.blog;
    (_a = newBlog.comments) === null || _a === void 0 ? void 0 : _a.push(blog.comment);
    const filter = { "blog._id": newBlog._id };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };
    // create a document that sets the plot of the movie
    const updateDoc = {
        $set: {
            "blog.comments": newBlog.comments
        },
    };
    withDB((db) => __awaiter(void 0, void 0, void 0, function* () {
        db.collection('blog').updateOne(filter, updateDoc, options);
        const updatedArticleInfo = yield db.collection('blog').find({}).toArray();
        res.status(200).json(updatedArticleInfo);
    }), res);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
