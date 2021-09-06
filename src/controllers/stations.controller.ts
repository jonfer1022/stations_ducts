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
  
}

export default stationsController;