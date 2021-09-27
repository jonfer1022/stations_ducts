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
import riskLevel from "./resolvers/riskLevel.resolver";
import percentageRiskierAssets from "./resolvers/percentageRiskierAssets.resolver";
import integrityFindings from "./resolvers/integrityFindings.resolver";
import mttStaticAssets from "./resolvers/mttStaticAssets.resolver";
import attentionStaticAssests from "./resolvers/attentionStaticAssests.resolver";
import complianceAnnualIntegrityPlan from "./resolvers/complianceAnnualIntegrityPlan.resolver";
import noticesManagement from "./resolvers/noticesManagement.resolver";
import managementRoutineActivities from "./resolvers/managementRoutineActivities.resolver";
import riskMitigation from "./resolvers/riskMitigation.resolver";
import ilicitasBySection from "./resolvers/ilicitasBySection.resolver";

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
 * TAB: KPI - Cumplimiento plan anual de integridad.
 * Endpoint que retorna la data para todas las gráficas respectivas al Tab Cumplimiento plan anual de integridad.
 */
router.route('/getTableRiskAwareness').get(complianceAnnualIntegrityPlan.getTableRiskAwareness);

/**
 * TAB: KPI - Gestión mantenimiento de activos estáticos (MTT activos estáticos).
 * Endpoint que retorna la data para la tabla 'Ordenes de mantenimiento de equipos estáticos' al igual que para el valor
 * de 'ordenes cerradas', 'ordenes creadas' y para el porcentaje de 'Gestión mantenimiento de activos estáticos'.
 * Además de tener la data también para la gráfica 'Porcentaje ordenes creadas' (Solo que no están ordenadas de forma descendente),
 * como también el porcentaje de cada estación es retornado para la tabla 'porcentaje por estación'.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableStaticEquipmentMaintenance').get(mttStaticAssets.getTableStaticEquipmentMaintenance);

/**
 * TAB: KPI - Atención de avisos activos estáticos.
 * Endpoint que retorna la data para la tabla 'Avisos gestionados por estación' al igual que para el valor
 * de 'Total avisos gestionados', 'Total de avisos creados' y para el porcentaje de 'Reducción del riesgo de activos estáticos'.
 * Además de tener la data también para la gráfica 'Gestión de avisos por estación' (Solo que no están ordenadas de forma descendente),
 * como para la gráfica 'Número de avisos creados por estación' 
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableNoticesManagedByStation').get(attentionStaticAssests.getTableNoticesManagedByStation);

/**
 * TAB: KPI - Hallazgos de integridad.
 * Endpoint que retorna la data para la tabla 'Hallazgos de integridad', incluyendo el total de 'hallazgos identificados' como último objeto del arreglo retornado. 
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableIntegrityFindings').get(integrityFindings.getTableIntegrityFindings);

/**
 * TAB: KPI - Hallazgos de integridad.
 * Endpoint que retorna la data del máximo de 'Hallazgos cerrados' 
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getFindigsClosed').get(integrityFindings.getFindigsClosed);
 
/**
 * TAB: KPI - Hallazgos de integridad.
 * Endpoint que retorna la data para la gráfica 'Porcentaje de hallazgos cerrados' 
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getPercentageFindingsClosed').get(integrityFindings.getPercentageFindigsClosed);
 
/**
 * TAB: KPI - Hallazgos de integridad.
 * Endpoint que retorna la data para la gráfica 'Porcentaje de hallazgos cerrados por grupo' 
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getPercentageFindingsClosedByGroup').get(integrityFindings.getPercentageFindingsClosedByGroup);

/**
 * TAB: KRI - Costo del riesgo actual.
 * Endpoint que retorna la data para la tabla 'Costo del riesgo Actual', el total de 'Líneas fuera del target' y 'Total de líneas'.
 * Como también la data retornada funciona para la gráfica de barras 'Líneas fuera del target' (Sin embargo no está ordenado por el campo 'linesTotal').
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableCurrentlyRiskCost').get(currentlyRiskCost.getTableCurrentlyRiskCost);

/**
 * TAB: KRI - Costo del riesgo actual.
 * Endpoint que retorna la data para la tabla 'Activos con costo fuera del Target'.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getActivesCostOutTarget').get(currentlyRiskCost.getActivesCostOutTarget);

/**
 * TAB: KRI - Costo del riesgo actual.
 * Endpoint que retorna la data para la tabla 'Activos con costo fuera del Target'.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getMatrizCurrentlyCostRisk').get(currentlyRiskCost.getMatrizCurrentlyCostRisk);

/**
 * TAB: KRI - Porcentaje de activos de mayor riesgo
 * Endpoint que retorna la data para la gráfica 'Pareto porcentaje de activos de mayor riesgo' y el valor del porcentaje donde 'cumple'.
 * @param {string} station_id id de la estación a filtrar.
 */
