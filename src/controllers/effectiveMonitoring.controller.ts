import { ParsedQs } from "qs";
import effectiveMonitoringModel from "../models/effectiveMonitoring.model";

class effectiveMonitoringController {

  static async getTableEffectiveMonitoringCont({ 
    sector
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await effectiveMonitoringModel.getTableEffectiveMonitoringDB(sector)

        let materializedTotal = 0, monitoringTotal = 0;
        res.forEach( (item: any)  => {
          materializedTotal += item.materializedCost;
          monitoringTotal += item.monitoringCost;
        });
        let monitoringEffectivenessTotal = materializedTotal / monitoringTotal;
        res.push({monitoringEffectivenessTotal})
        
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableEffectiveMonitoringCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableMaterializedVsMonitoringCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await effectiveMonitoringModel.getTableMaterializedVsMonitoringDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableMaterializedVsMonitoringCont: ",error);
        reject(error);
      }
    })
  }

}

export default effectiveMonitoringController;