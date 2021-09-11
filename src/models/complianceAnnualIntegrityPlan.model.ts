import db from "../config/database";

class complianceAnnualIntegrityPlanModel {

  static async getTableRiskAwarenessDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            cpadi.Actividad as "activity",
            CAST(cpadi.Ejecutado_al_mes_de_corte AS FLOAT) * 100 as "executedCutOffMonth",
            CAST(cpadi.Proyectado_al_mes_de_corte as FLOAT) * 100 as "projecedCutOfftMonth",
            CAST(cpadi.[_Avance] as FLOAT) * 100 as "advance",
            cpadi.Metrica as "metrics",
            cpadi.Programadas as "scheduled",
            cpadi.En_Ejecucion as "inExecuting" 
          FROM cumplimiento_plan_anual_de_integridad cpadi
          ORDER BY cpadi.Actividad
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableRiskAwarenessDB: ",error);
        reject(error);
      }
    })
  }
  
}

export default complianceAnnualIntegrityPlanModel;