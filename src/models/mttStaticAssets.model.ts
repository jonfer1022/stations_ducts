import db from "../config/database";

class mttStaticAssetsModel {

  static async getTableStaticEquipmentMaintenanceDB(
    station_id: string | undefined,
    sector: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            e.Nombre as "station",
            CAST(mae.[ORDENES CREADAS] as FLOAT) as "ordersCreated",
            CAST(mae.[ORDENES CERRADAS - VoBo] as FLOAT) as "ordersClosed",
            CAST(mae.[% Avance] as FLOAT) * 100 as "advance",
            mae.Clasificación as "metrics"
          FROM [MMT_Activo Estatico] mae 
          INNER JOIN Estaciones e on e.Estacion_ID = mae.ESTACIÓN 
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"}
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
          ORDER BY e.Nombre
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableStaticEquipmentMaintenanceDB: ",error);
        reject(error);
      }
    })
  }
}

export default mttStaticAssetsModel;