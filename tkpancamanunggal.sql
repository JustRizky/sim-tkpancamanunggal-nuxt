-- MySQL dump 10.13  Distrib 8.0.44, for Linux (aarch64)
--
-- Host: localhost    Database: tkpancamanunggal
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `About`
--

DROP TABLE IF EXISTS `About`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `About` (
  `id` int NOT NULL DEFAULT '1',
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sejarah` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `visi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `misi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `About`
--

LOCK TABLES `About` WRITE;
/*!40000 ALTER TABLE `About` DISABLE KEYS */;
INSERT INTO `About` VALUES (1,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1765293007/about-page/ot4hampndrglyrjx5wtk.jpg','TK Panca Manunggal adalah lembaga pendidikan anak usia dini yang berlokasi di Jl Dapuan Baru II/82, Surabaya. Lembaga ini berada di bawah naungan Yayasan Panca Manunggal Surabaya dan melayani pendidikan pra-sekolah dengan komitmen menciptakan lingkungan belajar yang menyenangkan dan kreatif.|||Seiring berjalannya waktu, sekolah terus mengembangkan fasilitas dan kurikulum agar sesuai dengan kebutuhan anak usia dini di era modern. Pada tanggal 24 November 2021, sekolah memperoleh SK operasional resmi sehingga memperkuat legalitas dan layanan. Dengan akreditasi “B” dan kurikulum PAUD yang diimplementasikan, TK Panca Manunggal terus berupaya membentuk generasi yang cerdas, mandiri, dan berbudi pekerti sejak usia dini.','TK Panca Manunggal mewujudkan anak yang beriman, sehat, mandiri,\r\ncerdas, kreatif, komunikatif, mampu bekerjasama, dan cinta tanah air','Membiasakan anak berdoa, beribadah dan berakhlak mulia.;Menanamkan sikap peduli, toleran dan cinta budaya bangsa.;Mengembangkan kemandirian, kesehatan jasmani dan rohani, serta\r\nketrampilan berfikir kritis dan kreatif.;Melatih anak berkomunikasi dengan baik dan bekerja sama dalam\r\nberbagai kegiatan.','2025-12-09 13:02:43.682','2025-12-10 15:48:46.307');
/*!40000 ALTER TABLE `About` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Carousel`
--

DROP TABLE IF EXISTS `Carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Carousel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Carousel`
--

LOCK TABLES `Carousel` WRITE;
/*!40000 ALTER TABLE `Carousel` DISABLE KEYS */;
INSERT INTO `Carousel` VALUES (1,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1763444002/carousel-section/lvxlwbicged8ipvqtk2k.jpg','2025-11-18 05:33:22.738','2025-11-18 05:33:22.738'),(5,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1765295554/carousel-section/ycpbwkvovuy83tlknocc.jpg','2025-12-09 15:52:36.093','2025-12-09 15:52:36.093'),(6,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1765295611/carousel-section/flx98bkp6ja8necnx9vl.jpg','2025-12-09 15:53:32.114','2025-12-09 15:53:32.114'),(7,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1765295638/carousel-section/uekkskvtshpyrtfnkidt.jpg','2025-12-09 15:53:58.734','2025-12-09 15:53:58.734'),(8,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1765295710/carousel-section/bfvskvr0je4meeiixopz.jpg','2025-12-09 15:55:11.513','2025-12-09 15:55:11.513'),(9,'https://res.cloudinary.com/dpnvqfibi/image/upload/v1765381895/carousel-section/rdeogouznuegzl2wu5n0.jpg','2025-12-10 15:51:36.003','2025-12-10 15:51:36.003');
/*!40000 ALTER TABLE `Carousel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactMessage`
--

DROP TABLE IF EXISTS `ContactMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactMessage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactMessage`
--

LOCK TABLES `ContactMessage` WRITE;
/*!40000 ALTER TABLE `ContactMessage` DISABLE KEYS */;
INSERT INTO `ContactMessage` VALUES (1,'Rizky','anandamrkl@gmail.com','ini test pesan dari kontak','2025-12-10 03:12:59.700','2025-12-10 03:12:59.700');
/*!40000 ALTER TABLE `ContactMessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HeroSection`
--

DROP TABLE IF EXISTS `HeroSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HeroSection` (
  `id` int NOT NULL DEFAULT '1',
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `paragraph` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HeroSection`
--

LOCK TABLES `HeroSection` WRITE;
/*!40000 ALTER TABLE `HeroSection` DISABLE KEYS */;
INSERT INTO `HeroSection` VALUES (1,'Bermain Dan Belajar Bersama Kami','2025-12-10 14:37:24.682','2025-12-10 14:37:24.682','Tempat yang menyenangkan dan kreatif di mana anak-anak dapat belajar, bermain, dan tumbuh dengan penuh kasih serta keceriaan setiap hari.','https://res.cloudinary.com/dpnvqfibi/image/upload/v1765377444/hero-section/qqqywpvajtbgsnymvpnw.jpg');
/*!40000 ALTER TABLE `HeroSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ppdb`
--

DROP TABLE IF EXISTS `Ppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ppdb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nik` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_kk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat_lahir` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_lahir` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_akte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kewarganegaraan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tinggal_bersama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anak_ke` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usia` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_hp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `namaAyah` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nikAyah` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tahunLahirAyah` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pendidikanAyah` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pekerjaanAyah` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penghasilanAyah` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `namaIbu` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nikIbu` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tahunLahirIbu` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pendidikanIbu` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pekerjaanIbu` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penghasilanIbu` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tinggiBadan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `beratBadan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lingkarKepala` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jarakTempuh` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlahSaudara` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ppdb`
--

LOCK TABLES `Ppdb` WRITE;
/*!40000 ALTER TABLE `Ppdb` DISABLE KEYS */;
INSERT INTO `Ppdb` VALUES (1,'Test edit','Laki-laki','1234567890123456','1234567890123456','Surabaya','2025-12-09','12345678901234567890','Islam','Indonesia','Jl. Test 2/VII','Orang Tua','1','5','081554133818','TestAyah','1234567890123456','1962','SMA','Buruh','2.000.000','TestIbu','1234567890123456','1970','S1','Guru','500.000','160','45','20','1','3','2025-12-10 03:04:51.924'),(3,'M. Rizky Kurniawan Lasim','Laki-laki','1234567890123456','1234567890123456','Surabaya','2004-12-14','12345678901234567890','Islam','Indonesia','Jl Perlis Utara 7/3','Orang Tua','3','7','081554133818','Mat Lasim','1234567890123456','1962','SMA','Karyawan Swasta','5.000.000','Wahyuningsih','1234567890123456','1967','S1','Guru TK','500.000','110','20','45','3','2','2025-12-10 03:04:51.924');
/*!40000 ALTER TABLE `Ppdb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProgramsSection`
--

DROP TABLE IF EXISTS `ProgramsSection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProgramsSection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProgramsSection`
--

LOCK TABLES `ProgramsSection` WRITE;
/*!40000 ALTER TABLE `ProgramsSection` DISABLE KEYS */;
INSERT INTO `ProgramsSection` VALUES (1,'Gerak Ceria: Program Tari untuk Anak Usia Dini','Program TK Tari dirancang khusus untuk anak usia dini agar mereka bisa mengekspresikan diri melalui gerakan dan musik. Melalui kegiatan menari, anak-anak belajar koordinasi tubuh, ritme, kreativitas, dan percaya diri. Program ini juga membantu perkembangan sosial anak karena mereka belajar bekerja sama dalam kelompok dan menghargai teman-teman sekelas. Setiap sesi dikemas menyenangkan dengan lagu-lagu ceria dan gerakan yang sesuai dengan usia, sehingga anak-anak dapat belajar sambil bermain dan bergerak aktif.','https://res.cloudinary.com/dpnvqfibi/image/upload/v1763444096/program-section/zwonpheu8jotuq5npbcg.jpg','2025-11-18 05:34:57.387','2025-12-09 15:56:53.805'),(2,'Si Kecil Hebat: Program Karate Anak Usia Dini','Program Karate TK dirancang untuk membentuk disiplin, fokus, dan rasa percaya diri anak sejak usia dini. Anak-anak belajar gerakan dasar karate, teknik sederhana, serta nilai-nilai sportivitas dan tanggung jawab. Melalui latihan yang menyenangkan dan aman, program ini membantu anak mengembangkan kekuatan fisik, koordinasi motorik, dan kontrol diri, sambil menanamkan rasa percaya diri dan keberanian sejak dini.','https://res.cloudinary.com/dpnvqfibi/image/upload/v1765295866/program-section/rpru11qetoxfzqtlzasz.jpg','2025-11-18 05:42:28.001','2025-12-10 14:54:44.602'),(3,'Kreativitas Anak: Menggambar dan Mewarnai','Program Menggambar dan Mewarnai dirancang untuk mengembangkan kreativitas, imajinasi, dan kemampuan motorik halus anak. Anak-anak belajar mengenal bentuk, warna, dan komposisi melalui kegiatan menggambar dan mewarnai yang menyenangkan. Program ini membantu anak mengekspresikan ide dan perasaan mereka, sekaligus meningkatkan fokus, kesabaran, dan kemampuan berpikir kreatif sejak usia dini.','https://res.cloudinary.com/dpnvqfibi/image/upload/v1765295918/program-section/v7n4ov0hbt3bnme3qtxd.jpg','2025-12-09 15:58:39.216','2025-12-09 15:58:39.216');
/*!40000 ALTER TABLE `ProgramsSection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teacher`
--

DROP TABLE IF EXISTS `Teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tugas` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher`
--

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;
INSERT INTO `Teacher` VALUES (1,'Wahyuningsih, S.Pd. ','Kepala Sekolah','Kepala Sekolah','2025-12-09 16:00:14.692','2025-12-09 16:01:00.029',''),(3,'Dwi Putri Puspita Lasim, S.Kom.','Guru','Guru Kelompok A','2025-12-09 16:01:19.695','2025-12-11 07:24:55.024','https://res.cloudinary.com/dpnvqfibi/image/upload/v1765437894/guru/yfwce51vjhbc1heqlfvb.jpg'),(4,'Khois Al Khairiyah, S.Pd.','Guru','Guru Kelompok B','2025-12-11 07:17:45.391','2025-12-11 07:28:11.765','https://res.cloudinary.com/dpnvqfibi/image/upload/v1765438091/guru/z6hidbztpmhsiptgun7j.jpg');
/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'admin@gmail.com','$2b$10$LFD11fhMpA4c2lAjkawPJej3Gc6Wntdb4t5W2zfUDjUbPHz6BIuce','2025-11-17 04:54:47.586');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('320899bb-aa71-46e9-b417-239897b9796e','371d04e2374f7b6f46f96a5cf67dad1ea71a7cbccb02464fc1a3ec3745d1b0ec','2025-12-09 11:36:38.242','20251209113638_create_ppdb_table',NULL,NULL,'2025-12-09 11:36:38.213',1),('41eb5504-396b-4c8a-93fc-d31ec7e6c04e','0ae250c2ccfcdd3721ecc5ab4f387f8e1496804ae0e4b5c53ca13a3b1b396d8c','2025-11-17 04:54:40.184','20251026051229_add_autoincrement',NULL,NULL,'2025-11-17 04:54:40.164',1),('4a3f37ba-2c10-41dd-a55a-12a3dfb402e9','c531590107916d438bd5e65cb5835c40dd16fdf00e1ebf88772671b6b7217a31','2025-11-17 04:54:40.265','20251026094905_add_string',NULL,NULL,'2025-11-17 04:54:40.247',1),('5d7660ba-9d64-4bb0-b39e-222210e981cb','b10ec8ac68adb77fec0d1115b6520e5ab1a28a8d4dcf1cdcee1874424824525c','2025-11-17 04:54:40.133','20251018150414_add_hero_section',NULL,NULL,'2025-11-17 04:54:40.119',1),('5fcd7755-1deb-411d-b5d2-11561d9b37e7','aa3892deee35ed541fe17da1e4abf4ced3a1e9ae49f713f6e7560c4a44afafd8','2025-11-17 04:54:40.098','20251018142922_add_hero_section',NULL,NULL,'2025-11-17 04:54:40.084',1),('6cdf0c2a-e72b-4ac2-968d-53d7cea8e6ea','f211fd7040d448c0f03bcdbf16fc9912bea08dfa29d1392cf6daf64f56ede8ac','2025-11-17 04:54:40.145','20251026045427_add_programs_section',NULL,NULL,'2025-11-17 04:54:40.134',1),('7223d18f-efc9-4c8f-836e-0bb70bcc75f0','94e1d426c8af12e4581eb7ec160a03e133eeb047663c3c8a980c97a5ae24f32b','2025-11-17 04:54:40.225','20251026091005_add_about',NULL,NULL,'2025-11-17 04:54:40.216',1),('742b2b96-8a35-4aa8-ac0f-941ca264bb93','6596766ad87f8a77e4965cf2c423478d95115a41071d9cae2bc747037590a5d9','2025-12-10 03:04:51.971','20251210030451_add_contact_message',NULL,NULL,'2025-12-10 03:04:51.918',1),('791225bb-e16c-4562-a8e8-addfea2319ac','8064adafe13cefbeb67b6a8d2f68d3c1730acbd11209b6cf3ceccf7a793d61c1','2025-11-17 04:54:40.215','20251026064432_add_carousel',NULL,NULL,'2025-11-17 04:54:40.205',1),('7f787b60-c650-4f9b-aed9-8e704e04b652','50fb0a82fa2bb19335fd9bbb578364ad361d1e1476d5a4b6647e85385375ea39','2025-11-17 04:54:40.204','20251026063511_update_programs_description_type',NULL,NULL,'2025-11-17 04:54:40.185',1),('9f4abb1e-f49c-416d-87fd-7cf994ceafee','d2864d5ecddcd345b85dfaac87e50997da2b8894e6b6501dbdca4f1da5e9bc01','2025-11-17 04:54:40.069','20251018103833_init',NULL,NULL,'2025-11-17 04:54:40.056',1),('c05cd2ab-3f4c-4c61-8b56-7893b047a981','f25ba4febf86b408095b424207c9ee22ab9fa6f7f5db35ebdaa84bf3254b10d3','2025-11-17 04:54:40.163','20251026045503_add_programs_section',NULL,NULL,'2025-11-17 04:54:40.146',1),('c06352f3-cb14-4f67-8fce-cd2ee9018215','256b013adccc9aec076e5c4a5db0261402435dd0566793a5548fdf56f2bb6ab6','2025-11-17 04:54:40.083','20251018141445_add_hero_section',NULL,NULL,'2025-11-17 04:54:40.071',1),('c1d53baa-32a9-4e88-b84c-ece7eb40314c','ffb825c818ecf48a921525cee4c5ebe4a5ac7e2911ef5445cd21c065f82887a6','2025-11-17 04:54:40.293','20251026101752_fix_teachers',NULL,NULL,'2025-11-17 04:54:40.277',1),('c6d34c79-c594-49ae-b8d9-721f986fb1ae','d41d04779d330e32393507bcbf1c54f9ae19ae51d667214d6ba645cd038e7714','2025-11-17 04:54:40.276','20251026101444_add_teachers',NULL,NULL,'2025-11-17 04:54:40.266',1),('d7204c6d-dc6c-4ff2-9a6e-149884befbd7','d5df3d6d8dac92f34975bdf8dfad7fd1d076efee4ffdfb32ccb451e1662971a1','2025-11-17 04:54:40.246','20251026091938_add_text',NULL,NULL,'2025-11-17 04:54:40.226',1),('e0a9c334-1f36-47f0-a883-32d17575fd48','e47500f7033683c212e500b12b7b387d7e8b6454a3e94e698c6cac76f662a1a7','2025-11-17 04:54:40.118','20251018145336_add_hero_section',NULL,NULL,'2025-11-17 04:54:40.100',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27  7:19:34