router.route('/getParetoPercentageRiskierAssets').get(percentageRiskierAssets.getParetoPercentageRiskierAssets);

/**
 * TAB: KRI - Nivel de Riesgo
 * Endpoint que retorna la data para la tabla 'Nivel de riesgo - Recipientes' y la gráfica de barras del porcentaje.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableRiskLevelContainers').get(riskLevel.getTableRiskLevelContainers);

/**
 * TAB: KRI - Nivel de Riesgo
 * Endpoint que retorna la data para la tabla 'Nivel de riesgo - Tanques' y la gráfica de barras del porcentaje.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableRiskLevelTanks').get(riskLevel.getTableRiskLevelTanks);

/**
 * TAB: KRI - Nivel de Riesgo
 * Endpoint que retorna la data para la tabla 'Nivel de riesgo - Tuberias' y la gráfica de barras del porcentaje.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableRiskLevelPipelines').get(riskLevel.getTableRiskLevelPipelines);
 
/**
 * TAB: KRI - Gestión de hallazgos prioritarios.
 * Endpoint que retorna la data para todas las tablas presentadas en la sección 'Gestión de hallazgos prioritarios'.
 * @param {string} station_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableManagementFindingsPri').get(managementFindingsPri.getTableManagementFindingsPri);

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
 * TAB: KPI Ductos - Gestión de actividades rutinarias
 * Endpoint que retorna la data para todas las gráficas respectivas al tab ya anteriormente mencionado.
 */
router.route('/getDataManagementRoutineActivities').get(managementRoutineActivities.getDataManagementRoutineActivities);

/**
 * NO SE PINTAN LAS GRÁFICAS - Gestión de actividades basadas en condición
 */

/**
 * TAB: KPI Ductos - Efectividad de monitoreos
 * Endpoint que retorna la data para la tabla 'Efectividad de monitoreos' y el valor de la efectividad total
 * @param {string} sector Sector a filtrar.
 */
router.route('/getTableEffectiveMonitoring').get(effectiveMonitoring.getTableEffectiveMonitoring);
 
/**
 * TAB: KPI Ductos - Efectividad de monitoreos
 * Endpoint que retorna la data para la tabla 'Efectividad de monitoreos vs Costo monitoreos'
 * @param {string} sector Sector a filtrar.
 */
router.route('/getTableMaterializedVsMonitoring').get(effectiveMonitoring.getTableMaterializedVsMonitoring);

/**
 * TAB: KPI Ductos - Gestión de avisos
 * Endpoint que retorna la data para la tabla 'Gestión de avisos', el porcentaje de 'Gestión de avisos' y
 * la data para la gráfica 'Costos materializados vs Costo Monitoreos'.
 */
router.route('/getTableNoticesManagement').get(noticesManagement.getTableNoticesManagement);

/**
 * NO SE PINTAN LAS GRÁFICAS - Disponibilidad para bombeo
 */

/**
 * TAB: KRI Ductos - Mitigación del riesgo.
 * Endpoint que retorna la data para todas las gráficas respectivas al tab anteriormente mencionado.
 * @param {string} ducts_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableRiskMitigation').get(riskMitigation.getTableRiskMitigation);

/**
 * TAB: KRI Ductos - Ilicitas
 * Endpoint que retorna la data para todas las gráficas respectivas al tab anteriormente mencionado. (Exceptuando el porcentaje y el recuadro ilicitas identificadas)
 * @param {string} ducts_id id de la estación a filtrar.
 * @param {string} sector nombre del sector a filtrar.
 * @param {string} segment id del segmento a filtrar.
 */
router.route('/getTableIlicitasBySection').get(ilicitasBySection.getTableIlicitasBySection);

export default router;
