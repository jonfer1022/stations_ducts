import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import ductsController from "../controllers/ducts.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getFilterSections = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await ductsController.getFilterSectionsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterSections: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFilterSegments = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await ductsController.getFilterSegmentsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterSegments: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFilterSectors = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await ductsController.getFilterSectorsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterSectors: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFilterDisasterScenarios = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await ductsController.getFilterDisasterScenariosCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterDisasterScenarios: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getFilterSections,
  getFilterSegments,
  getFilterSectors,
  getFilterDisasterScenarios
}