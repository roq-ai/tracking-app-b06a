const mapping: Record<string, string> = {
  assets: 'asset',
  cleanups: 'cleanup',
  facilities: 'facility',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
