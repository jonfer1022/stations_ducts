import { Router } from "express";
import ducts from "./resolvers/ducts.resolver";
import reassessment from "./resolvers/reassessment.resolver";
import progressWorks from "./resolvers/progressWorks.resolver";
import unmanagedNotices from "./resolvers/unmanagedNotices.resolver";

const router = Router();

/**
 * Avance obra, faltan datos y tablas!!!!!!!!
 */
router.route('/getTableProgressWorks').get(progressWorks.getTableProgressWorks);

/**
 * Endpoint que retorna la data para el filtro 'Tramos' y utilizada
 * también en el mapa 'Tramos con revaloración'
 */
router.route('/getFilterSections').get(ducts.getFilterSections);

/**
 * Endpoint que retorna la data para la tabla 'Tramos con revaloración'
 * @param {string} ducs_id id de los ductos. 
 */
router.route('/getTableReassessment').get(reassessment.getTableReassessment);

/**
 * Endpoint que retorna la data para el filtro estaciones utilizado para filtrar en tab 'Avisos sin gestionar'
 */
router.route('/getFilterStationsUnmanagedNotices').get(unmanagedNotices.getFilterStationsUnmanagedNotices);

/**
 * Endpoint que retorna la data para la tabla 'Avisos sin gestionar'
 * @param {string} station_id id de las estaciones. 
 */
router.route('/getTableUnmanagedNotices').get(unmanagedNotices.getTableUnmanagedNotices);


export default router;