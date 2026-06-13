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

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO volunteer_signups (user_id, project_id)
    VALUES ($1, $2)
    RETURNING signup_id;
  `;

  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to add volunteer');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('User', userId, 'volunteered for project', projectId);
  }

  return result.rows[0].signup_id;
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM volunteer_signups
    WHERE user_id = $1 AND project_id = $2
    RETURNING signup_id;
  `;

  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Volunteer signup not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('User', userId, 'removed volunteering for project', projectId);
  }

  return result.rows[0].signup_id;
};

const getVolunteerProjects = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.name AS title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name,
      v.signup_date
    FROM volunteer_signups v
    JOIN service_projects p ON v.project_id = p.project_id
    JOIN organizations o ON p.organization_id = o.organization_id
    WHERE v.user_id = $1
    ORDER BY p.date ASC;
  `;

  const queryParams = [userId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const isUserVolunteer = async (userId, projectId) => {
  const query = `
    SELECT signup_id
    FROM volunteer_signups
    WHERE user_id = $1 AND project_id = $2;
  `;

  const queryParams = [userId, projectId];
  const result = await db.query(query, queryParams);

  return result.rows.length > 0;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject, updateProject, addVolunteer, removeVolunteer, getVolunteerProjects, isUserVolunteer }