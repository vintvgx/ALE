-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: comm_db
-- ------------------------------------------------------
-- Server version	8.0.35

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

use heroku_09edf888fd01591;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `account_emailaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(75) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
INSERT INTO `account_emailaddress` VALUES (1,'kareems0108@gmail.com',1,1,1),(2,'kareems96@gmail.com',1,1,3),(13,'banditstudiosdpd@gmail.com',1,1,16);
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add permission',1,'add_permission'),(2,'Can change permission',1,'change_permission'),(3,'Can delete permission',1,'delete_permission'),(4,'Can view permission',1,'view_permission'),(5,'Can add group',2,'add_group'),(6,'Can change group',2,'change_group'),(7,'Can delete group',2,'delete_group'),(8,'Can view group',2,'view_group'),(9,'Can add content type',3,'add_contenttype'),(10,'Can change content type',3,'change_contenttype'),(11,'Can delete content type',3,'delete_contenttype'),(12,'Can view content type',3,'view_contenttype'),(13,'Can add User',4,'add_customusermodel'),(14,'Can change User',4,'change_customusermodel'),(15,'Can delete User',4,'delete_customusermodel'),(16,'Can view User',4,'view_customusermodel'),(17,'Can add blog post',5,'add_blogpost'),(18,'Can change blog post',5,'change_blogpost'),(19,'Can delete blog post',5,'delete_blogpost'),(20,'Can view blog post',5,'view_blogpost'),(21,'Can add tag',6,'add_tag'),(22,'Can change tag',6,'change_tag'),(23,'Can delete tag',6,'delete_tag'),(24,'Can view tag',6,'view_tag'),(25,'Can add topic',7,'add_topic'),(26,'Can change topic',7,'change_topic'),(27,'Can delete topic',7,'delete_topic'),(28,'Can view topic',7,'view_topic'),(29,'Can add like',8,'add_like'),(30,'Can change like',8,'change_like'),(31,'Can delete like',8,'delete_like'),(32,'Can view like',8,'view_like'),(33,'Can add follow',9,'add_follow'),(34,'Can change follow',9,'change_follow'),(35,'Can delete follow',9,'delete_follow'),(36,'Can view follow',9,'view_follow'),(37,'Can add comment',10,'add_comment'),(38,'Can change comment',10,'change_comment'),(39,'Can delete comment',10,'delete_comment'),(40,'Can view comment',10,'view_comment'),(41,'Can add log entry',11,'add_logentry'),(42,'Can change log entry',11,'change_logentry'),(43,'Can delete log entry',11,'delete_logentry'),(44,'Can view log entry',11,'view_logentry'),(45,'Can add session',12,'add_session'),(46,'Can change session',12,'change_session'),(47,'Can delete session',12,'delete_session'),(48,'Can view session',12,'view_session'),(49,'Can add Token',13,'add_token'),(50,'Can change Token',13,'change_token'),(51,'Can delete Token',13,'delete_token'),(52,'Can view Token',13,'view_token'),(53,'Can add token',14,'add_tokenproxy'),(54,'Can change token',14,'change_tokenproxy'),(55,'Can delete token',14,'delete_tokenproxy'),(56,'Can view token',14,'view_tokenproxy'),(57,'Can add site',15,'add_site'),(58,'Can change site',15,'change_site'),(59,'Can delete site',15,'delete_site'),(60,'Can view site',15,'view_site'),(61,'Can add email address',16,'add_emailaddress'),(62,'Can change email address',16,'change_emailaddress'),(63,'Can delete email address',16,'delete_emailaddress'),(64,'Can view email address',16,'view_emailaddress'),(65,'Can add email confirmation',17,'add_emailconfirmation'),(66,'Can change email confirmation',17,'change_emailconfirmation'),(67,'Can delete email confirmation',17,'delete_emailconfirmation'),(68,'Can view email confirmation',17,'view_emailconfirmation'),(69,'Can add social account',18,'add_socialaccount'),(70,'Can change social account',18,'change_socialaccount'),(71,'Can delete social account',18,'delete_socialaccount'),(72,'Can view social account',18,'view_socialaccount'),(73,'Can add social application',19,'add_socialapp'),(74,'Can change social application',19,'change_socialapp'),(75,'Can delete social application',19,'delete_socialapp'),(76,'Can view social application',19,'view_socialapp'),(77,'Can add social application token',20,'add_socialtoken'),(78,'Can change social application token',20,'change_socialtoken'),(79,'Can delete social application token',20,'delete_socialtoken'),(80,'Can view social application token',20,'view_socialtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_users_customusermodel_id` FOREIGN KEY (`user_id`) REFERENCES `users_customusermodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comm_blogpost`
--

