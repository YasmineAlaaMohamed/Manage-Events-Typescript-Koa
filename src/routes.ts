import Router from "koa-router";
import { Context } from 'koa';

import { addUser } from '../src/resources/users';
import jwt from 'jsonwebtoken';
import UserModel from './Models/User';
import {EventModel, TagModel} from './Models';
import { getEvents, createEvent, updateEvent, deleteEvent, viewEvent } from './controllers';
import {authenticate} from './middlewares/authMiddleware'
import { IComment, CommentModel} from './Models/Comment'
import fs from 'fs'
import { jwtDecode } from "jwt-decode";

import bcrypt from 'bcrypt';
export const router = new Router({
  //prefix: '/users'
});

router.post('/register', addUser)
type userInput = {
  email: string,
  password:string
}

type commentInput = {
  content: string,
  userId:string,
  eventId:string,
}

router.get('/events', getEvents);
router.post('/events', createEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);
router.get('/events/:id', viewEvent);

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body as userInput;

    const user = await UserModel.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid credentials' };
        return;
    }

    // Generate JWT token

    ctx.status = 200;
  if (user) {
    const token = jwt.sign({ userId: user._id }, 'YYGGGGGGGGGGG',{"algorithm":"HS256"});
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { message: 'Invalid credentials' };
  }
});


router.get('/events/:tag', async (ctx) => {
  const { tag } = ctx.params;
  const tagg = await TagModel.findOne({ name: tag });

  const events = await EventModel.find({ tags: tagg._id });
  ctx.body = events;
});


router.get('/tags', async (ctx) => {
  const tags = await TagModel.find();
  ctx.body =  { message: `fetched successfully!` , records: tags}
});

interface JwtPayload {
  userId: string
}

router.get('/users/:token', async (ctx) => {
  const { token } = ctx.params;
  const decoded = jwt.verify(token, 'YYGGGGGGGGGGG') as JwtPayload; 
  const user = await UserModel.findById(decoded?.userId); 
  ctx.body = user;
});


router.post('/comments', authenticate, async (ctx) => { 
  const userId = await UserModel.findById(ctx.state.user.userId); 
   const { content, eventId } = ctx.request.body as commentInput; 

   let comment = new CommentModel({
    content,
    userId,
    eventId
  });

   try {
    await comment.save(); 
    ctx.body =  { message: `fetched successfully!`}
    ctx.status = 201;

  } 
  catch (err) { ctx.status = 400; ctx.body = { error: err.message }; } 

  // const token = ctx.request.headers.authorization?.split(' ')[1];
  // const decoded = jwtDecode(token);
  //const existingUser = await UserModel.findOne({ _id : decoded.sub });

  //console.log(existingUser)


  // const newComment = new CommentModel({ content, userId }); 
  // try { await newComment.save(); ctx.status = 201; ctx.body = newComment; 

  // } 
  // catch (err) { ctx.status = 400; ctx.body = { error: err.message }; } 
}); 

router.put('/comments/:id', async (ctx) => {

 //TODO: check permissions

 try { 
  const commentId = ctx.params.id;
  const requestEventData: any = ctx.request.body;

  //Prepare request To avoid saving direct data from user 
  const comment = await CommentModel.findByIdAndUpdate(commentId, requestEventData);
  ctx.body =  { message: `${comment._id} successfully updated!`}
} catch (err) { 
  ctx.status = 400; 
  ctx.body = { error: err.message }; 
} 
});
router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body as userInput;

    const user = await UserModel.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid credentials' };
        return;
    }

    // Generate JWT token

    ctx.status = 200;
  if (user) {
    const token = jwt.sign({ userId: user._id }, 'YYGGGGGGGGGGG',{"algorithm":"HS256"});
    ctx.body = { token };
  } else {
    ctx.status = 401;
    ctx.body = { message: 'Invalid credentials' };
  }
});



router.delete('/comments/:id', async (ctx) => {
  try { 
    const commentId = ctx.params.id;
    const comment = await CommentModel.findById(commentId);
    if (!commentId) {
      ctx.status = 404; 
      ctx.body = { error: 'Record doesn\'t exist' }; 
    } else {
      await CommentModel.findByIdAndDelete(commentId);
      ctx.body =  { message: `successfully deleted!` , records: commentId}
      ctx.status = 200;
    }
   
  } catch (err) { 
    ctx.status = 400; 
    ctx.body = { error: err.message }; 
  } 
});






