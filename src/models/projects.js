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

const createProject = async (name, description, location, date, organizationId) => {
    const query = `
      INSERT INTO service_projects (name, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [name, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, name, description, location, date, organizationId) => {
  const query = `
    UPDATE service_projects
    SET name = $1, description = $2, location = $3, date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [name, description, location, date, organizationId, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].project_id;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject }