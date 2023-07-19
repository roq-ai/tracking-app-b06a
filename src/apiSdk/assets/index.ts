import axios from 'axios';
import queryString from 'query-string';
import { AssetInterface, AssetGetQueryInterface } from 'interfaces/asset';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAssets = async (query?: AssetGetQueryInterface): Promise<PaginatedInterface<AssetInterface>> => {
  const response = await axios.get('/api/assets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAsset = async (asset: AssetInterface) => {
  const response = await axios.post('/api/assets', asset);
  return response.data;
};

export const updateAssetById = async (id: string, asset: AssetInterface) => {
  const response = await axios.put(`/api/assets/${id}`, asset);
  return response.data;
};

export const getAssetById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/assets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAssetById = async (id: string) => {
  const response = await axios.delete(`/api/assets/${id}`);
  return response.data;
};
