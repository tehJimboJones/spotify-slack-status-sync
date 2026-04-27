-- Migration script to add podcast columns to the existing users table.
-- Compatible with MySQL/SQLite

ALTER TABLE users 
ADD COLUMN syncPodcasts BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN podcastStatusFormat VARCHAR(255) NOT NULL DEFAULT '{podcast name} - {episode title}',
ADD COLUMN podcastStatusEmoji VARCHAR(255) NOT NULL DEFAULT ':microphone:',
ADD COLUMN podcastPausedEmoji VARCHAR(255) NOT NULL DEFAULT ':double_vertical_bar:';
