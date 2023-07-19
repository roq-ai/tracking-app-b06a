import axios from 'axios';
import queryString from 'query-string';
import { CleanupInterface, CleanupGetQueryInterface } from 'interfaces/cleanup';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCleanups = async (query?: CleanupGetQueryInterface): Promise<PaginatedInterface<CleanupInterface>> => {
  const response = await axios.get('/api/cleanups', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCleanup = async (cleanup: CleanupInterface) => {
  const response = await axios.post('/api/cleanups', cleanup);
  return response.data;
};

export const updateCleanupById = async (id: string, cleanup: CleanupInterface) => {
  const response = await axios.put(`/api/cleanups/${id}`, cleanup);
  return response.data;
};

export const getCleanupById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cleanups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCleanupById = async (id: string) => {
  const response = await axios.delete(`/api/cleanups/${id}`);
  return response.data;
};
