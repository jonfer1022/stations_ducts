import db from "../config/database";

class riskCostReductionModel {

  static async getTableAverageCostSeccionsDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
  ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            d.ROUTE_NAME,
            CAST(kvcl1.averageCostsHVH as FLOAT) / (SUM(CAST(kvcl.longitud as FLOAT))) as "averageCostsHVH",
            (SUM(CAST(kvcl.RiskValue as FLOAT))) / (SUM(CAST(kvcl.longitud as FLOAT))) as "averageCosts",
            (kvcl1.averageCostsHVH / (SUM(CAST(kvcl.longitud as FLOAT)))) /
            ((SUM(CAST(kvcl.RiskValue as FLOAT))) / (SUM(CAST(kvcl.longitud as FLOAT)))) * 100 as "reducedCostRisk"
          FROM KRI4_ValoracionCicloLargo kvcl 
          INNER JOIN Ductos d ON d.ROUTE_GUID = kvcl.RouteGUID  
          LEFT JOIN (
            SELECT
              d.ROUTE_NAME,
              SUM(CAST(kvcl.RiskValue as FLOAT)) as "averageCostsHVH"
            FROM KRI4_ValoracionCicloLargo kvcl
            INNER JOIN Ductos d ON d.ROUTE_GUID = kvcl.RouteGUID
            WHERE kvcl.RiskCategory IN ('H','VH')
              AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as kvcl1 ON kvcl1.ROUTE_NAME = d.ROUTE_NAME 
          WHERE d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY d.ROUTE_NAME, kvcl1.averageCostsHVH
          ORDER BY reducedCostRisk
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableAverageCostSeccionsDB: ",error);
        reject(error);
      }
    })
  }

}

export default riskCostReductionModel;