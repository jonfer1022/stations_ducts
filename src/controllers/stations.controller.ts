import { ParsedQs } from "qs";
import stationsModel from "../models/stations.model";

class stationsController {

  static async getFilterStationsCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await stationsModel.getFilterStationsDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterStationsCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterSegmentsCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await stationsModel.getFilterSegmentsDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterSegmentsCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterSectorsCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await stationsModel.getFilterSectorsDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterSectorsCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterDisasterScenariosCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await stationsModel.getFilterDisasterScenariosDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterDisasterScenariosCont: ",error);
        reject(error);
      }
    })
  }

}

export default stationsController;