import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import currentlyRiskCostController from "../controllers/currentlyRiskCost.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableCurrentlyRiskCost = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await currentlyRiskCostController.getTableCurrentlyRiskCostCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableCurrentlyRiskCost: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableCurrentlyRiskCost
}