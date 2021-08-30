import db from "../config/database";

class reassessmentModel {

  static async getTableReassessmentDB(ducs_id: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            krvcl."KRI1_ReValoracionCicloLargo_id" as "id",
            krvcl.[Begin] as "begin",
            krvcl.[End] as "end",
            krvcl."RiskCategory" as "RiskCategory",
            krvcl."longitud" as "longitud",
            d.ROUTE_NAME as "ducs_name",
            d.Ductos_id as "ducs_id"
          FROM "KRI1_ReValoracionCicloLargo" krvcl
          INNER JOIN "Ductos" d ON d."ROUTE_GUID" = krvcl."TransmissionLineID"
          WHERE d.Ductos_id ${ducs_id ? `= '${ducs_id}'` : 'IS NOT NULL'}
          ORDER BY d.ROUTE_NAME ASC
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableReassessmentDB: ",error);
        reject(error);
      }
    })
  }

}

export default reassessmentModel;