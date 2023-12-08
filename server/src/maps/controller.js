import * as service from "./service.js";

export async function getCities(req, res) {
  try {
    const data = await service.getCities();
    return res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function shortestPath(req, res) {
  try {
    const { cities } = req.body;
    const data = await service.shortestPath(cities);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
