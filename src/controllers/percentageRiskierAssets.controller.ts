import { ParsedQs } from "qs";
import percentageRiskierAssetsModel from "../models/percentageRiskierAssets.model";

class percentageRiskierAssetsController {

  static async getParetoPercentageRiskierAssetsCont({ 
    station_id
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await percentageRiskierAssetsModel.getParetoPercentageRiskierAssetsDB(station_id?.toString())

        let accomplish = 0;
        if(station_id) {
          for (const item of res) {
            if(item.accumulatedRisk >= item.limitPareto) {
              accomplish = item.percentage;
              break;
            }
          }
          res.push({accomplish});
        }

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getParetoPercentageRiskierAssetsCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default percentageRiskierAssetsController;