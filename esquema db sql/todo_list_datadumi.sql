-- Inserción de roles
INSERT INTO `roles` (`role_id`, `role`) VALUES 
(1, 'Admin'),
(2, 'Manager'),
(3, 'Developer'),
(4, 'Tester'),
(0000, 'Viewer');

-- Inserción de usuarios
INSERT INTO `users` (`user_id`, `name`, `lastname`, `username`, `email`, `phone`, `password`, `avatar_url`, `role_id`) VALUES 
(1, 'Alice', 'Smith', 'asmith', 'alice.smith@example.com', '5551234567', 'password123', 'https://example.com/avatars/alice.jpg', 1),
(2, 'Bob', 'Johnson', 'bjohnson', 'bob.johnson@example.com', '5559876543', 'password456', 'https://example.com/avatars/bob.jpg', 2),
(3, 'Charlie', 'Brown', 'cbrown', 'charlie.brown@example.com', '5555678901', 'password789', 'https://example.com/avatars/charlie.jpg', 3),
(4, 'Diana', 'Prince', 'dprince', 'diana.prince@example.com', '5553456789', 'wonderwoman', NULL, 4),
(5, 'Eve', 'Taylor', 'etaylor', 'eve.taylor@example.com', '5557654321', 'password999', NULL, 0000);

-- Inserción de tareas
INSERT INTO `tasks` (`task_id`, `name`, `description`, `status`, `parent_task_id`, `created_by`) VALUES 
(1, 'Setup Project', 'Initialize project repository and setup tools', 'done', NULL, 1),
(2, 'Create Database Schema', 'Design and create the initial database schema', 'done', NULL, 1),
(3, 'Develop API', 'Build the API endpoints for the application', 'inprogress', NULL, 2),
(4, 'Frontend Development', 'Implement the user interface', 'pending', 3, 3),
(5, 'Write Unit Tests', 'Add unit tests for critical functionality', 'paused', NULL, 3),
(6, 'Bug Fixes', 'Resolve reported bugs', 'inprogress', 3, 4),
(7, 'Deploy Application', 'Deploy the application to production', 'pending', NULL, 1),
(8, 'Update Documentation', 'Write or update documentation for the application', 'done', NULL, 2),
(9, 'Code Review', 'Review code submitted by team members', 'pending', 6, 4),
(10, 'Team Meeting', 'Weekly sync-up meeting with the team', 'canceled', NULL, 1);

-- Inserción en user_tasks (asignación de tareas a usuarios)
INSERT INTO `user_tasks` (`user_task_id`, `user_id`, `task_id`, `task_asigned_at`) VALUES 
(1, 1, 1, NOW()),
(2, 2, 2, NOW()),
(3, 3, 3, NOW()),
(4, 4, 6, NOW()),
(5, 3, 4, NOW()),
(6, 2, 8, NOW()),
(7, 5, 10, NOW()),
(8, 4, 9, NOW()),
(9, 1, 7, NOW()),
(10, 5, 5, NOW());

-- Inserción de comentarios
INSERT INTO `comments` (`comment_id`, `task_id`, `user_id`, `content`, `parent_comment_id`) VALUES 
(1, 1, 1, 'The project setup is complete.', NULL),
(2, 2, 2, 'Database schema looks good.', NULL),
(3, 3, 3, 'The API development is coming along well.', NULL),
(4, 3, 4, 'I noticed an issue with the API.', 3),
(5, 6, 4, 'Bug fixes are in progress.', NULL),
(6, 4, 3, 'Frontend development is waiting on API.', NULL),
(7, 8, 2, 'Updated the documentation.', NULL),
(8, 9, 4, 'Code review is pending for the last PR.', NULL),
(9, 9, 5, 'Agreed. I will start the review soon.', 8),
(10, 7, 1, 'Deployment scheduled for next week.', NULL);

-- Inserción de reacciones a comentarios
INSERT INTO `reactions` (`reactions_id`, `comment_id`, `user_id`, `type`, `created_at`) VALUES 
(1, 1, 2, 'like', NOW()),
(2, 2, 3, 'like', NOW()),
(3, 3, 4, 'wow', NOW()),
(4, 4, 1, 'like', NOW()),
(5, 5, 5, 'laugh', NOW()),
(6, 6, 3, 'dislike', NOW()),
(7, 7, 2, 'like', NOW()),
(8, 8, 1, 'like', NOW()),
(9, 9, 4, 'like', NOW()),
(10, 10, 5, 'wow', NOW());

-- Inserción de solicitudes de tareas
INSERT INTO `requests_task` (`request_id`, `task_id`, `user_id`, `status`, `created_at`) VALUES 
(1, 1, 2, 'accepted', NOW()),
(2, 2, 3, 'accepted', NOW()),
(3, 3, 4, 'pending', NOW()),
(4, 4, 5, 'declined', NOW()),
(5, 5, 1, 'pending', NOW()),
(6, 6, 2, 'accepted', NOW()),
(7, 7, 3, 'pending', NOW()),
(8, 8, 4, 'accepted', NOW()),
(9, 9, 5, 'declined', NOW()),
(10, 10, 1, 'pending', NOW());
