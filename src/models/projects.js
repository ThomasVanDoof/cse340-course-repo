import db from './db.js'

const getAllProjects = async() => {
  const query = `
    SELECT project_id, organization_id, name, description, location, date FROM public.service_projects
  `;
  const result = await db.query(query);
  return result.rows;
}
const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          name,
          description,
          location,
          date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      p.project_id,
      p.name AS title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM service_projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.date::DATE >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1
  `;
  
  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.name AS title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM service_projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1
  `;
  
  const queryParams = [id];
  const result = await db.query(query, queryParams);
  
  return result.rows[0];
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails }