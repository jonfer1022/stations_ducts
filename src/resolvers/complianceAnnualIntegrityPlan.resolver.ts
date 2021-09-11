import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import complianceAnnualIntegrityPlanController from "../controllers/complianceAnnualIntegrityPlan.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableRiskAwareness = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await complianceAnnualIntegrityPlanController.getTableRiskAwarenessCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableRiskAwareness: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableRiskAwareness
}