-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (x86_64)
--
-- Host: localhost    Database: auction
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auction_items`
--

DROP TABLE IF EXISTS `auction_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `year` int NOT NULL,
  `description` text,
  `minprice` int NOT NULL,
  `current_price` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `end_time` datetime NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction_items`
--

LOCK TABLES `auction_items` WRITE;
/*!40000 ALTER TABLE `auction_items` DISABLE KEYS */;
INSERT INTO `auction_items` VALUES (1,'Mulan',1999,'This 1999 Disney VHS release of Mulan features the animated tale of a courageous young woman who disguises herself as a man to take her ailing father\'s place in the Chinese army. With help from the dragon Mushu, she becomes a hero, blending comedy and adventure. It is rated G and often part of the Masterpiece Collection.',50,50,'/images/Mulan-1999.jpg','2026-04-11 18:00:00','2026-03-23 11:37:54'),(2,'The Thing',1987,'Based on listings for mid-1990s VHS releases (specifically 1996–1997) of John Carpenter\'s The Thing (1982), the VHS description generally focuses on the extreme tension, the isolated Antarctic setting, and the groundbreaking, gruesome special effects. ',50,50,'/images/The-Thing-1987.jpg','2026-04-11 18:05:00','2026-03-23 12:10:51'),(3,'Grosse Point Blank',1997,'Professional hitman Martin Blank returns to his hometown for his high school reunion while trying to complete a dangerous assignment. Mixing action, dark humor, and romance, this stylish thriller explores identity, love, and second chances.',40,40,'/images/Grosse-Point-Blank-1997.jpg','2026-04-12 10:00:00','2026-03-23 12:10:51'),(4,'The Lion King ',1995,'Follow young lion prince Simba on an unforgettable journey from loss and exile to reclaiming his rightful place as king. A breathtaking animated adventure featuring memorable songs, humor, and heartwarming moments for audiences of all ages.',45,45,'/images/The-Lion-King-1995.jpg','2026-04-12 10:05:00','2026-03-23 12:10:51'),(5,'The Shining ',1980,'A writer accepts a winter caretaker job at a secluded mountain hotel, where isolation and supernatural forces slowly drive him toward madness. A haunting psychological horror masterpiece known for its eerie atmosphere and unforgettable performances.',40,40,'/images/The-Shining-1980.jpg','2026-04-12 10:10:00','2026-03-23 12:10:51'),(6,'101 Dalmatians',1996,'When the villainous Cruella de Vil plots to kidnap a group of Dalmatian puppies for her latest fashion obsession, their owners and animal friends must outsmart her. A fun and exciting family adventure full of charm and humor.',40,40,'/images/101-Dalmatians-1996.jpg','2026-04-12 10:15:00','2026-03-23 12:10:51'),(7,'Weekend at Bernies ',1989,'Two young employees discover their boss has died during a weekend getaway, but pretend he is still alive to avoid trouble. A wild and hilarious comedy filled with absurd situations and unforgettable moments.',55,55,'/images/Weekend-at-Bernies-1989.jpg','2026-04-12 10:20:00','2026-03-23 12:10:51'),(8,'Dawn of the Dead',1977,'As the dead rise and society collapses, a group of survivors seeks refuge inside an abandoned shopping mall. This intense and influential zombie horror film blends action, suspense, and social commentary.',50,50,'/images/Dawn-of-the-Dead-1977.jpg','2026-04-12 10:25:00','2026-03-23 12:10:51');
/*!40000 ALTER TABLE `auction_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bids` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auction_id` int NOT NULL,
  `bidder` varchar(250) NOT NULL,
  `amount` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `auction_id_idx` (`auction_id`),
  CONSTRAINT `auction_id` FOREIGN KEY (`auction_id`) REFERENCES `auction_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-24  9:56:47
