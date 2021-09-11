import { ParsedQs } from "qs";
import currentlyRiskCostModel from "../models/currentlyRiskCost.model";

class currentlyRiskCostController {

  static async getTableCurrentlyRiskCostCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await currentlyRiskCostModel.getTableCurrentlyRiskCostDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        
        let lineOutTargetTotal = 0, totalAllLines = 0;
        res.forEach( (item: any) => {
          lineOutTargetTotal += item.lineOutTarget;
          totalAllLines += item.linesTotal;
        });
        res.push({lineOutTargetTotal, totalAllLines});

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableCurrentlyRiskCostCont: ",error);
        reject(error);
      }
    })
  }

}

export default currentlyRiskCostController;