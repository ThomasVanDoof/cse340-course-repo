import db from "./db.js";

const getAllCategories = async () => {
  const query = `
    SELECT category_id, name FROM public.categories
    ORDER BY name
  `;
  const result = await db.query(query);
  return result.rows;
}

const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name
    FROM categories
    WHERE category_id = $1
  `;
  
  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);
  
  return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesForProject = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM categories c
    JOIN project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name
  `;
  
  const queryParams = [projectId];
  const result = await db.query(query, queryParams);
  
  return result.rows;
};

const getProjectsForCategory = async (categoryId) => {
  const query = `
    SELECT DISTINCT
      p.project_id,
      p.name,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM service_projects p
    JOIN organizations o ON p.organization_id = o.organization_id
    JOIN project_categories pc ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC
  `;
  
  const queryParams = [categoryId];
  const result = await db.query(query, queryParams);
  
  return result.rows;
};

export { getAllCategories, getCategoryById, getCategoriesForProject, getProjectsForCategory };