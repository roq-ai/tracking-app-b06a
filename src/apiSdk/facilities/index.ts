import axios from 'axios';
import queryString from 'query-string';
import { FacilityInterface, FacilityGetQueryInterface } from 'interfaces/facility';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFacilities = async (
  query?: FacilityGetQueryInterface,
): Promise<PaginatedInterface<FacilityInterface>> => {
  const response = await axios.get('/api/facilities', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFacility = async (facility: FacilityInterface) => {
  const response = await axios.post('/api/facilities', facility);
  return response.data;
};

export const updateFacilityById = async (id: string, facility: FacilityInterface) => {
  const response = await axios.put(`/api/facilities/${id}`, facility);
  return response.data;
};

export const getFacilityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/facilities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFacilityById = async (id: string) => {
  const response = await axios.delete(`/api/facilities/${id}`);
  return response.data;
};
