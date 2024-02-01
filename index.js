// mongodb+srv://admin:<password>@cluster0.9fnxnck.mongodb.net/?retryWrites=true&w=majority
// Chicony134...

import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './utils/checkAuth.js';
// import { register, login, getMe } from './controllers/UserController.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

mongoose
.connect('mongodb+srv://admin:wwwwww@cluster0.9fnxnck.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

// app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.get('/posts', PostController.remove);
// app.get('/posts', PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
})
