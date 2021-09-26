import { ParsedQs } from "qs";
import managementRoutineActivitiesModel from "../models/managementRoutineActivities.model";

class managementRoutineActivitiesController {

  static async getDataManagementRoutineActivitiesCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res: Array<object> = await managementRoutineActivitiesModel.getDataManagementRoutineActivitiesDB();

        let scheduledOrders = 0, closedOrders = 0;

        res.forEach((item:any) => {
          scheduledOrders += item.closedMaintenance;
          closedOrders += item.scheduledMaintenance;
        });
        
        res.push({ 
          scheduledOrders: closedOrders, 
          closedOrders: scheduledOrders, 
          percentagesRoutineActivities: ((closedOrders)/(scheduledOrders)) * 100
        })

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getDataManagementRoutineActivitiesCont: ",error);
        reject(error);
      }
    })
  }

}

export default managementRoutineActivitiesController;