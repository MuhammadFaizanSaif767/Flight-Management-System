CREATE TABLE `customers` (
   `c_id` int NOT NULL AUTO_INCREMENT,
   `c_status` varchar(20) NOT NULL,
   `c_pef_payment` varchar(20) NOT NULL,
   `c_name` varchar(20) NOT NULL,
   `ph` int DEFAULT NULL,
   PRIMARY KEY (`c_id`)
 ) 
 CREATE TABLE `crew` (
   `crew_id` int NOT NULL AUTO_INCREMENT,
   `crew_name` varchar(20) NOT NULL,
   `crew_statue` varchar(20) NOT NULL,
   `crew_base` varchar(20) NOT NULL,
   `crew_role` varchar(20) NOT NULL,
   `flight_code` varchar(30) DEFAULT NULL,
   PRIMARY KEY (`crew_id`),
   KEY `crew_flight` (`flight_code`),
   CONSTRAINT `crew_flight` FOREIGN KEY (`flight_code`) REFERENCES `flights` (`flight_code`)
 ) 
 CREATE TABLE `flights` (
   `flight_code` varchar(20) NOT NULL,
   `gate` varchar(20) NOT NULL,
   `departs` time NOT NULL,
   `aircraft` varchar(20) NOT NULL,
   `r_id` int DEFAULT NULL,
   `f_load` varchar(20) NOT NULL,
   `f_status` varchar(20) NOT NULL,
   `f_date` date NOT NULL,
   `Economy` decimal(10,2) NOT NULL,
   `Firstclass` decimal(10,2) NOT NULL,
   `Business` decimal(10,2) NOT NULL,
   PRIMARY KEY (`flight_code`),
   KEY `fk_routes` (`r_id`),
   CONSTRAINT `fk_routes` FOREIGN KEY (`r_id`) REFERENCES `routes` (`r_id`) ON DELETE CASCADE ON UPDATE CASCADE
 ) 
 CREATE TABLE `bookings` (
   `bk_id` varchar(20) NOT NULL,
   `bk_name` varchar(20) NOT NULL,
   `class` varchar(20) NOT NULL,
   `payment` varchar(20) NOT NULL,
   `price` decimal(10,2) NOT NULL,
   `bk_status` varchar(20) NOT NULL,
   `flight_code` varchar(30) NOT NULL,
   PRIMARY KEY (`bk_id`),
   KEY `bk_flight` (`flight_code`),
   CONSTRAINT `bk_flight` FOREIGN KEY (`flight_code`) REFERENCES `flights` (`flight_code`)
 ) 
 CREATE TABLE `routes` (
   `r_id` int NOT NULL AUTO_INCREMENT,
   `Origin` varchar(30) NOT NULL,
   `Destination` varchar(30) NOT NULL,
   `Distance` varchar(20) NOT NULL,
   `Frequency` varchar(20) DEFAULT NULL,
   `Status` varchar(20) NOT NULL,
   PRIMARY KEY (`r_id`)
 ) 