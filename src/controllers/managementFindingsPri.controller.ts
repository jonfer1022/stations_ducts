import { ParsedQs } from "qs";
import managementFindingsPriModel from "../models/managementFindingsPri.model";

class managementFindingsPriController {

  static async getTableManagementFindingsPriCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await managementFindingsPriModel.getTableManagementFindingsPriDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalManagedFindings = 0, totalAllFindings = 0, totalPercentage = 0;
        res.forEach((item: any) => {
          totalManagedFindings += item.managedFindings;
          totalAllFindings += item.totalFindings;
        });
        totalPercentage = (totalManagedFindings / totalAllFindings) * 100; 
        res.push({totalManagedFindings, totalAllFindings, totalPercentage});

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableManagementFindingsPriCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default managementFindingsPriController;