import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import managementFindingsPriController from "../controllers/managementFindingsPri.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableManagementFindingsPri = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await managementFindingsPriController.getTableManagementFindingsPriCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableManagementFindingsPri: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableManagementFindingsPri
}