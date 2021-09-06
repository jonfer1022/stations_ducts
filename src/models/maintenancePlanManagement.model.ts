import db from "../config/database";

class maintenancePlanManagementModel {

  static async getTableExecutionVsSchedulingDB(year: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            kacc.pte_acumulado_eje_fecha as "pte_execution",
            kacc.pte_acumulado_prog_fecha as "pte_scheduled",
            kacc.Fecha as "date"
          FROM [KPI1_ACUMULADO_CIVIL COMPANIA] kacc
          WHERE kacc.Fecha ${year ? `LIKE '%${year}%'`: "IS NOT NULL"}
          ORDER BY kacc.Fecha ASC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableExecutionVsSchedulingDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getMaxExecutionShedulingProgressDB(year: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            MAX(CAST(kacc.pte_acumulado_eje_fecha as FLOAT)) as "max_pte_execution",
            MAX(CAST(kacc.pte_acumulado_prog_fecha as FLOAT)) as "max_pte_scheduled",
            (MAX(CAST(kacc.pte_acumulado_eje_fecha as FLOAT)) / MAX(CAST(kacc.pte_acumulado_prog_fecha as FLOAT))) *100 as "max"
          FROM [KPI1_ACUMULADO_CIVIL COMPANIA] kacc
          WHERE kacc.Fecha ${year ? `LIKE '%${year}%'`: "IS NOT NULL"}
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getMaxExecutionShedulingProgressDB: ",error);
        reject(error);
      }
    })
  }

}

export default maintenancePlanManagementModel;