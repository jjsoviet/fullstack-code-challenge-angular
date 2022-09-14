export interface Location {
  latitude: number;
  longitude: number;
  region: string;
  region_code: string;
  city: string;
}

export const generateMockLocation = (): Location => ({
  latitude: 0,
  longitude: 0,
  region: 'Region',
  region_code: 'region_code',
  city: 'City',
});
