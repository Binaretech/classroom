import { UrlFormatter } from 'app/utils/http';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from 'app/entities/post';

export type PostsResponse = {
  posts: Post[];
  count: number;
};

export type PostResponse = {
  post: Post;
};

export function usePostList(classId: number | string) {
  const query = useInfiniteQuery({
    queryKey: ['posts', classId],
    queryFn: ({ pageParam }) => fetchPostList(classId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, page) =>
      lastPage.count / 10 > page ? page + 1 : undefined,
  });

  return query;
}

async function fetchPostList(id: number | string, page = 1) {
  const url = UrlFormatter.formatUrl(`class/${id}/posts`, {
    queryParams: {
      page,
    },
  });

  const response = await axios.get<PostsResponse>(url);

  return response.data;
}
