import axios from 'axios';
import { Post } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default class PostService {
  getAllPosts = async (): Promise<Post[]> => {
    const response = await axios.get<Post[]>(API_URL);
    return response.data;
  };

  getPostById = async (id: number): Promise<Post> => {
    const response = await axios.get<Post>(`${API_URL}/${id}`);
    return response.data;
  };

  createPost = async (userId: number, title: string, body: string): Promise<Post> => {
    const response = await axios.post<Post>(API_URL, { userId, title, body });
    return response.data;
  };

  updatePost = async (
    id: number,
    userId: number,
    title: string,
    body: string
  ): Promise<Post | number> => {
    try {
      const responseGetById = await axios.get<Post>(`${API_URL}/${id}`);

      if (responseGetById.data) {
        const response = await axios.put<Post>(`${API_URL}/${id}`, {
          userId,
          title,
          body,
        });
        return response.data;
      } else {
        return 404;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return 404;
      }

      return 500;
    }
  };

  deletePost = async (id: number): Promise<number> => {
    try {
      const response = await axios.get<Post>(`${API_URL}/${id}`);

      if (response.data) {
        await axios.delete(`${API_URL}/${id}`);
        return 204;
      } else {
        return 404;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return 404;
      }

      return 500;
    }
  };
}
