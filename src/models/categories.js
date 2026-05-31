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

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

/**
 * Creates a new category in the database.
 * @param {string} name - The name of the category.
 * @returns {string} The id of the newly created category record.
 */
const createCategory = async (name) => {
    const query = `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING category_id
    `;

    const queryParams = [name];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

/**
 * Updates an existing category in the database.
 * @param {string} categoryId - The ID of the category to update.
 * @param {string} name - The name of the category.
 * @returns {string} The id of the updated category record.
 */
const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const queryParams = [name, categoryId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to update category');
  }

  return result.rows[0].category_id;
};

export { getAllCategories, getCategoryById, getCategoriesForProject, getProjectsForCategory, updateCategoryAssignments, createCategory, updateCategory };