DROP TABLE IF EXISTS `comm_blogpost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `comm_blogpost` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint DEFAULT NULL,
  `topic_id` bigint DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `topic_id` (`topic_id`),
  CONSTRAINT `comm_blogpost_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_customusermodel` (`id`),
  CONSTRAINT `comm_blogpost_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `comm_topic` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comm_blogpost`
--

LOCK TABLES `comm_blogpost` WRITE;
/*!40000 ALTER TABLE `comm_blogpost` DISABLE KEYS */;
INSERT INTO `comm_blogpost` VALUES (16,'PROFILE','{\"blocks\":[]}','2023-12-18 21:18:19',3,1,'posts/3/PROFILE/cover/IMG_3402.PNG'),(18,'NEW OCTOBERS!','{\"time\":1702956593301,\"blocks\":[{\"id\":\"TAf18Jx4Qw\",\"type\":\"header\",\"data\":{\"text\":\"State of Emergency\",\"level\":2}},{\"id\":\"L-bQZydNqa\",\"type\":\"paragraph\",\"data\":{\"text\":\"At what time will the dusk set and make me the new king?&nbsp;\"}}],\"version\":\"2.28.2\"}','2023-12-19 03:29:53',3,1,'posts/3/NEW OCTOBERS!/cover/IMG_7778.JPG'),(20,'HAPPY HOLIDAYS','{\"time\":1703280358217,\"blocks\":[{\"id\":\"S7Byxzy4A1\",\"type\":\"header\",\"data\":{\"text\":\"merry xmas\",\"level\":1}},{\"id\":\"02dbvFCfUs\",\"type\":\"paragraph\",\"data\":{\"text\":\"from me to you&nbsp;\"}},{\"id\":\"eQ-rtgzZ7-\",\"type\":\"paragraph\",\"data\":{\"text\":\"&amp; my homegirl LA\"}},{\"id\":\"GN4Y4IpmI2\",\"type\":\"paragraph\",\"data\":{\"text\":\"- no ig vintvgx\"}}],\"version\":\"2.28.2\"}','2023-12-22 21:25:59',3,1,'posts/3/HAPPY HOLIDAYS/cover/000059930006.jpg'),(21,'anwar sabir','{\"time\":1703280447191,\"blocks\":[{\"id\":\"zC6e07TVrX\",\"type\":\"paragraph\",\"data\":{\"text\":\"my brotha anwar the supastar.&nbsp;\"}},{\"id\":\"W6tQJBG7oR\",\"type\":\"paragraph\",\"data\":{\"text\":\"thank you for riding wit me in this life&nbsp;\"}},{\"id\":\"p-ZPn5pxlY\",\"type\":\"paragraph\",\"data\":{\"text\":\"you are very much appreciated.\"}}],\"version\":\"2.28.2\"}','2023-12-22 21:27:27',3,1,'posts/3/anwar sabir/cover/C48D1B22-CFDE-4031-9B17-ABDCEEA7482D.JPG'),(22,'LOREM','{\"time\":1703345690029,\"blocks\":[{\"id\":\"1Vkd9B9AH8\",\"type\":\"header\",\"data\":{\"text\":\"Sed exercitationem molestiae hic sapiente sequi qui Quis temporibus. \",\"level\":1}},{\"id\":\"oV_Ys_pcMO\",\"type\":\"paragraph\",\"data\":{\"text\":\"Lorem ipsum dolor sit amet. Est dicta galisum et laboriosam doloremque et dignissimos laborum sed totam quos sit consequuntur asperiores. Ea molestiae inventore eum rerum voluptatum et esse reiciendis id earum repellendus? \"}},{\"id\":\"gpUg2qyd6R\",\"type\":\"header\",\"data\":{\"text\":\"Ea numquam rerum aut assumenda cupiditate. \",\"level\":2}},{\"id\":\"8W9V5gtVi4\",\"type\":\"paragraph\",\"data\":{\"text\":\"Aut itaque ducimus sed perspiciatis culpa id atque inventore est corrupti commodi et praesentium nisi quo numquam doloremque est architecto inventore. Eos tempore totam et dicta dolor sed neque sint eum quae beatae. Sed consequuntur impedit est reprehenderit explicabo vel voluptas dolores aut dolor enim qui explicabo Quis. \"}},{\"id\":\"ycC4xI-WoT\",\"type\":\"header\",\"data\":{\"text\":\"Sed dicta voluptate non quas corporis eos incidunt quibusdam. \",\"level\":3}},{\"id\":\"0gjf-WG0UM\",\"type\":\"paragraph\",\"data\":{\"text\":\"Est quas velit et consequatur nobis eum dolorum corporis cum optio maxime ut maiores inventore aut eius sapiente cum eligendi voluptatibus. Ex voluptas quia sit quam corrupti et omnis quia aut eveniet pariatur non minus explicabo. Ea voluptate dignissimos quo voluptatum voluptatem et nostrum reprehenderit est optio possimus sit nesciunt suscipit. Ut nihil neque sit repellendus fuga aut dignissimos voluptas est neque accusamus qui quasi magni vel quis amet aut ullam cupiditate! \"}}],\"version\":\"2.28.2\"}','2023-12-23 15:35:24',3,1,'posts/3/LOREM/cover/lorem-ipsum-sample-text-lettering-comic-design-for-t-shirt-or-poster-R26AMG.jpg'),(24,'First Post','{\"time\":1703794490606,\"blocks\":[{\"id\":\"eF2fzrdhfp\",\"type\":\"paragraph\",\"data\":{\"text\":\"Hello, this is John Doe and this is my first blog post :)\"}}],\"version\":\"2.28.2\"}','2023-12-28 20:14:59',16,2,'posts/16/First Post/cover/wp5334473-kobe-bryant-the-black-mamba-wallpapers.jpg'),(25,'New POST','{\"time\":1704004967716,\"blocks\":[{\"id\":\"Dl1sf1m5Cv\",\"type\":\"paragraph\",\"data\":{\"text\":\"this is a new post from the vintvgx boi! nice t meet ya :)\"}}],\"version\":\"2.28.2\"}','2023-12-31 06:43:25',3,1,'posts/3/New POST/cover/DSC07305.jpg'),(26,'Root','{\"time\":1704068816241,\"blocks\":[{\"id\":\"mjOPJOVp_U\",\"type\":\"paragraph\",\"data\":{\"text\":\"Rooting for u. Happy new year!\"}}],\"version\":\"2.28.2\"}','2024-01-01 00:27:41',3,1,'posts/3/Root/cover/Crystal_Gorski-2.jpg'),(27,'Hello Ester','{\"time\":1704645037925,\"blocks\":[{\"id\":\"BBq8sg76mu\",\"type\":\"header\",\"data\":{\"text\":\"Est animi reiciendis eos aliquid similique et expedita repellendus.\",\"level\":1}},{\"id\":\"3oUZGj6R-U\",\"type\":\"paragraph\",\"data\":{\"text\":\"Lorem ipsum dolor sit amet. Ut dolore molestiae est soluta illoet velit. Et omnis sunt&nbsp;Sit sequi ea maxime reiciendis et nesciunt iste&nbsp;ut sint excepturi. Ut voluptatum harum&nbsp;<a href=\\\"https://www.loremipzum.com/\\\" target=\\\"_blank\\\">Et saepe non ipsa quia</a>? Vel libero fugiat sed numquam adipisciSed mollitia et quia similique quo similique officiis ea placeat galisum.\"}},{\"id\":\"gItolXuPF1\",\"type\":\"header\",\"data\":{\"text\":\"Ut cumque quos aut dolores ipsum aut omnis aliquid.\",\"level\":2}},{\"id\":\"RdvjvlFt11\",\"type\":\"paragraph\",\"data\":{\"text\":\"Eum nihil dicta et perspiciatis optioet Quis! Aut internos aliquidNon quod quo alias voluptas id ducimus enim qui deleniti officiis nam corrupti molestias eum odit necessitatibus. Aut optio eaque&nbsp;Aut molestiae id consectetur labore non aliquid quae&nbsp;sit omnis commodi est autem illum. Vel architecto delectusEt laboriosam sit omnis laborum 33 aperiam veniam!\"}},{\"id\":\"I5nQ3y9gGb\",\"type\":\"header\",\"data\":{\"text\":\"Et sint molestiae eum odio vitae.\",\"level\":3}},{\"id\":\"0sHwAn4bnB\",\"type\":\"paragraph\",\"data\":{\"text\":\"Sit consequatur accusamus rem itaque autemut omnis. Et possimus velit&nbsp;Et magnam hic laborum veniam ut magnam voluptatum rem aliquam molestias.\"}}],\"version\":\"2.28.2\"}','2024-01-07 16:31:04',3,2,'posts/3/Hello Ester/cover/MJ.jpeg');
/*!40000 ALTER TABLE `comm_blogpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comm_comment`
--

DROP TABLE IF EXISTS `comm_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `comm_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comm_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_customusermodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comm_comment`
--

