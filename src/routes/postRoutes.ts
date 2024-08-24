import express from 'express';
import PostController from '../controllers/PostController';
import PostService from '../services/PostService';

const router = express.Router();
const postService = new PostService();
const postController = new PostController(postService);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
