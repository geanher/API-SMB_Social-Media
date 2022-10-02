CREATE DATABASE IF NOT EXISTS `ScheduledMessage`;
-- GRANT ALL PRIVILEGES ON `ScheduledMessage`.* TO 'root'@'%';
USE `ScheduledMessage`;

CREATE TABLE IF NOT EXISTS `ScheduledMessage`.`RRSS` (
    `id_RRSS` TINYINT UNSIGNED NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`id_RRSS`)
);
    
INSERT INTO `ScheduledMessage`.`RRSS` (`id_RRSS`, `name`) VALUES
(1,'FACEBOOK'),
(2,'INSTAGRAM'),
(3,'TWITTER');
-- DROP TABLE IF EXISTS `ScheduledMessage`.`Messages`;
CREATE TABLE IF NOT EXISTS `ScheduledMessage`.`Messages` (

    `id_message` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `message` TEXT,
    `url` TEXT,
    `date` VARCHAR(40),
    `id_RRSS` TINYINT UNSIGNED NOT NULL,
    `id_job` varchar(200),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id_message`),
    INDEX (`date`),
    FOREIGN KEY (`id_RRSS`)
    REFERENCES `ScheduledMessage`.`RRSS` (`id_RRSS`)
    ON DELETE CASCADE ON UPDATE CASCADE);

    