LOCK TABLES `comm_comment` WRITE;
/*!40000 ALTER TABLE `comm_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comm_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comm_follow`
--

DROP TABLE IF EXISTS `comm_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `comm_follow` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `follower_id` bigint DEFAULT NULL,
  `following_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `follower_id` (`follower_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `comm_follow_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users_customusermodel` (`id`),
  CONSTRAINT `comm_follow_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users_customusermodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comm_follow`
--

LOCK TABLES `comm_follow` WRITE;
/*!40000 ALTER TABLE `comm_follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `comm_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comm_like`
--

DROP TABLE IF EXISTS `comm_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `comm_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `post_id` bigint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comm_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_customusermodel` (`id`),
  CONSTRAINT `comm_like_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `comm_blogpost` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comm_like`
--

LOCK TABLES `comm_like` WRITE;
/*!40000 ALTER TABLE `comm_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `comm_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comm_tag`
--

DROP TABLE IF EXISTS `comm_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `comm_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comm_tag`
--

LOCK TABLES `comm_tag` WRITE;
/*!40000 ALTER TABLE `comm_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `comm_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comm_topic`
--

DROP TABLE IF EXISTS `comm_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `comm_topic` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comm_topic`
--

LOCK TABLES `comm_topic` WRITE;
/*!40000 ALTER TABLE `comm_topic` DISABLE KEYS */;
INSERT INTO `comm_topic` VALUES (1,'Option'),(2,'Other'),(3,'Tech'),(4,'Sports');
/*!40000 ALTER TABLE `comm_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_users_customusermodel_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_customusermodel_id` FOREIGN KEY (`user_id`) REFERENCES `users_customusermodel` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-12-12 17:16:04.799302','4','test@aol.com',1,'[{\"added\": {}}]',4,3),(2,'2023-12-12 17:16:34.363450','4','test@aol.com',2,'[]',4,3),(3,'2023-12-12 17:20:28.288543','1','kareems0108@gmail.com',1,'[{\"added\": {}}]',16,3),(4,'2023-12-12 17:20:51.859150','2','kareems96@gmail.com',1,'[{\"added\": {}}]',16,3);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (16,'account','emailaddress'),(17,'account','emailconfirmation'),(11,'admin','logentry'),(2,'auth','group'),(1,'auth','permission'),(13,'authtoken','token'),(14,'authtoken','tokenproxy'),(5,'comm','blogpost'),(10,'comm','comment'),(9,'comm','follow'),(8,'comm','like'),(6,'comm','tag'),(7,'comm','topic'),(3,'contenttypes','contenttype'),(12,'sessions','session'),(15,'sites','site'),(18,'socialaccount','socialaccount'),(19,'socialaccount','socialapp'),(20,'socialaccount','socialtoken'),(4,'users','customusermodel');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-12-12 04:08:49.508179'),(2,'contenttypes','0002_remove_content_type_name','2023-12-12 04:08:49.525008'),(3,'auth','0001_initial','2023-12-12 04:08:49.595402'),(4,'auth','0002_alter_permission_name_max_length','2023-12-12 04:08:49.613299'),(5,'auth','0003_alter_user_email_max_length','2023-12-12 04:08:49.617524'),(6,'auth','0004_alter_user_username_opts','2023-12-12 04:08:49.622756'),(7,'auth','0005_alter_user_last_login_null','2023-12-12 04:08:49.626983'),(8,'auth','0006_require_contenttypes_0002','2023-12-12 04:08:49.628661'),(9,'auth','0007_alter_validators_add_error_messages','2023-12-12 04:08:49.632873'),(10,'auth','0008_alter_user_username_max_length','2023-12-12 04:08:49.637288'),(11,'auth','0009_alter_user_last_name_max_length','2023-12-12 04:08:49.641938'),(12,'auth','0010_alter_group_name_max_length','2023-12-12 04:08:49.650303'),(13,'auth','0011_update_proxy_permissions','2023-12-12 04:08:49.654720'),(14,'auth','0012_alter_user_first_name_max_length','2023-12-12 04:08:49.659010'),(15,'users','0001_initial','2023-12-12 04:08:49.739640'),(16,'comm','0001_initial','2023-12-12 04:35:22.194182'),(17,'account','0001_initial','2023-12-12 04:35:35.582411'),(18,'account','0002_email_max_length','2023-12-12 04:35:35.584538'),(19,'account','0003_alter_emailaddress_create_unique_verified_email','2023-12-12 04:35:35.586079'),(20,'account','0004_alter_emailaddress_drop_unique_email','2023-12-12 04:35:35.587632'),(21,'account','0005_emailaddress_idx_upper_email','2023-12-12 04:35:35.588990'),(22,'admin','0001_initial','2023-12-12 04:35:46.948790'),(23,'admin','0002_logentry_remove_auto_add','2023-12-12 04:35:46.957864'),(24,'admin','0003_logentry_add_action_flag_choices','2023-12-12 04:35:46.967034'),(25,'authtoken','0001_initial','2023-12-12 04:35:46.997645'),(26,'authtoken','0002_auto_20160226_1747','2023-12-12 04:35:47.028943'),(27,'authtoken','0003_tokenproxy','2023-12-12 04:35:47.031250'),(28,'sessions','0001_initial','2023-12-12 04:35:47.043737'),(29,'sites','0001_initial','2023-12-12 04:35:47.052106'),(30,'sites','0002_alter_domain_unique','2023-12-12 04:35:47.059390'),(31,'socialaccount','0001_initial','2023-12-12 04:35:47.200325'),(32,'socialaccount','0002_token_max_lengths','2023-12-12 04:35:47.236476'),(33,'socialaccount','0003_extra_data_default_dict','2023-12-12 04:35:47.246029'),(34,'socialaccount','0004_app_provider_id_settings','2023-12-12 04:35:47.334900'),(35,'socialaccount','0005_socialtoken_nullable_app','2023-12-12 04:35:47.385673'),(36,'users','0002_customusermodel_is_staff','2023-12-12 04:48:56.456950'),(37,'comm','0002_rename_author_blogpost_user','2023-12-16 05:49:54.816089'),(38,'comm','0003_alter_blogpost_user','2023-12-16 06:16:26.911367');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('42m4cvhd1g6ijgr27jyubyx1826u0v15','.eJxVjEEOwiAQRe_C2hDqIAGX7j0DmWEGqRpISrtqvLtt0oVu_3vvryriMpe4dJniyOqqQJ1-N8L0kroDfmJ9NJ1anaeR9K7og3Z9byzv2-H-HRTsZautgeS9WOAQ3IBpK0NGEickAIMlugh4YHHGnq1klzKGYDIJ28CC6vMFBkI5Wg:1rCuk5:8BAQVfKf5FEJsmypAC6yl5m3PPH3xK_-qMlDvWRWAtA','2023-12-26 04:51:37.445303'),('4lvqrs4ab73giaxznrp51fiv88ezidrb','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiJkIn0:1rIuD0:mleZM2jPmMcaWmC6JGzQTI03x4oHlG8Cv6O2o1ehVRw','2024-01-11 17:30:14.707825'),('67lkor6n5qilesmg5et2mrb0250kfv1i','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiJjIn0:1rIuBc:jELV95DmVuA8Y8VkxzsvTHi9K4q0qGZ6wrh3Baq3eNs','2024-01-11 17:28:48.666818'),('8rn2uwoc1o8ye6a9omv5oru2isuadyop','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiI5In0:1rIYPj:6JjlZl89C9DPwJlDfz8STnep4-4uMGfy474Sqz30xNs','2024-01-10 18:13:55.398977'),('ajk2fpsfvwaqxuxd0c3k5m0ax5pdr13e','.eJwNx0ESgCAIAMC_8ALASOwzDiiN58xT099rb_tAtXWPumZcddgccICWZuJZSd1DTCRyEDJac-OMxprOKFEI-6aiFC6pl_iDuygTvB-a9hlE:1rD8rm:JjsCr8MBQbiMwPI63xN3fnX7Ah5gOsoNrtbFdm5Sngg','2023-12-26 19:56:30.947936'),('c16hsxxcjxoax6o12m8zzk7j3ffbw8iq','.eJxVjMEOwiAQRP-FsyFAXVk8evcbyC6sUjWQlPZk_HfbpAc9zrw381aRlrnEpcsUx6zOalCH344pPaVuID-o3ptOrc7TyHpT9E67vrYsr8vu_h0U6mVdY0gE7NEiswABiBdrnKHE5Lwhh8NNggRr8hEBrTAMOcgazAnQWfX5Auy_N6Y:1rIXeS:OrjL0qw_XiL-PJdu-WVv16zL4qKeJW-8qnQNLv75eGk','2024-01-10 17:25:04.955276'),('fs4ucom5wj2uvj2nxlm4flehz3nrrfka','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiJmIn0:1rIuMj:XwNndLd3xl3QpyJvUn6PxMcD0Uky6ipdt1rDqYT9yEU','2024-01-11 17:40:17.214098'),('jwufjd41q9pck9a7oop5qs3r11ychxzl','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiJhIn0:1rIthV:Iy2samMGeUwcFCiB0bKctx1YcIH9bQ_0t0a2itffGlo','2024-01-11 16:57:41.730010'),('qjsyt0y2vaba3flj2ta4wjdiwpk551q9','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiJnIn0:1rIuXq:uKWnUJsWalxhGeURPX6p-zd1WMDovXqqi_SmOllhswI','2024-01-11 17:51:46.472930'),('vviiwqyiucvg1ew25mrpw8nzeqs9r1vz','eyJhY2NvdW50X3ZlcmlmaWVkX2VtYWlsIjpudWxsLCJhY2NvdW50X3VzZXIiOiJlIn0:1rIuLz:Yjvbw8gzN2GM7CjESjQj5zNYMBUVj9IeKLBpU66vC5k','2024-01-11 17:39:31.419635');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(200) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_social_user_id_8146e70c_fk_users_cus` (`user_id`),
  CONSTRAINT `socialaccount_social_user_id_8146e70c_fk_users_cus` FOREIGN KEY (`user_id`) REFERENCES `users_customusermodel` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `provider_id` varchar(200) NOT NULL,
  `settings` json NOT NULL DEFAULT (_utf8mb3'{}'),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `socialapp_id` int NOT NULL,
  `site_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int NOT NULL,
  `app_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_customusermodel`
--

DROP TABLE IF EXISTS `users_customusermodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `users_customusermodel` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_customusermodel`
--

LOCK TABLES `users_customusermodel` WRITE;
/*!40000 ALTER TABLE `users_customusermodel` DISABLE KEYS */;
INSERT INTO `users_customusermodel` VALUES (1,'pbkdf2_sha256$600000$Utr3vXZD6o2LibtQqcbKIZ$4d8nNy2/D7cErDleVkn6uJ9XzDjsbiG3qv5SU6AyZxI=',1,'Kareems0108@gmail.com','vintvgx','Kareem',NULL,'',1,'2023-12-12 04:32:31.884768','2023-12-12 04:32:31.887873',0),(3,'pbkdf2_sha256$600000$F1W9gk5NqCSbKlhPY6Pio4$kMdWw8wu/YE3iLBqXka0oTvvN/8Q0MYmdBtESp7iJ30=',1,'kareems96@gmail.com','root','R00T','','avatars/MJ.jpeg',1,'2023-12-12 04:51:20.056156','2023-12-27 17:25:04.954208',1),(16,'pbkdf2_sha256$600000$50iPmV7M6DqtVBxVLpWPNN$oFKWtTu0bT2KHqrohLgZJkDYDfD90iA9esHlv8PJ3mM=',0,'banditstudiosdpd@gmail.com','johndoe1','john','doe','',1,'2023-12-28 17:51:45.117159','2023-12-28 17:51:46.503265',0);
/*!40000 ALTER TABLE `users_customusermodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_customusermodel_groups`
--

DROP TABLE IF EXISTS `users_customusermodel_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `users_customusermodel_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customusermodel_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_customusermodel_gr_customusermodel_id_group_2408fa8f_uniq` (`customusermodel_id`,`group_id`),
  KEY `users_customusermodel_groups_group_id_443528cf_fk_auth_group_id` (`group_id`),
  CONSTRAINT `users_customusermode_customusermodel_id_88b927f5_fk_users_cus` FOREIGN KEY (`customusermodel_id`) REFERENCES `users_customusermodel` (`id`),
  CONSTRAINT `users_customusermodel_groups_group_id_443528cf_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_customusermodel_groups`
--

LOCK TABLES `users_customusermodel_groups` WRITE;
/*!40000 ALTER TABLE `users_customusermodel_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_customusermodel_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_customusermodel_user_permissions`
--

DROP TABLE IF EXISTS `users_customusermodel_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `users_customusermodel_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customusermodel_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_customusermodel_us_customusermodel_id_permi_c4889f39_uniq` (`customusermodel_id`,`permission_id`),
  KEY `users_customusermode_permission_id_21271f31_fk_auth_perm` (`permission_id`),
  CONSTRAINT `users_customusermode_customusermodel_id_5f729431_fk_users_cus` FOREIGN KEY (`customusermodel_id`) REFERENCES `users_customusermodel` (`id`),
  CONSTRAINT `users_customusermode_permission_id_21271f31_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_customusermodel_user_permissions`
--

LOCK TABLES `users_customusermodel_user_permissions` WRITE;
/*!40000 ALTER TABLE `users_customusermodel_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_customusermodel_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-11 13:41:26
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: todo_api_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `api_project`
--

DROP TABLE IF EXISTS `api_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `api_project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `demo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_project`
--

LOCK TABLES `api_project` WRITE;
/*!40000 ALTER TABLE `api_project` DISABLE KEYS */;
INSERT INTO `api_project` VALUES (1,'thumbnails/images/logo192.png','Testing','Testing CAT','Testing DESC',''),(2,'thumbnails/images/URBAN.ai_Systems_Components-2.png','Testing2','Testing2CAT','Testing2DESC','this is the second one'),(5,'thumbnails/images/DSC09752.JPG','New Project','backend engineer','Creating a robust and scalable version of Medium, but it will be called COMM for communication.','yo mommmmmmma!');
/*!40000 ALTER TABLE `api_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add project',7,'add_project'),(26,'Can change project',7,'change_project'),(27,'Can delete project',7,'delete_project'),(28,'Can view project',7,'view_project');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$5Ze2B52ZYTJq0pi1fLkcb1$AK0eRjg4oMkG/fUoLgLX7DqYca7CwtuywfZhYg3tpc4=','2023-11-25 00:28:28.179989',1,'vintvgx','','','kareems0108@gmail.com',1,1,'2023-11-23 20:45:23.503436');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(7,'api','project'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-11-23 17:38:08.157431'),(2,'auth','0001_initial','2023-11-23 17:38:08.293478'),(3,'admin','0001_initial','2023-11-23 17:38:08.333438'),(4,'admin','0002_logentry_remove_auto_add','2023-11-23 17:38:08.348818'),(5,'admin','0003_logentry_add_action_flag_choices','2023-11-23 17:38:08.354853'),(6,'contenttypes','0002_remove_content_type_name','2023-11-23 17:38:08.386266'),(7,'auth','0002_alter_permission_name_max_length','2023-11-23 17:38:08.406994'),(8,'auth','0003_alter_user_email_max_length','2023-11-23 17:38:08.423218'),(9,'auth','0004_alter_user_username_opts','2023-11-23 17:38:08.429141'),(10,'auth','0005_alter_user_last_login_null','2023-11-23 17:38:08.450996'),(11,'auth','0006_require_contenttypes_0002','2023-11-23 17:38:08.452629'),(12,'auth','0007_alter_validators_add_error_messages','2023-11-23 17:38:08.458566'),(13,'auth','0008_alter_user_username_max_length','2023-11-23 17:38:08.482525'),(14,'auth','0009_alter_user_last_name_max_length','2023-11-23 17:38:08.505132'),(15,'auth','0010_alter_group_name_max_length','2023-11-23 17:38:08.522891'),(16,'auth','0011_update_proxy_permissions','2023-11-23 17:38:08.532246'),(17,'auth','0012_alter_user_first_name_max_length','2023-11-23 17:38:08.559388'),(18,'sessions','0001_initial','2023-11-23 17:38:08.572520'),(19,'api','0001_initial','2023-11-25 00:21:13.460077');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb3 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('oyq9wx36lxz18zpv7sqs26aexvxw2ccz','.eJxVjMEOwiAQRP-FsyFAAcGjd7-BLLusVA1NSnsy_rtt0oPeJvPezFskWJea1l7mNJK4CC1Ov10GfJa2A3pAu08Sp7bMY5a7Ig_a5W2i8roe7t9BhV63tSmBjDsTKwzoIxtWGXMp1mVHzFv0CsgOUevBB-9QReuiZYaADF6JzxcOMDjO:1r6gX6:xlKvSjdDw9j28M3MCfmzb9X2BHLF4ols9nQKsZYHV0M','2023-12-09 00:28:28.183383');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-11 13:41:26
