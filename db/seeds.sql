INSERT INTO department (name)
VALUES  ('Payroll'),
        ('Benefits'),
        ('Human Resources'),
        ('Business Development'),
        ('Client Development'),
        ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES  ('Payroll Specialist', 45000.00, 1),
        ('Benefit Specialist', 45000.00, 2),
        ('HR Specialist', 50000.00, 3),
        ('Sales Rep', 75000.00, 4),
        ('Client Specialist', 55000.00, 5),
        ('Customer Service Rep', 35000.00, 6),
        ('Senior Payroll Specialist', 55000.00, 1),
        ('Senior Benefit Specialist', 55000.00, 2),
        ('Senior HR Specialist', 60000.00, 3),
        ('Senior Sales Rep', 85000.00, 4),
        ('Senior Client Specialist', 65000.00, 5),
        ('Senior Customer Service Rep', 45000.00, 6),
        ('Payroll Manager', 65000.00, 1),
        ('Benefit Manager', 65000.00, 2),
        ('HR Manager', 70000.00, 3),
        ('Business Development Manager', 95000.00, 4),
        ('Client Development Manager', 75000.00, 5),
        ('Customer Service Manager', 55000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES  ('John Johnson', 'Payroll Specialist', 1, 13),
        ('Steve Smith', 'Benefit Specialist', 2, 14),
        ('Betty Baker', 'HR Specialist', 3, 15),
        ('Adam Anderson', 'Sales Rep', 4, 16) 
        ('Candice Charlies', 'Client Specialist', 5, 17),
        ('Hank Hill', 'Customer Service Rep', 6, 18),
        ('Tracy Thompson', 'Senior Payroll Specialist', 7, 13),
        ('Frank Flores', 'Senior Benefit Specialist', 8, 14),
        ('James Jackson', 'Senior HR Specialist', 9, 15),
        ('Reed Richards', 'Senior Sales Rep', 10, 16),
        ('Peter Parker', 'Senior Client Specialist', 11, 17),
        ('Ben Banner', 'Senior Customer Service Rep', 12, 18),
        ('Tony Stark', 'Payroll Manager', 13, NULL),
        ('Wanda Willson', 'Benefit Manager', 14, NULL),
        ('Vanessa Vasquez', 'HR Manager', 15, NULL),
        ('Steve Rogers', 'Business Development Manager', 16, NULL),
        ('Casey Clasrkson', 'Client Development Manager', 17, NULL),
        ('Bruce Wayne', 'Customer Service Manager', 18, NULL);