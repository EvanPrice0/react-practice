import express, { json } from 'express';
import { MongoClient, Db } from 'mongodb';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import bcrypt from "bcrypt";
const app = express();
const port = 8000;
app.use(express.json())
class User {
  _id!: string;
  username!: string;
  password!: string;
  token?: string;
}
class blogInterface {
  _id!: string;
  name!: string;
  date!: Date;
  content!: string;
  comments?: comment[];
}
class comment {
  _id!: string;
  date!: string;
  user_id!: string;
  blog_id!: string;
  comment!: string;
  responses?: comment[];
}
type blogType = {
  comment: comment;
  blog: blogInterface;

}
const withDB = async (operations: any, res: any) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    const db = client.db('linnet');
    await operations(db);

    client.close();
  }
  catch (err) {
    res.status(500).json({ message: "error connecting to db", err });
  }
}

app.post(`/api/login`, async (req, res) => {
  var body: User = req.body;
  if (body) {
    withDB(async (db: Db) => {
      const user: User = await db.collection('user').findOne({ username: body.username })
      if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
          const accessToken = jwt.sign({ username: user.username }, 'secret');
          var newUser = user
          newUser.token = accessToken
          res.status(200).json(newUser);
        } else {
          res.status(400).json({ error: "Invalid Password" });
        }
      } else {
        res.status(401).json({ error: "User does not exist" });
      }
    }, res);
  }
});


app.get('/api/logins', async (req, res) => {

  withDB(async (db: Db) => {
    const user: User[] = await db.collection('user').find({}).toArray();
    res.status(200).json(user);
  }, res);
});


app.post('/api/signup', async (req, res) => {
  var login: User = req.body;
  const salt = await bcrypt.genSalt(10);
  login.password = await bcrypt.hash(login.password, salt);
  console.log('login', login)
  withDB(async (db: Db) => {
    db.collection('user').insertOne(login);
    const updatedArticleInfo = await db.collection('user').findOne({ _id: login._id })
    res.status(200).json(updatedArticleInfo)
  }, res)
})


app.get('/api/signup/new', async (req, res) => {
  withDB(async (db: Db) => {
    var x = new User()
    x._id = `${Math.floor(Math.random() * Date.now())}`;
    res.status(200).json(x);
  }, res)
})

app.get('/api/blogs', async (req, res) => {
  withDB(async (db: Db) => {
    const blog = await db.collection('blog').find({}).toArray();
    const newBlog = blog.map(x => x.blog)
    console.log(newBlog)
    res.status(200).json(newBlog ?? 'error');
  }, res);
})

app.post('/api/blog', async (req, res) => {
  let blog: blogInterface = req.body
  console.log('blog:', blog)
  withDB(async (db: Db) => {
    db.collection('blog').insertOne(blog);
    const updatedArticleInfo = await db.collection('blog').findOne({ blog: { _id: blog._id } })
    res.status(200).json(updatedArticleInfo)
  }, res)
})

app.put('/api/comment', async (req, res) => {
  let blog: blogType = req.body
  console.log('blog:', blog)
  let newBlog = blog.blog
  newBlog.comments?.push(blog.comment)
  const filter = { "blog._id": newBlog._id }
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: false };
  // create a document that sets the plot of the movie
  const updateDoc = {
    $set: {
      "blog.comments": newBlog.comments
    },
  };
  withDB(async (db: Db) => {
    db.collection('blog').updateOne(filter, updateDoc, options);
    const updatedArticleInfo = await db.collection('blog').find({}).toArray()
    res.status(200).json(updatedArticleInfo)
  }, res)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
