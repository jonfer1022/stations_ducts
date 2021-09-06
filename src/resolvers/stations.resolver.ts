import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import stationsController from "../controllers/stations.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getFilterStations = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await stationsController.getFilterStationsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterStations: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getFilterStations
}