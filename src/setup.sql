CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    contact_email   VARCHAR(255) NOT NULL,
    logo_filename   VARCHAR(255) NOT NULL
);

CREATE TABLE service_projects (
	project_id SERIAL PRIMARY KEY,
	organization_id INT NOT NULL REFERENCES organizations(organization_id),
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150) NOT NULL,
	date DATE NOT NULL
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id  INT NOT NULL REFERENCES service_projects(project_id),
    category_id INT NOT NULL REFERENCES categories(category_id),
    PRIMARY KEY (project_id, category_id)
);

CREATE TABLE roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(50) UNIQUE NOT NULL,
	role_description TEXT
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
    ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
    ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

INSERT INTO service_projects (organization_id, name, description, location, date)
VALUES
	(1, 'Jonnies Shop', 'Workshop renovation and equipment updates', '123 N 321 E road', TO_DATE('05-21-2026', 'mm/dd/yyyy')),
	(1, 'Freds Pizza', 'Commercial dishwasher replacement and installation', '132 N 210 E lane', TO_DATE('05-26-2026', 'mm/dd/yyyy')),
	(1, 'Community Library', 'Book donation drive and shelf organization', '456 S Main St', TO_DATE('05-28-2026', 'mm/dd/yyyy')),
	(1, 'Park Cleanup Initiative', 'Trail restoration and landscaping maintenance', '789 W Oak Ave', TO_DATE('06-02-2026', 'mm/dd/yyyy')),
	(1, 'School Supply Distribution', 'Collecting and distributing school supplies to underfunded schools', '321 E Maple Dr', TO_DATE('06-05-2026', 'mm/dd/yyyy')),
	(2, 'Urban Garden Setup', 'Building raised garden beds for community nutrition program', '654 N Pine St', TO_DATE('05-25-2026', 'mm/dd/yyyy')),
	(2, 'Farmers Market Support', 'Setting up weekly farmers market infrastructure', '111 Market Plaza', TO_DATE('05-30-2026', 'mm/dd/yyyy')),
	(2, 'School Garden Installation', 'Creating educational garden for local elementary school', '222 Education Blvd', TO_DATE('06-01-2026', 'mm/dd/yyyy')),
	(2, 'Composting Workshop', 'Teaching and implementing community composting system', '333 Green Way', TO_DATE('06-04-2026', 'mm/dd/yyyy')),
	(2, 'Seed Bank Creation', 'Establishing local seed library for community gardeners', '444 Harvest Ln', TO_DATE('06-08-2026', 'mm/dd/yyyy')),
	(3, 'Homeless Outreach', 'Providing meal preparation and hygiene kits', '555 Hope Center', TO_DATE('05-22-2026', 'mm/dd/yyyy')),
	(3, 'Senior Center Activity Program', 'Organizing recreational activities for elderly residents', '666 Golden Years Dr', TO_DATE('05-29-2026', 'mm/dd/yyyy')),
	(3, 'Youth Mentorship Kickoff', 'Recruiting mentors for local youth development program', '777 Future Leaders Ct', TO_DATE('06-03-2026', 'mm/dd/yyyy')),
	(3, 'Disaster Relief Drive', 'Collecting emergency supplies and organizing distribution', '888 Community Center', TO_DATE('06-06-2026', 'mm/dd/yyyy')),
	(3, 'Job Training Workshop', 'Resume building and interview preparation sessions', '999 Career Path Ave', TO_DATE('06-10-2026', 'mm/dd/yyyy'));

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

INSERT INTO categories (name)
VALUES
    ('Construction & Renovation'),
    ('Environment & Sustainability'),
    ('Community Outreach'),
    ('Education & Youth'),
    ('Food & Nutrition');

INSERT INTO project_categories (project_id, category_id) VALUES
    (1, 1),  -- Jonnies Shop, Construction & Renovation
    (2, 1),  -- Freds Pizza, Construction & Renovation
    (3, 3),  -- Community Library, Community Outreach
    (3, 4),  -- Community Library, Education & Youth
    (4, 2),  -- Park Cleanup, Environment & Sustainability
    (5, 4),  -- School Supply, Education & Youth
    (5, 3),  -- School Supply, Community Outreach

    (6, 2),  -- Urban Garden Setup, Environment & Sustainability
    (6, 5),  -- Urban Garden Setup, Food & Nutrition
    (7, 5),  -- Farmers Market, Food & Nutrition
    (7, 3),  -- Farmers Market, Community Outreach
    (8, 4),  -- School Garden, Education & Youth
    (8, 2),  -- School Garden, Environment & Sustainability
    (9, 2),  -- Composting Workshop, Environment & Sustainability
    (10, 2), -- Seed Bank, Environment & Sustainability
    (10, 5), -- Seed Bank, Food & Nutrition

    (11, 3), -- Homeless Outreach, Community Outreach
    (12, 3), -- Senior Center, Community Outreach
    (13, 4), -- Youth Mentorship, Education & Youth
    (13, 3), -- Youth Mentorship, Community Outreach
    (14, 3), -- Disaster Relief, Community Outreach
    (15, 4), -- Job Training, Education & Youth
    (15, 3); -- Job Training, Community Outreach

SELECT * FROM organizations;
SELECT * FROM service_projects;
SELECT * FROM categories;
SELECT * FROM project_categories;
SELECT * FROM roles;
SELECT * FROM users;