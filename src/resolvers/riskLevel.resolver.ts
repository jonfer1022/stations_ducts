import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import riskLevelController from "../controllers/riskLevel.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableRiskLevelContainers = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await riskLevelController.getTableRiskLevelContainersCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableRiskLevelContainers: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getTableRiskLevelTanks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await riskLevelController.getTableRiskLevelTanksCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableRiskLevelTanks: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getTableRiskLevelPipelines = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await riskLevelController.getTableRiskLevelPipelinesCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableRiskLevelPipelines: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableRiskLevelContainers,
  getTableRiskLevelTanks,
  getTableRiskLevelPipelines
}