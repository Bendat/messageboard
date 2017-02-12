CREATE TABLE `messageboard`.`messages` (
     `id` INT(24) NOT NULL , 
     `parent_id` INT(24) NULL DEFAULT NULL , 
     `user_id` INT(24) NULL DEFAULT NULL , 
     `title` VARCHAR(128) NULL DEFAULT NULL , 
     `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
     `text` TEXT NOT NULL , `image_id` INT(24) NOT NULL , 
     PRIMARY KEY (`id`)) 
ENGINE = MyISAM;