CREATE TABLE IF NOT EXISTS `emoji_config_sessions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` VARCHAR(255) NOT NULL,
  `channelId` VARCHAR(255) NOT NULL,
  `messageTs` VARCHAR(255) NOT NULL,
  `settingType` VARCHAR(255) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_user_id` (`userId`),
  INDEX `idx_message_ts` (`messageTs`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
