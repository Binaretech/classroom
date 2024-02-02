import { Class } from 'app/entities/class';
import { UrlFormatter } from 'app/utils/http';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axios, { AxiosError } from 'axios';
import { Member } from 'app/entities/members';

export type ClassesResponse = {
  classes: Class[];
  count: number;
};

export type ClassResponse = {
  class: Class;
};

export function useClassList() {
  const query = useInfiniteQuery({
    queryKey: ['classes'],
    queryFn: ({ pageParam }) => fetchClassList(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, page) =>
      lastPage.count / 10 > page ? page + 1 : undefined,
  });

  return query;
}

async function fetchClassList(page: number = 1) {
  const url = UrlFormatter.formatUrl('class', {
    queryParams: { page },
  });

  const response = await axios.get<ClassesResponse>(url);

  return response.data;
}

export function useClass(id: number | string) {
  const query = useQuery({ queryKey: ['class', id], queryFn: () => fetchClass(id) });

  return query;
}

async function fetchClass(id: number | string) {
  const url = UrlFormatter.formatUrl(`class/${id}`);

  const response = await axios.get<Class>(url);

  return response.data;
}

export function useCreateClass() {
  const mutation = useMutation({ mutationFn: createClass });

  return mutation;
}

export type CreateClassBody = {
  name: string;
  description: string;
  section?: string;
};

async function createClass(body: CreateClassBody) {
  const url = UrlFormatter.formatUrl('class');

  const response = await axios.post<ClassResponse>(url, body);

  return response.data;
}

export function useJoinClass() {
  const mutation = useMutation({
    mutationFn: joinClass,
  });

  return mutation;
}

export type JoinClassBody = {
  code: string;
};

async function joinClass(body: JoinClassBody) {
  const url = UrlFormatter.formatUrl('class/join');

  const response = await axios.post<ClassResponse>(url, body);

  return response.data;
}

export type MembersResponse = {
  members: Member[];
  count: number;
};

export function useMembersList(id: number | string) {
  const query = useInfiniteQuery({
    queryKey: ['class', id, 'members'],
    queryFn: ({ pageParam }) => fetchMembersList(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, page) =>
      lastPage.count / 10 > page ? page + 1 : undefined,
  });

  return query;
}

async function fetchMembersList(id: number | string, page = 1) {
  const url = UrlFormatter.formatUrl(`class/${id}/members`, {
    queryParams: { page },
  });

  const response = await axios.get<MembersResponse>(url);

  return response.data;
}

export function useUpdateClass(id: number | string) {
  const mutation = useMutation({ mutationFn: (body: UpdateClassBody) => updateClass(id, body) });

  return mutation;
}

export type UpdateClassBody = {
  name?: string;
  description?: string;
  section?: string;
};

async function updateClass(id: number | string, body: UpdateClassBody) {
  const url = UrlFormatter.formatUrl(`class/${id}`);

  const response = await axios.put<ClassResponse>(url, body);

  return response.data;
}

export function useResetClassCode(id: number | string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => resetClassCode(id),
    onSuccess: (data: Class) => {
      queryClient.setQueryData(['class', id], data);
    },
  });

  return mutation;
}

async function resetClassCode(id: number | string) {
  const url = UrlFormatter.formatUrl(`class/${id}/reset-code`);

  const response = await axios.post<Class>(url);

  return response.data;
}

export type ClassInviteBody = {
  email: string;
};

export function useSendClassInvite(id: number | string) {
  const mutation = useMutation({
    mutationFn: (body: ClassInviteBody) => inviteToClass(id, body),
  });

  return mutation;
}

async function inviteToClass(id: number | string, body: ClassInviteBody) {
  const url = UrlFormatter.formatUrl(`class/${id}/invite`);

  const response = await axios.post(url, body);

  return response.data;
}

export function useJoinByInvitation(classId: string | number) {
  const mutation = useMutation({
    mutationFn: (code: string) => joinByInvitation(classId, code),
    onError: (error: AxiosError<{ message: string }>) => {
      return error.response?.data?.message;
    },
  });

  return mutation;
}

async function joinByInvitation(classId: string | number, code: string) {
  const url = UrlFormatter.formatUrl(`class/${classId}/join`);

  const response = await axios.post<ClassResponse>(url, { code });

  return response.data;
}
