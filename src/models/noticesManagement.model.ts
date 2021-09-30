import db from "../config/database";

class noticesManagementModel {

  static async getTableNoticesManagementDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            i.[Clase de aviso] as "claseNotice",
            case when i2.noticesClosedM4 IS NOT NULL then i2.noticesClosedM4 WHEN i3.noticesClosedM1M2M3 IS NOT NULL THEN i3.noticesClosedM1M2M3 ELSE '0' end as 'noticesClosed',
            case when i5.noticesWithoutClosedM4 IS NOT NULL then i5.noticesWithoutClosedM4 WHEN i4.noticesWithoutClosedM1M2M3 IS NOT NULL THEN i4.noticesWithoutClosedM1M2M3 ELSE '0' end as 'totalNoticesCreated'
          FROM IW69 i 
          LEFT JOIN (
            SELECT 
              i.[Clase de aviso] as "claseNotice",
              count(i.Aviso) as 'noticesClosedM4'
            FROM IW69 i 
            WHERE i.[Fin de avería] <> '' AND i.[Status del sistema] <> 'MECE ORAS' AND i.[Clase de aviso] = 'M4'
            GROUP BY i.[Clase de aviso]
          ) as i2 ON i2.claseNotice = i.[Clase de aviso]
          LEFT JOIN (
            SELECT 
              i.[Clase de aviso] as "claseNotice",
              count(i.Aviso) as 'noticesClosedM1M2M3'
            FROM IW69 i 
            WHERE i.[Fin de avería] <> '' AND i.[Status del sistema] <> 'MECE ORAS' AND i.[Clase de aviso] <> 'M4'
            GROUP BY i.[Clase de aviso]
          ) as i3 on i3.claseNotice = i.[Clase de aviso]
          LEFT JOIN (
            SELECT 
              i.[Clase de aviso] as "claseNotice",
              count(i.Aviso) as 'noticesWithoutClosedM1M2M3'
            FROM IW69 i 
            WHERE i.[Status del sistema] <> 'MECE ORAS' AND i.[Clase de aviso] <> 'M4'
            GROUP BY i.[Clase de aviso]
          ) as i4 on i4.claseNotice = i.[Clase de aviso]
          LEFT JOIN (
            SELECT 
              i.[Clase de aviso] as "claseNotice",
              count(i.Aviso) as 'noticesWithoutClosedM4'
            FROM IW69 i 
            WHERE i.[Status del sistema] <> 'MECE ORAS' AND i.[Clase de aviso] = 'M4'
            GROUP BY i.[Clase de aviso]
          ) as i5 on i5.claseNotice = i.[Clase de aviso]
          GROUP BY i.[Clase de aviso], i2.noticesClosedM4, i3.noticesClosedM1M2M3, i4.noticesWithoutClosedM1M2M3 ,i5.noticesWithoutClosedM4      
        `;
        const result =  await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableNoticesManagementDB: ",error);
        reject(error);
      }
    })
  }

}

export default noticesManagementModel;