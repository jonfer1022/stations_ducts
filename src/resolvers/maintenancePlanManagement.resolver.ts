import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import maintenancePlanManagementController from "../controllers/maintenancePlanManagement.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableExecutionVsScheduling = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await maintenancePlanManagementController.getTableExecutionVsSchedulingCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableExecutionVsScheduling: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getMaxExecutionShedulingProgress = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await maintenancePlanManagementController.getMaxExecutionShedulingProgressCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getMaxExecutionShedulingProgress: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableExecutionVsScheduling,
  getMaxExecutionShedulingProgress,
}