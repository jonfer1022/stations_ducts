import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import disasterRiskController from "../controllers/disasterRisk.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableDisasterRisk = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await disasterRiskController.getDisasterRiskCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getDisasterRisk: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableDisasterRisk
}