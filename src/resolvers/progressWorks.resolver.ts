import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import progressWorksController from "../controllers/progressWorks.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableProgressWorks = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await progressWorksController.getTableProgressWorksCont(req.query);
    res.status(OK).json({ result })
  } catch (error) {
    console.error("An error ocurred getTableProgressWorks: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableProgressWorks,
}