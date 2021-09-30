import db from "../config/database";

class disasterRiskModel {

  static async getTableDisasterRiskDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            d.ROUTE_NAME as "ductsName",
            CASE WHEN ked.[Volumen potencial de] IS NOT NULL THEN ked.[Volumen potencial de] ELSE 0 END AS "volumentPotencial",
            SUM(CAST(kff.Value as FLOAT)) as "probabilitySum",
            SUM(CAST(kff.Value as FLOAT)) / 0.0001 as "riskDisaster"
          FROM KRI5_FoF kff
          LEFT JOIN Ductos d ON d.ROUTE_GUID = kff.RouteGUID 
          RIGHT JOIN KRI5_EscenarioDesastre ked ON ked.[No] = kff.XID 
          WHERE kff.Escenario_Desastre <> '' AND CAST(kff.Value as FLOAT) > 0.0001
            AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY d.ROUTE_NAME, ked.[Volumen potencial de]
          ORDER BY d.ROUTE_NAME
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getDisasterRiskDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getTablePercentageDisasterRiskDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            d.ROUTE_NAME as "ductsName",
            CAST(kff.[End] AS DECIMAL(15,3)) as "Xaxis",
            SUM(CAST(kff.Value as FLOAT)) as "Yaxis"
          FROM KRI5_FoF kff
          INNER JOIN Ductos d ON d.ROUTE_GUID = kff.RouteGUID 
          WHERE kff.Escenario_Desastre <> '' AND CAST(kff.Value as FLOAT) > 0.0001
            AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY d.ROUTE_NAME, CAST(kff.[End] AS DECIMAL(15,3))
          ORDER BY d.ROUTE_NAME
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTablePercentageDisasterRiskDB: ",error);
        reject(error);
      }
    })
  }
 
}

export default disasterRiskModel;