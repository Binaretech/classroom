import { Class } from 'app/entities/class';
import { UrlFormatter } from 'app/utils/http';
import { useMutation, useQuery } from '@tanstack/react-query';

import axios from 'axios';

export type ClassResponse = {
  data: Class[];
};

export function useClassList() {
  const query = useQuery({ queryKey: ['class'], queryFn: fetchClassList });

  return query;
}

function fetchClassList() {
  const url = UrlFormatter.formatUrl('class');

  return axios.get<ClassResponse>(url);
}

export function useCreateClass() {
  const mutation = useMutation({ mutationFn: createClass });

  return mutation;
}

export type CreateClassBody = {
  name: string;
  description: string;
};

function createClass(body: CreateClassBody) {
  const url = UrlFormatter.formatUrl('class');

  return axios.post<ClassResponse>(url, body);
}

export function useJoinClass() {
  const mutation = useMutation({ mutationFn: joinClass });

  return mutation;
}

export type JoinClassBody = {
  code: string;
};

function joinClass(body: JoinClassBody) {
  const url = UrlFormatter.formatUrl('class/join');

  return axios.post<ClassResponse>(url, body);
}
