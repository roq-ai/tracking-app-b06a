import { FacilityInterface } from 'interfaces/facility';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CleanupInterface {
  id?: string;
  status: string;
  facility_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  facility?: FacilityInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CleanupGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  facility_id?: string;
  user_id?: string;
}
