interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Facility Manager', 'Cleaning Staff', 'Asset Manager'],
  tenantName: 'Organization',
  applicationName: 'tracking app',
  addOns: ['chat', 'notifications', 'file'],
};
