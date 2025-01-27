-- MySQL Script with Improvements

-- Schema
CREATE SCHEMA IF NOT EXISTS `todo_list` DEFAULT CHARACTER SET utf8;
USE `todo_list`;

-- Table: roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE (`name`)
) ENGINE = InnoDB;

-- Table: users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(15) NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` VARCHAR(500) NULL,
  `role` INT NOT NULL DEFAULT 1 COMMENT 'Default role must exist in roles table',
  PRIMARY KEY (`user_id`),
  UNIQUE (`email`),
  UNIQUE (`phone`),
  FOREIGN KEY (`role`) REFERENCES `roles`(`role_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Table: task_status
CREATE TABLE IF NOT EXISTS `task_status` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE = InnoDB;

-- Table: tasks
CREATE TABLE IF NOT EXISTS `tasks` (
  `task_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `status` INT NOT NULL DEFAULT 1 COMMENT 'Default status must exist in task_status table',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`task_id`),
  FOREIGN KEY (`status`) REFERENCES `task_status`(`status_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB;

-- Table: user_tasks
CREATE TABLE IF NOT EXISTS `user_tasks` (
  `user_task_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `task_id` INT NOT NULL,
  `assigned_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_task_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`task_id`) REFERENCES `tasks`(`task_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

/*
DELIMITER $$

CREATE TRIGGER after_task_delete
AFTER DELETE ON tasks
FOR EACH ROW
BEGIN
    -- Reasignar las subtareas al abuelo (padre del padre)
    UPDATE tasks
    SET parent_task_id = OLD.parent_task_id
    WHERE parent_task_id = OLD.task_id;
END$$

DELIMITER ;
*/