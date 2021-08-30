import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import ductsController from "../controllers/ducts.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getFilterSections = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await ductsController.getFilterSectionsCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterSections: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getFilterSections,
}