-- Core Tables
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location_id INTEGER
);

-- Master Data Tables (Bulk Upload Support)
CREATE TABLE erp_data (
  id SERIAL PRIMARY KEY,
  branch_name VARCHAR(255),
  department VARCHAR(255),
  custom_field1 VARCHAR(255)  -- For SOP-specific fields
);

CREATE TABLE crm_data (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255),
  contact_email VARCHAR(255),
  lead_source VARCHAR(100)
);

-- Warehouse Bulk Upload
CREATE TABLE warehouse_data (
  id SERIAL PRIMARY KEY,
  item_code VARCHAR(50) UNIQUE,
  quantity INTEGER,
  location_id INTEGER
);

-- HR Bulk Upload
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  employee_id VARCHAR(20) UNIQUE,
  full_name VARCHAR(255),
  department VARCHAR(100)
);