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

const getFilterSegments = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await stationsController.getFilterSegmentsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterSegments: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFilterSectors = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await stationsController.getFilterSectorsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterSectors: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFilterDisasterScenarios = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await stationsController.getFilterDisasterScenariosCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterDisasterScenarios: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getFilterStations,
  getFilterSegments,
  getFilterSectors,
  getFilterDisasterScenarios
}