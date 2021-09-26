import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import riskMitigationController from "../controllers/riskMitigation.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableRiskMitigation = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await riskMitigationController.getTableRiskMitigationCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableRiskMitigation: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableRiskMitigation
}