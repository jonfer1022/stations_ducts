import { ParsedQs } from "qs";
import attentionStaticAssestsModel from "../models/attentionStaticAssests.model";

class attentionStaticAssestsController {

  static async getTableNoticesManagedByStationCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await attentionStaticAssestsModel.getTableNoticesManagedByStationDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalNoticesManagement = 0, totalNoticesCreated = 0, totalPercentage = 0;
        res.forEach((item: any) => {
          totalNoticesManagement += item.noticesManagement;
          totalNoticesCreated += item.noticesCreated;
        });
        totalPercentage = ((totalNoticesManagement) / (totalNoticesCreated)) * 100;
        res.push({totalNoticesManagement, totalNoticesCreated, totalPercentage});

        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableNoticesManagedByStationCont: ",error);
        reject(error);
      }
    })
  }
  
}

export default attentionStaticAssestsController;