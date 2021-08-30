import { ParsedQs } from "qs";
import unmanagedNoticesModel from "../models/unmanagedNotices.model";

class unmanagedNoticesController {

  static async getTableUnmanagedNoticesCont({ 
    station_id
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await unmanagedNoticesModel.getTableUnmanagedNoticesDB(station_id)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableUnmanagedNoticesCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterStationsUnmanagedNoticesCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await unmanagedNoticesModel.getFilterStationsUnmanagedNoticesDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterStationsUnmanagedNoticesCont: ",error);
        reject(error);
      }
    })
  }

}

export default unmanagedNoticesController;