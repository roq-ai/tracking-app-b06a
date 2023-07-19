import { FacilityInterface } from 'interfaces/facility';
import { GetQueryInterface } from 'interfaces';

export interface AssetInterface {
  id?: string;
  name: string;
  status: string;
  facility_id?: string;
  created_at?: any;
  updated_at?: any;

  facility?: FacilityInterface;
  _count?: {};
}

export interface AssetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  facility_id?: string;
}
