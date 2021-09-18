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
  
  static async getActivesCostOutTargetCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await currentlyRiskCostModel.getActivesCostOutTargetDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        
        let totalRiskUsdYr = 0;
        res.forEach( (item: any) => { totalRiskUsdYr += item.riskUsdYr });
        res.push({ totalRiskUsdYr });

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getActivesCostOutTargetCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getMatrizCurrentlyCostRiskCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs ): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await currentlyRiskCostModel.getMatrizCurrentlyCostRiskDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getMatrizCurrentlyCostRiskCont: ",error);
        reject(error);
      }
    })
  }

}

export default currentlyRiskCostController;