import db from "../config/database";

class effectiveMonitoringModel {

  static async getTableEffectiveMonitoringDB(sector: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            kii.Sector as "sector",
            _kicfe.suma_costo_materializado_cli + SUM(CAST(kii.[Costo EVITADO para Ocensa (USD) si evento materializado] as FLOAT)) as "materializedCost",
            _kicfe.suma_costo_monitoreo_cli + SUM(CAST(kii.[Costo Monitoreo de detección evento (USD)] as FLOAT)) as "monitoringCost",
            ((_kicfe.suma_costo_materializado_cli + SUM(CAST(kii.[Costo EVITADO para Ocensa (USD) si evento materializado] as FLOAT)))/
            (_kicfe.suma_costo_monitoreo_cli + SUM(CAST(kii.[Costo Monitoreo de detección evento (USD)] as FLOAT)))) as "monitoringEffectiveness"
          FROM [KPI4_Indicador Interferencias] kii 
          LEFT JOIN (
            SELECT
            SUM(CAST(kicfe.[Costo EVITADO para Ocensa (USD) si evento materializado] as FLOAT)) as "suma_costo_materializado_cli",
            SUM(CAST(kicfe.[Costo Monitoreo de detección evento (USD)] as FLOAT)) as "suma_costo_monitoreo_cli",
            kicfe.Sector 
            FROM [KPI4_Indicador Clima_Fzas Ext] kicfe
            GROUP BY kicfe.Sector
          ) as _kicfe ON _kicfe.Sector = kii.Sector
          WHERE kii.Sector ${sector ? `= '${sector}'`: "IS NOT NULL"} 
          GROUP BY kii.Sector, _kicfe.suma_costo_materializado_cli, _kicfe.suma_costo_monitore_cli
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableEffectiveMonitoringDB: ",error);
        reject(error);
      }
    })
  }
  
  static async getTableMaterializedVsMonitoringDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            SUM(CAST(kii.[Costo EVITADO para Ocensa (USD) si evento materializado] as FLOAT)) as "materializedCostInterference",
            SUM(CAST(kii.[Costo Monitoreo de detección evento (USD)] as FLOAT)) + (CASE WHEN _kicfe.suma_costo_monitoreo_cli IS NULL THEN 0 ELSE _kicfe.suma_costo_monitoreo_cli END) as "monitoringCostInterference",
            _kicfe.suma_costo_monitoreo_cli as "materializedCostCliFExt",
            kii.[Tipo de Afectación] as "typeAffectation"
          FROM [KPI4_Indicador Interferencias] kii
          LEFT JOIN (
            SELECT
            SUM(CAST(kicfe.[Costo EVITADO para Ocensa (USD) si evento materializado] as FLOAT)) as "suma_costo_materializado_cli",
            SUM(CAST(kicfe.[Costo Monitoreo de detección evento (USD)] as FLOAT)) as "suma_costo_monitoreo_cli",
            kicfe.[Tipo de Afectación] as "typeAffectation"
            FROM [KPI4_Indicador Clima_Fzas Ext] kicfe
            GROUP BY kicfe.[Tipo de Afectación] 
          ) as _kicfe ON _kicfe.typeAffectation = kii.[Tipo de Afectación]
          GROUP BY kii.[Tipo de Afectación], _kicfe.suma_costo_monitoreo_cli
          ORDER BY "materializedCostInterference" DESC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableMaterializedVsMonitoringDB: ",error);
        reject(error);
      }
    })
  }

}

export default effectiveMonitoringModel;