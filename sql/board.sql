CREATE TABLE `MessageBoard`.
`Boards` ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `name` VARCHAR(10) NOT NULL UNIQUE, 
    `description` VARCHAR(64) NOT NULL,
    PRIMARY KEY (`id`)
    )
ENGINE = MyISAM;