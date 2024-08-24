import { Request, Response } from 'express';
import PostService from '../services/PostService';

export default class PostController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch {
      res.status(500).json({ error: 'Houve um erro!' });
    }
  };

  getPostById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const post = await this.postService.getPostById(Number(id));
      res.status(200).json(post);
    } catch {
      res.status(500).json({ error: 'Houve um erro!' });
    }
  };

  createPost = async (req: Request, res: Response): Promise<void> => {
    const { userId, title, body } = req.body;

    try {
      const newPost = await this.postService.createPost(userId, title, body);
      res.status(201).json(newPost);
    } catch {
      res.status(500).json({ error: 'Houve um erro!' });
    }
  };

  updatePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { userId, title, body } = req.body;

    try {
      // eslint-disable-next-line prettier/prettier
      const updatedPost = await this.postService.updatePost(Number(id), userId, title, body);

      if (typeof updatedPost === 'object') {
        res.status(200).json(updatedPost);
      } else if (updatedPost === 404) {
        res.status(404).json({ error: 'Esse post não existe!' });
      } else {
        // eslint-disable-next-line prettier/prettier
        res.status(500).json({ error: 'Houve um erro ao tentar deletar o post.' });
      }
    } catch {
      res.status(500).json({ error: 'Houve um erro!' });
    }
  };

  deletePost = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      const statusCode = await this.postService.deletePost(Number(id));

      if (statusCode === 204) {
        res.status(204).end();
      } else if (statusCode === 404) {
        res.status(404).json({ error: 'Esse post não existe!' });
      } else {
        // eslint-disable-next-line prettier/prettier
        res.status(500).json({ error: 'Houve um erro ao tentar deletar o post.' });
      }
    } catch {
      res.status(500).json({ error: 'Houve um erro!' });
    }
  };
}
