import { UrlFormatter } from 'app/utils/http';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from 'app/entities/post';

export type PostsResponse = {
  posts: Post[];
};

export type PostResponse = {
  post: Post;
};

export function usePostList(classId: number | string) {
  const query = useQuery({ queryKey: ['posts', classId], queryFn: () => fetchPostList(classId) });

  return query;
}

async function fetchPostList(id: number | string) {
  const url = UrlFormatter.formatUrl(`class/${id}/posts`);

  const response = await axios.get<PostsResponse>(url);

  return response.data;
}
