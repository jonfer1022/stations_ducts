import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import riskCostReductionController from "../controllers/riskCostReduction.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableAverageCostSeccions = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await riskCostReductionController.getTableAverageCostSeccionsCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableAverageCostSeccions: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableAverageCostSeccions
}