-- Initialization Script for Spotify Status Bot Database
-- This script runs automatically when the MySQL Docker container starts for the first time.

-- The database itself is created by the MYSQL_DATABASE environment variable in docker-compose.
-- We ensure we are using the correct database.
USE `spotify_bot`;

-- Create the 'users' table mapped to the Sequelize 'UserModel'
CREATE TABLE IF NOT EXISTS `users` (
    `id` CHAR(36) PRIMARY KEY,
    `slackUserId` VARCHAR(255) NOT NULL UNIQUE,
    `slackUserToken` VARCHAR(255) NOT NULL,
    `spotifyRefreshToken` VARCHAR(255) NOT NULL,
    `isSyncActive` TINYINT(1) NOT NULL DEFAULT 1,
    `statusFormat` VARCHAR(255) NOT NULL DEFAULT '{song} - {artist}',
    `statusEmoji` VARCHAR(255) NOT NULL DEFAULT ':headphones:',
    `pausedEmoji` VARCHAR(255) NOT NULL DEFAULT ':double_vertical_bar:',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Note: In our application code, Sequelize is configured to call `sequelize.sync()`,
-- which will also attempt to create this table. This script ensures the table
-- and schema are defined robustly at the database-initialization level, which
-- is best practice for production environments.
