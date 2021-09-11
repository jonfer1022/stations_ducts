import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import percentageRiskierAssetsController from "../controllers/percentageRiskierAssets.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getParetoPercentageRiskierAssets = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await percentageRiskierAssetsController.getParetoPercentageRiskierAssetsCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getParetoPercentageRiskierAssets: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getParetoPercentageRiskierAssets
}