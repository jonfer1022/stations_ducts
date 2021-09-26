import db from "../config/database";

class riskCostReductionModel {

  static async getDataManagementRoutineActivitiesDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            p.ZONA as "zone",
            p.Aviso as "notice",
            p.Denominación as "denomination",
            i.[Fecha de aviso] as "noticeDate",
            CASE WHEN p1.denominator IS NOT NULL THEN p1.denominator ELSE 0 END "closedMaintenance",
            CASE WHEN p2.numerator IS NOT NULL THEN p2.numerator ELSE 0 END "scheduledMaintenance",
            ((CASE WHEN p2.numerator IS NOT NULL THEN p2.numerator ELSE 0 END) / (CASE WHEN p1.denominator IS NOT NULL THEN p1.denominator ELSE 0 END)) * 100 as "routineActivities"
          FROM PM01 p 
          LEFT JOIN (
            SELECT
              p.Aviso,
              COUNT(p.IW_69) as "denominator"
            FROM PM01 p
            GROUP BY p.Aviso
          ) as p1 ON p1.Aviso = p.Aviso 
          LEFT JOIN (
            SELECT
              p.Aviso,
              COUNT(p.IW_69) as "numerator"
            FROM PM01 p
            WHERE p.[Fe#fin extrema] <> ''
            GROUP BY p.Aviso
          ) as p2 ON p2.Aviso = p.Aviso 
          INNER JOIN IW69 i ON i.Aviso = p.Aviso 
          GROUP BY 
            p.ZONA,
            p.Aviso,
            p.Denominación,
            p1.denominator,
            p2.numerator,
            i.[Fecha de aviso] 
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getDataManagementRoutineActivitiesDB: ",error);
        reject(error);
      }
    })
  }

}

export default riskCostReductionModel;