CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    description     TEXT NOT NULL,
    contact_email   VARCHAR(255) NOT NULL,
    logo_filename   VARCHAR(255) NOT NULL
);
INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES
    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
    ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
    ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organizations;

CREATE TABLE service_projects (
	project_id SERIAL PRIMARY KEY,
	organization_id INT NOT NULL REFERENCES organizations(organization_id),
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	location VARCHAR(150) NOT NULL,
	date DATE NOT NULL
);
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
	