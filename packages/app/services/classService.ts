import { Class } from 'app/entities/class';
import { UrlFormatter } from 'app/utils/http';
import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

export type ClassResponse = {
  data: Class[];
};

export default function useClassList() {
  const query = useQuery({ queryKey: ['class'], queryFn: fetchClassList });

  return query;
}

function fetchClassList() {
  const url = UrlFormatter.formatUrl('class');

  return axios.get<ClassResponse>(url);
}
