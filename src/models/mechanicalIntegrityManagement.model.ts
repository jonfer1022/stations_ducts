import db from "../config/database";

class mechanicalIntegrityManagementModel {

  static async getTableMechanicalIntegrityManagementDB(
    ducts_id: string | undefined,
    sector: string | undefined,
    segment: string | undefined
    ): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            d.ROUTE_NAME as "ducts_name" ,
            COUNT(CAST(kp.Aviso as FLOAT)) as "ilicitClosed",
            ki1.ilicitIdentified,
            ((COUNT(CAST(kp.Aviso as FLOAT)))/(CAST(ki1.ilicitIdentified as FLOAT))) * 100 as "percentageIlicit"
          FROM KRI2_PM01 kp
          INNER JOIN KRI2_IW69_01 ki ON ki.Aviso = kp.Aviso 
          INNER JOIN Ductos d ON d.PREFIJO = ki.[Ubicación técnica]
          LEFT JOIN (
            SELECT 
              d.ROUTE_NAME as "ducts_name",
              COUNT(CAST(ki.Aviso as FLOAT)) as "ilicitIdentified"
            FROM KRI2_IW69_01 ki
            INNER JOIN Ductos d ON d.PREFIJO = ki.[Ubicación técnica] 
            WHERE ki.[Sintoma de averia] = 'ILICITA'
              AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
              AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
              AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
            GROUP BY d.ROUTE_NAME
          ) as ki1 ON ki1.ducts_name = d.ROUTE_NAME 
          WHERE ki.[Sintoma de averia] = 'ILICITA'
            AND d.Ductos_id ${ducts_id ? `= '${ducts_id}'`: "IS NOT NULL"}
            AND d.SECTOR ${sector ? `= '${sector}'`: "IS NOT NULL"}
            AND d.SEGMENTO ${segment ? `= '${segment}'`: "IS NOT NULL"}
          GROUP BY d.ROUTE_NAME, ki1.ilicitIdentified
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getMechanicalIntegrityManagementDB: ",error);
        reject(error);
      }
    })
  }
 
}

export default mechanicalIntegrityManagementModel;