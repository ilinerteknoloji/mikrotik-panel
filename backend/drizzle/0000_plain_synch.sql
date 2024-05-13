-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `access_token` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`status` tinyint DEFAULT 1,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `access_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `access_token_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `complains` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`message` text NOT NULL,
	`status` tinyint DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `complains_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_agent` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `devices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `error_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`status` tinyint DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `error_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feedbacks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`message` text NOT NULL,
	`status` tinyint DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `feedbacks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ips` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ip` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `ips_id` PRIMARY KEY(`id`),
	CONSTRAINT `ips_ip_unique` UNIQUE(`ip`)
);
--> statement-breakpoint
CREATE TABLE `logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_device_id` int,
	`ip_id` int NOT NULL,
	`message` text NOT NULL,
	`time` timestamp DEFAULT (now()),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `refresh_token` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`status` tinyint DEFAULT 1,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `refresh_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `refresh_token_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `user_device` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`device_id` int NOT NULL,
	`ip_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `user_device_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_devices_refresh_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`refresh_token_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`user_devices_id` int NOT NULL,
	CONSTRAINT `user_devices_refresh_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
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
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_phoneNumber_unique` UNIQUE(`phoneNumber`)
);
--> statement-breakpoint
CREATE TABLE `users_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`is_email_verified` tinyint DEFAULT 0,
	`is_phone_number_verified` tinyint DEFAULT 0,
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
--> statement-breakpoint
ALTER TABLE `access_token` ADD CONSTRAINT `access_token_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `complains` ADD CONSTRAINT `complains_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `feedbacks` ADD CONSTRAINT `feedbacks_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_ip_id_ips_id_fk` FOREIGN KEY (`ip_id`) REFERENCES `ips`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `logs` ADD CONSTRAINT `logs_user_device_id_user_device_id_fk` FOREIGN KEY (`user_device_id`) REFERENCES `user_device`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `refresh_token` ADD CONSTRAINT `refresh_token_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_device` ADD CONSTRAINT `user_device_device_id_devices_id_fk` FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_device` ADD CONSTRAINT `user_device_ip_id_ips_id_fk` FOREIGN KEY (`ip_id`) REFERENCES `ips`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_device` ADD CONSTRAINT `user_device_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_devices_refresh_tokens` ADD CONSTRAINT `user_devices_refresh_tokens_refresh_token_id_refresh_token_id_fk` FOREIGN KEY (`refresh_token_id`) REFERENCES `refresh_token`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_devices_refresh_tokens` ADD CONSTRAINT `user_devices_refresh_tokens_user_devices_id_user_device_id_fk` FOREIGN KEY (`user_devices_id`) REFERENCES `user_device`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users_details` ADD CONSTRAINT `users_details_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
*/