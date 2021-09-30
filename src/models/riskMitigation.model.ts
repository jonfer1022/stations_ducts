import db from "../config/database";

class riskMitigationModel {

  static async getTableRiskMitigationContDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            d.ROUTE_NAME as "ducts",
            d1.riskCategory,
            d1.valoration,
            d2.reValoration,
            100 - ((d2.reValoration) / (d1.valoration)) * 100 as "risk_mitigation"
          FROM Ductos d 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              kvcl.RiskCategory as "riskCategory",
              SUM(CAST(kvcl.longitud as FLOAT)) as "valoration"
            FROM KR1_ValoracionCicloLargo kvcl 
            INNER JOIN Ductos d ON d.ROUTE_GUID = kvcl.TransmissionLineID 
            GROUP BY d.ROUTE_NAME, kvcl.RiskCategory
          ) as d1 ON d1.ROUTE_NAME = d.ROUTE_NAME 
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME,
              krvcl.RiskCategory as "riskCategory",
              SUM(CAST(krvcl.longitud as FLOAT)) as "reValoration"
            FROM KRI1_ReValoracionCicloLargo krvcl
            INNER JOIN Ductos d ON d.ROUTE_GUID = krvcl.TransmissionLineID 
            GROUP BY d.ROUTE_NAME, krvcl.RiskCategory
          ) as d2 ON d2.ROUTE_NAME = d.ROUTE_NAME AND d1.riskCategory = d2.riskCategory
          WHERE d1.riskCategory IS NOT NULL
            AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY
            d.ROUTE_NAME,
            d1.riskCategory,
            d1.valoration,
            d2.reValoration
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableRiskMitigationContDB: ",error);
        reject(error);
      }
    })
  }
  
}

export default riskMitigationModel;