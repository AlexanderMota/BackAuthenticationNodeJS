-- Insertar roles
INSERT INTO `todo_list`.`roles` (`role_id`, `role`) VALUES 
(1, 'Admin'),
(2, 'User'),
(3, 'Guest');

-- Insertar usuarios
INSERT INTO `todo_list`.`users` (`name`, `lastname`, `username`, `email`, `phone`, `password`, `avatar_url`, `role_id`) VALUES
('John', 'Doe', 'jdoe', 'jdoe@example.com', '1234567890', 'hashed_password_1', 'https://example.com/avatar1.png', 1),
('Jane', 'Smith', 'jsmith', 'jsmith@example.com', '0987654321', 'hashed_password_2', 'https://example.com/avatar2.png', 2),
('Alice', 'Brown', 'abrown', 'abrown@example.com', NULL, 'hashed_password_3', NULL, 3);

-- Insertar estados de tarea
INSERT INTO `todo_list`.`task_status` (`status_id`, `name`) VALUES
(1, 'Pending'),
(2, 'In Progress'),
(3, 'Completed'),
(4, 'On Hold');

-- Insertar tareas
INSERT INTO `todo_list`.`tasks` (`name`, `description`, `status_id`, `parent_task_id`) VALUES
('Setup Project', 'Initialize the project repository and tools.', 1, NULL),
('Develop Backend', 'Create the API and database structure.', 2, 1),
('Develop Frontend', 'Design and build the user interface.', 2, 1),
('Write Documentation', 'Document the system for end-users.', 4, NULL);

-- Insertar asignaciones de tareas
INSERT INTO `todo_list`.`user_tasks` (`user_id`, `task_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(2, 4);

-- Insertar comentarios
INSERT INTO `todo_list`.`comments` (`task_id`, `user_id`, `content`, `parent_comment_id`) VALUES
(1, 1, 'Let’s get started on this project!', NULL),
(2, 2, 'API endpoints need more testing.', NULL),
(3, 3, 'Frontend design looks great!', NULL),
(2, 1, 'Noted. Will add test cases.', 2);

-- Insertar reacciones a comentarios
INSERT INTO `todo_list`.`reactions` (`comment_id`, `user_id`, `type`) VALUES
(1, 2, 'like'),
(2, 3, 'wow'),
(3, 1, 'like'),
(4, 2, 'laugh');

-- Insertar solicitudes de tarea
INSERT INTO `todo_list`.`requests_task` (`task_id`, `user_id`, `status`) VALUES
(1, 2, 'pending'),
(2, 3, 'accepted'),
(3, 1, 'declined');