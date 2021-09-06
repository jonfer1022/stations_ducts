import { Router } from "express";
import stations from "./resolvers/stations.resolver";
import ducts from "./resolvers/ducts.resolver";
import reassessment from "./resolvers/reassessment.resolver";
import progressWorks from "./resolvers/progressWorks.resolver";
import unmanagedNotices from "./resolvers/unmanagedNotices.resolver";
import mechanicalIntegrity from "./resolvers/mechanicalIntegrity.resolver";
import riskCostReduction from "./resolvers/riskCostReduction.resolver";
import managementIncorrectOp from "./resolvers/managementIncorrectOp.resolver";
import maintenancePlanManagement from "./resolvers/maintenancePlanManagement.resolver";
import effectiveMonitoring from "./resolvers/effectiveMonitoring.resolver";
import currentlyRiskCost  from "./resolvers/currentlyRiskCost.resolver";
import managementFindingsPri  from "./resolvers/managementFindingsPri.resolver";

const router = Router();

/**
 * Endpoint que retorna la data para el filtro 'Estaciones'.
 */
router.route('/getFilterStations').get(stations.getFilterStations);

/**
 * Endpoint que retorna la data para el filtro 'Tramos' y utilizada
 * también en el mapa 'Tramos con revaloración'
 */
router.route('/getFilterSections').get(ducts.getFilterSections);

/**
 * Endpoint que retorna la data para el filtro 'Segmento' y utilizada
 * en el tab 'KRI Ductos', 'KPI Ductos'.
 */
router.route('/getFilterSegments').get(ducts.getFilterSegments);

/**
 * Endpoint que retorna la data para el filtro 'Sector' y utilizada
 * en el tab 'KRI Ductos', 'KPI Ductos'.
 */
router.route('/getFilterSectors').get(ducts.getFilterSectors);

/**
 * Endpoint que retorna la data para el filtro 'Escenario de desastre' y utilizada
 * en el tab 'KRI Ductos', 'KPI Ductos'.
 */
router.route('/getFilterDisasterScenarios').get(ducts.getFilterDisasterScenarios);

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

/**
 * Endpoint que retorna la data para la tabla y la gráfica de barras 'Gestión de integridad mecánica' ¡AUN FALTAN UNOS DATOS!! tabla dent_Strain_Remaining
 * @param {string} station_id id de las estaciones.
 * NOTA: Por ende hace falta la gráfica del porcentaje (La circular y las de los puntos.) tab KRI DUCTOS 
 */
router.route('/getTableMechanicalIntegrity').get(mechanicalIntegrity.getTableMechanicalIntegrity);

/**
 * TAB: KRI Ductos - Reducción costo del riesgo
 * Endpoint (FALTA TERMINAR EL MODEL)
 * @param {string} station_id id de las estaciones. 
 */
router.route('/getTableAverageCostSeccions').get(riskCostReduction.getTableAverageCostSeccions);

/**
 * Avance obra, faltan datos y tablas!!!!!!!!
 */
router.route('/getTableProgressWorks').get(progressWorks.getTableProgressWorks);

/**
 * TAB: KRI Ductos - sección Gestión de operaciones incorrectas
 * Endpoint que retorna la data para la tabla 'Gestión de operaciones incorrectas' y la gráfica circular 'Número de eventos'
 * @param {string} section_name nombre del ducto. 
 */
router.route('/getTableManagementIncorrectOp').get(managementIncorrectOp.getTableManagementIncorrectOp);

/**
 * TAB: KRI Ductos - sección Gestión de operaciones incorrectas
 * Endpoint que retorna la data para la tabla 'Gestión de operaciones incorrectas' relacionada con las fechas del evento.
 * @param {string} section_name nombre del ducto. 
 * @param {string} date Fecha del evento. 
 */
router.route('/getTableManagementIncorrectOpGroupByDate').get(managementIncorrectOp.getTableManagementIncorrectOpGroupByDate);

/**
 * TAB: KPI Ductos - Gestión plan de mantenimiento.
 * Endpoint que retona la data para la tabla 'Avance de ejecución vs programación'. 
 * @param {string} year Año a filtrar. 
 */
router.route('/getTableExecutionVsScheduling').get(maintenancePlanManagement.getTableExecutionVsScheduling);

/**
 * TAB: KPI Ductos - Gestión plan de mantenimiento.
 * Endpoint que retorna el porcentaje máximo de la obra civil ejecutada, el máximo programado y el avance de la compañia. 
 * @param {string} year Año a filtrar.
 */
router.route('/getMaxExecutionShedulingProgress').get(maintenancePlanManagement.getMaxExecutionShedulingProgress);

/**
 * TAB: KPI Ductos - Efectividad de monitoreos
 * Endpoint que retorna la data para la tabla 'Efectividad de monitoreos' y el valor de la efectividad total
 * @param {string} sector Sector a filtrar.
 */
router.route('/getTableEffectiveMonitoring').get(effectiveMonitoring.getTableEffectiveMonitoring);

/**
 * TAB: KPI Ductos - Efectividad de monitoreos
 * Endpoint que retorna la data para la tabla 'Efectividad de monitoreos vs Costo monitoreos'
 */
router.route('/getTableMaterializedVsMonitoring').get(effectiveMonitoring.getTableMaterializedVsMonitoring);

/**
 * TAB: KRI - Costo del riesgo actual.
 * Endpoint que retorna la data para la tabla 'Costo del riesgo Actual', el total de 'Líneas fuera del target' y 'Total de líneas'.
 * Como también la data retornada funciona para la gráfica de barras 'Líneas fuera del target' (Sin embargo no está ordenado por el campo 'linesTotal').
 * @param {string} station_id id de la estación.
 * NOTE: Falta data para la tabla 'Activos con costo fuera del Target'.
 */
router.route('/getTableCurrentlyRiskCost').get(currentlyRiskCost.getTableCurrentlyRiskCost);

/**
 * TAB: KRI - Gestión de hallazgos prioritarios.
 * Endpoint que retorna la data para todas las tablas presentadas en la sección 'Gestión de hallazgos prioritarios'.
 * @param {string} station_id id de la estación.
 */
router.route('/getTableManagementFindingsPri').get(managementFindingsPri.getTableManagementFindingsPri);

export default router;