import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import effectiveMonitoringController from "../controllers/effectiveMonitoring.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableEffectiveMonitoring = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await effectiveMonitoringController.getTableEffectiveMonitoringCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableEffectiveMonitoring: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getTableMaterializedVsMonitoring = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await effectiveMonitoringController.getTableMaterializedVsMonitoringCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableMaterializedVsMonitoring: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableEffectiveMonitoring,
  getTableMaterializedVsMonitoring
}