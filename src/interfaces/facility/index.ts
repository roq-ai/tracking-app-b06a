import { AssetInterface } from 'interfaces/asset';
import { CleanupInterface } from 'interfaces/cleanup';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface FacilityInterface {
  id?: string;
  name: string;
  status: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  asset?: AssetInterface[];
  cleanup?: CleanupInterface[];
  organization?: OrganizationInterface;
  _count?: {
    asset?: number;
    cleanup?: number;
  };
}

export interface FacilityGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  organization_id?: string;
}
