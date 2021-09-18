import db from "../config/database";

class currentlyRiskCostModel {

  static async getTableCurrentlyRiskCostDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
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
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
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
  
  static async getActivesCostOutTargetDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            CASE WHEN SUM(CAST(mr.RiesgoUSDYr as FLOAT)) IS NULL THEN 0 ELSE SUM(CAST(mr.RiesgoUSDYr as FLOAT)) END as "riskUsdYr",
            mr.Segmento as "segment"
          FROM matriz_ram mr 
          INNER JOIN Estaciones e on e.Estacion_ID = mr.Estacion
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY mr.Segmento
          ORDER BY "riskUsdYr" DESC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getActivesCostOutTargetDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getMatrizCurrentlyCostRiskDB(
    station_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            CAST(mr.Pof_Cualitativa as FLOAT) + 0.5 as "Xaxis",
            CAST(mr.Cof_Cualitativas as FLOAT) + 0.5 as "Yaxis"
          FROM matriz_ram mr 
          INNER JOIN Estaciones e on e.Estacion_ID = mr.Estacion 
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
            AND e.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND e.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}          
          GROUP BY mr.Pof_Cualitativa , mr.Cof_Cualitativas
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getMatrizCurrentlyCostRiskDB: ",error);
        reject(error);
      }
    })
  }
}

export default currentlyRiskCostModel;