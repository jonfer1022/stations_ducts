import db from "../config/database";

class unmanagedNoticesModel {

  static async getTableUnmanagedNoticesDB(station_id: any): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT 
            asg.Avisos_Sin_Gestionar_id as "id",
            asg.Aviso as "notice",
            asg.[Fecha de aviso] as "date",
            asg.Descripción as "description",
            asg.[Denominación de la ubicación técnica] as "tecnic_ubication",
            asg.[Denominación de objeto técnico] as "tecnic_target",
            asg.[Texto grupo de códigos para problema] as "text_codes",
            e.Nombre as "station_name",
            e.Estaciones_id as "station_id"
          FROM "Avisos_Sin_Gestionar" asg
          INNER JOIN "Estaciones" e on e."Estacion_ID" = asg.[Centro planificación]
          WHERE e.Estaciones_id ${station_id ? `= '${station_id}'`: "IS NOT NULL"} 
          ORDER BY e.Nombre ASC
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getTableUnmanagedNoticesDB: ",error);
        reject(error);
      }
    })
  }

  static async getFilterStationsUnmanagedNoticesDB(): Promise<any> {
    return new Promise( async (resolve, reject) => {
      try {
        const conn = await db.connect();
        const query = `
          SELECT
            e.Estaciones_id as "id",
            e.Nombre as "station_name"
          FROM "Avisos_Sin_Gestionar" asg
          INNER JOIN "Estaciones" e on e."Estacion_ID" = asg.[Centro planificación]
          GROUP BY e.Estaciones_id, e.Nombre 
          ORDER BY e.Nombre ASC      
        `;
        const result = await conn.query(query);
        resolve(result.recordset);
      } catch (error) {
        console.error("An error ocurred getFilterStationsUnmanagedNoticesDB: ",error);
        reject(error);
      }
    })
  }

}

export default unmanagedNoticesModel;