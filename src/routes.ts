import Router from "koa-router";
import {
	getEvents,
	createEvent,
	updateEvent,
	deleteEvent,
	viewEvent,
	createTags,
	login,
	register,
	getAuthUser,
	saveComment,
	updateComment,
	deleteComment,
	getTags,
	getEventTags,
} from "./controllers";
import { authenticate } from "./middlewares/authMiddleware";

export const router = new Router();

//AUTH ROUTES
router.post("/register", register);
router.post("/login", login);
router.get("/users/:token", authenticate, getAuthUser);

//EVENTS ROUTES
router.get("/events", authenticate, getEvents);
router.post("/events", authenticate, createEvent);
router.put("/events/:id", authenticate, updateEvent);
router.delete("/events/:id", authenticate, deleteEvent);
router.get("/events/:id", authenticate, viewEvent);
router.get("/events/:tag", authenticate, getEventTags);

//TAGS ROUTES
router.post("/tags", authenticate, createTags);
router.get("/tags", authenticate, getTags);

//COMMENTS ROUTES
router.post("/comments", authenticate, saveComment);
router.put("/comments/:id", authenticate, updateComment);
router.delete("/comments/:id", authenticate, deleteComment);
