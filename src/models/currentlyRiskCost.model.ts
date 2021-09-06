import db from "../config/database";

class unmanagedNoticesModel {

  static async getTableCurrentlyRiskCostDB(station_id: string | undefined): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            e.Nombre as "station",
            CAST(c.[Total líneas] as FLOAT) as "linesTotal",
            CAST(c.[Fuera de target] as FLOAT) as "lineOutTarget",
            CASE WHEN (CAST(c.[Total líneas] as FLOAT)) = 0 THEN 0 
            ELSE ((CAST(c.[Fuera de target] as FLOAT)) /(CAST(c.[Total líneas] as FLOAT))) * 100 END as "lineOutTargetPte",
            c.Métrica as "metrica"
          FROM Costo c 
          INNER JOIN Estaciones e ON e.Estacion_ID = c.ESTACIÓN 
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
          ORDER BY "lineOutTarget" DESC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableCurrentlyRiskCostDB: ",error);
        reject(error);
      }
    })
  }
}

export default unmanagedNoticesModel;