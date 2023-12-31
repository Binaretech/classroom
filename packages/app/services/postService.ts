import { UrlFormatter } from 'app/utils/http';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
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

export function usePost(id: number | string) {
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  });

  return query;
}

async function fetchPost(id: number | string) {
  const url = UrlFormatter.formatUrl(`post/${id}`);

  const response = await axios.get<PostResponse>(url);

  return response.data;
}

export type CreatePostData = {
  content: string;
};

export function useCreatePost(classId: number | string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreatePostData) => createPost(data, classId),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['posts', classId],
        (oldData: InfiniteData<PostsResponse, unknown>) => {
          const [page = [], ...rest] = oldData.pages;

          const firstPage = (page as PostsResponse) ?? { posts: [], count: 0 };

          return {
            pages: [
              {
                posts: [data, ...firstPage.posts],
                count: firstPage.count + 1,
              },
              ...rest,
            ],
            pageParams: [...oldData.pageParams],
          };
        }
      );
    },
  });

  return mutation;
}

async function createPost(data: CreatePostData, classId: number | string) {
  const url = UrlFormatter.formatUrl(`class/${classId}/posts`);

  console.log(url);

  const response = await axios.post<PostResponse>(url, data);

  return response.data;
}
