-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(100) NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`password` varchar(100) NOT NULL,
	`status` tinyint DEFAULT 1,
	`role` enum('admin','user') DEFAULT 'user',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phoneNumber_unique` UNIQUE(`phoneNumber`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `users_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`address` varchar(255),
	`city` varchar(255),
	`state` varchar(255),
	`country` varchar(255),
	`zip_code` varchar(10),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_details_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_details_user_id_unique` UNIQUE(`user_id`)
);

*/