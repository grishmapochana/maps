import { cities } from "../cities.js";

export async function getCities() {
  try {
    return cities;
  } catch (error) {
    throw error;
  }
}

export async function shortestPath(cities) {
  try {
    const data = findShortestPath(cities);

    return data;
  } catch (error) {
    throw error;
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const radLat1 = (lat1 * Math.PI) / 180;
  const radLon1 = (lon1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const radLon2 = (lon2 * Math.PI) / 180;

  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

function permute(arr) {
  if (arr.length === 0) return [[]];
  const [first, ...rest] = arr;
  const permsWithoutFirst = permute(rest);
  const allPermutations = [];
  permsWithoutFirst.forEach((perm) => {
    for (let i = 0; i <= perm.length; i++) {
      const permutation = [...perm.slice(0, i), first, ...perm.slice(i)];
      allPermutations.push(permutation);
    }
  });
  return allPermutations;
}

function findShortestPath(cities) {
  const allPermutations = permute(cities);

  let shortestPath;
  let shortestDistance = Infinity;

  allPermutations.forEach((permutation) => {
    let totalDistance = 0;

    for (let i = 0; i < permutation.length - 1; i++) {
      const city1 = permutation[i];
      const city2 = permutation[i + 1];

      const distance = calculateDistance(
        city1.lat,
        city1.lon,
        city2.lat,
        city2.lon
      );
      totalDistance += distance;
    }

    if (totalDistance < shortestDistance) {
      shortestDistance = totalDistance;
      shortestPath = permutation;
    }
  });

  return { path: shortestPath, distance: shortestDistance, allPermutations };
}
