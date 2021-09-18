import { ParsedQs } from "qs";
import integrityFindingsModel from "../models/integrityFindings.model";

class integrityFindingsController {

  static async getTableIntegrityFindingsCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await integrityFindingsModel.getTableIntegrityFindingsDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        
        let total = { totalIntegrity: 0, totalInspection: 0, totalMaintenance: 0, totalReg: 0 };
        res.forEach((item: any) => {
          total.totalIntegrity += item.integrity;
          total.totalInspection += item.inspection;
          total.totalMaintenance += item.maintenance;
          total.totalReg += item.total;
        });
        res.push(total)

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableIntegrityFindingsCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getFindigsClosedCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await integrityFindingsModel.getFindigsClosedDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFindigsClosedCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getPercentageFindigsClosedCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await integrityFindingsModel.getPercentageFindigsClosedDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getPercentageFindigsClosedCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getPercentageFindingsClosedByGroupCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await integrityFindingsModel.getPercentageFindingsClosedByGroupDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getPercentageFindingsClosedByGroupCont: ",error);
        reject(error);
      }
    })
  }

}

export default integrityFindingsController;