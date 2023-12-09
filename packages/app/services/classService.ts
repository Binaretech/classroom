import { Class } from 'app/entities/class';
import { UrlFormatter } from 'app/utils/http';
import { useMutation, useQuery } from '@tanstack/react-query';

import axios from 'axios';

export type ClassesResponse = {
  classes: Class[];
};

export type ClassResponse = {
  class: Class;
};

export function useClassList() {
  const query = useQuery({ queryKey: ['class'], queryFn: fetchClassList });

  return query;
}

async function fetchClassList() {
  const url = UrlFormatter.formatUrl('class');

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
  const mutation = useMutation({ mutationFn: joinClass });

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
