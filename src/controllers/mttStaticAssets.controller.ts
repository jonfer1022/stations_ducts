import { ParsedQs } from "qs";
import mttStaticAssetsModel from "../models/mttStaticAssets.model";

class mttStaticAssetsController {

  static async getTableStaticEquipmentMaintenanceCont({ 
    station_id,
    sector,
    segment
  } : ParsedQs): Promise<object> {
    return new Promise( async (resolve, reject) => {
      try {
        const res = await mttStaticAssetsModel.getTableStaticEquipmentMaintenanceDB(
          station_id?.toString(),
          sector?.toString(),
          segment?.toString()
        );

        let totalOrdersCreated = 0, totalOrdersClosed = 0, totalPercentage = 0;
        res.forEach((item: any) => {
          totalOrdersCreated += item.ordersCreated;
          totalOrdersClosed += item.ordersClosed;
        });
        totalPercentage = ((totalOrdersClosed) / (totalOrdersCreated)) * 100;
        res.push({totalOrdersCreated, totalOrdersClosed, totalPercentage});
        
        resolve(res);
      } catch (error) {
        console.error("An error ocurred getTableStaticEquipmentMaintenanceCont: ",error);
        reject(error);
      }
    })
  }
}

export default mttStaticAssetsController;