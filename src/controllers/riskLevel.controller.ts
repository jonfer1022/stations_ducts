import { ParsedQs } from "qs";
import riskLevelgModel from "../models/riskLevel.model";

class riskLevelController {

  static async getTableRiskLevelContainersCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await riskLevelgModel.getTableRiskLevelContainersDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalLowCont = 0, totalLowEquipCont = 0;
        let totalmiddleCont = 0, totalmiddleEquipCont = 0;
        let totalHighCont = 0, totalHighEquipCont = 0;
        let totalVHighCont = 0, totalVHighEquipCont = 0;
        res.forEach((item: any) => {
          totalLowEquipCont += item.riskLevel === 'Medio - Bajo' ? item.numberEquipments : 0;
          totalLowCont += item.riskLevel === 'Medio - Bajo' ? item.totalEquipments : 0;
          totalmiddleCont += item.riskLevel === 'Intermedio' ? item.numberEquipments : 0;
          totalmiddleEquipCont += item.riskLevel === 'Intermedio' ? item.totalEquipments : 0;
          totalHighCont += item.riskLevel === 'Alto' ? item.numberEquipments : 0;
          totalHighEquipCont += item.riskLevel === 'Alto' ? item.totalEquipments : 0;
          totalVHighCont += item.riskLevel === 'Muy Alto' ? item.numberEquipments : 0;
          totalVHighEquipCont += item.riskLevel === 'Muy Alto' ? item.totalEquipments : 0;
        });
        res.push({
          percentageLow: (totalLowEquipCont / totalLowCont) * 100,
          percentageMid: (totalmiddleCont / totalmiddleEquipCont) * 100,
          percentageHigh: (totalHighCont / totalHighEquipCont) * 100,
          percentageVHigh: (totalVHighCont / totalVHighEquipCont) * 100
        })
        
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableRiskLevelContainersCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableRiskLevelTanksCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await riskLevelgModel.getTableRiskLevelTanksDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalLowTanks = 0, totalLowEquipTanks = 0;
        let totalmiddleTanks = 0, totalmiddleEquipTanks = 0;
        let totalHighTanks = 0, totalHighEquipTanks = 0;
        let totalVHighTanks = 0, totalVHighEquipTanks = 0;
        res.forEach((item: any) => {
          totalLowEquipTanks += item.riskLevel === 'Medio - Bajo' ? item.numberEquipments : 0;
          totalLowTanks += item.riskLevel === 'Medio - Bajo' ? item.totalEquipments : 0;
          totalmiddleTanks += item.riskLevel === 'Intermedio' ? item.numberEquipments : 0;
          totalmiddleEquipTanks += item.riskLevel === 'Intermedio' ? item.totalEquipments : 0;
          totalHighTanks += item.riskLevel === 'Alto' ? item.numberEquipments : 0;
          totalHighEquipTanks += item.riskLevel === 'Alto' ? item.totalEquipments : 0;
          totalVHighTanks += item.riskLevel === 'Muy Alto' ? item.numberEquipments : 0;
          totalVHighEquipTanks += item.riskLevel === 'Muy Alto' ? item.totalEquipments : 0;
        });
        res.push({
          percentageLow: (totalLowEquipTanks / totalLowTanks) * 100,
          percentageMid: (totalmiddleTanks / totalmiddleEquipTanks) * 100,
          percentageHigh: (totalHighTanks / totalHighEquipTanks) * 100,
          percentageVHigh: (totalVHighTanks / totalVHighEquipTanks) * 100
        })
        
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableRiskLevelTanksCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableRiskLevelPipelinesCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await riskLevelgModel.getTableRiskLevelPipelinesDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalLowPip = 0, totalLowEquipPip = 0;
        let totalmiddlePip = 0, totalmiddleEquipPip = 0;
        let totalHighPip = 0, totalHighEquipPip = 0;
        let totalVHighPip = 0, totalVHighEquipPip = 0;
        res.forEach((item: any) => {
          totalLowEquipPip += item.riskLevel === 'Medio - Bajo' ? item.numberEquipments : 0;
          totalLowPip += item.riskLevel === 'Medio - Bajo' ? item.totalEquipments : 0;
          totalmiddlePip += item.riskLevel === 'Intermedio' ? item.numberEquipments : 0;
          totalmiddleEquipPip += item.riskLevel === 'Intermedio' ? item.totalEquipments : 0;
          totalHighPip += item.riskLevel === 'Alto' ? item.numberEquipments : 0;
          totalHighEquipPip += item.riskLevel === 'Alto' ? item.totalEquipments : 0;
          totalVHighPip += item.riskLevel === 'Muy Alto' ? item.numberEquipments : 0;
          totalVHighEquipPip += item.riskLevel === 'Muy Alto' ? item.totalEquipments : 0;
        });
        res.push({
          percentageLow: (totalLowEquipPip / totalLowPip) * 100,
          percentageMid: (totalmiddlePip / totalmiddleEquipPip) * 100,
          percentageHigh: (totalHighPip / totalHighEquipPip) * 100,
          percentageVHigh: (totalVHighPip / totalVHighEquipPip) * 100
        })
        
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableRiskLevelPipelinesCont: ",error);
        reject(error);
      }
    })
  }

}

export default riskLevelController;