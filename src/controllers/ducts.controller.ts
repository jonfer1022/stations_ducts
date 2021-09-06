import { ParsedQs } from "qs";
import ductsModel from "../models/ducts.model";

class ductsController {

  static async getFilterSectionsCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await ductsModel.getFilterSectionsDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterSectionsCont: ",error);
        reject(error);
      }
    })
  }
  
  static async getFilterSegmentsCont(): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await ductsModel.getFilterSegmentsDB()
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
        const res = await ductsModel.getFilterSectorsDB()
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
        const res = await ductsModel.getFilterDisasterScenariosDB()
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getFilterDisasterScenariosCont: ",error);
        reject(error);
      }
    })
  }

}

export default ductsController;