import { ParsedQs } from "qs";
import maintenancePlanManagementModel from "../models/maintenancePlanManagement.model";

class maintenancePlanManagementController {

  static async getTableExecutionVsSchedulingCont({ 
    year
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await maintenancePlanManagementModel.getTableExecutionVsSchedulingDB(year)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableExecutionVsSchedulingCont: ",error);
        reject(error);
      }
    })
  }

  static async getMaxExecutionShedulingProgressCont({ 
    year
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await maintenancePlanManagementModel.getMaxExecutionShedulingProgressDB(year)
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getMaxExecutionShedulingProgressCont: ",error);
        reject(error);
      }
    })
  }

}

export default maintenancePlanManagementController;