import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import unmanagedNoticesController from "../controllers/unmanagedNotices.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTableUnmanagedNotices = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await unmanagedNoticesController.getTableUnmanagedNoticesCont(req.query);
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getTableUnmanagedNotices: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getFilterStationsUnmanagedNotices = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await unmanagedNoticesController.getFilterStationsUnmanagedNoticesCont();
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred getFilterStationsUnmanagedNotices: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTableUnmanagedNotices,
  getFilterStationsUnmanagedNotices,
}