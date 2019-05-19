/*
https://swapi.co/documentation#planets
https://swapi.co/api/planets/schema
*/

export class Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string; // can be "unknown"
  climate: string;
  terrain: string;
  surface_water: string; // can be "unknown"
  residents: string[];
  films: string[];
  url: string;
  created: Date; // 2014-12-20T20:58:18.421000Z
  edited: Date; // 2014-12-20T20:58:18.421000Z
}
