-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2022 at 02:58 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ccmpoa_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_requests`
--

CREATE TABLE `account_requests` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `date_requested` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_requests`
--

INSERT INTO `account_requests` (`id`, `email`, `message`, `date_requested`, `status`) VALUES
(1, 'mb@gmail.com', '1234', '2022-10-26 07:34:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `ann_id` int(11) NOT NULL,
  `ann_name` varchar(200) NOT NULL,
  `ann_date` date NOT NULL,
  `ann_time` time NOT NULL,
  `ann_description` text NOT NULL,
  `ann_address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`ann_id`, `ann_name`, `ann_date`, `ann_time`, `ann_description`, `ann_address`) VALUES
(13, 'Sample Event', '2022-10-26', '22:01:00', 'Surigao City Music Festival', 'Surigao City');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment_postID` int(11) NOT NULL,
  `comment_userID` int(11) NOT NULL,
  `comment_userName` varchar(100) NOT NULL,
  `comment_content` text NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment_totalLikes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_postID`, `comment_userID`, `comment_userName`, `comment_content`, `comment_date`, `comment_totalLikes`) VALUES
(25, 76, 57, 'Jimmy Neutron', 'Hi Jerry boi! Good to see you.', '2022-07-19 11:24:22', 0),
(26, 89, 57, 'Jimmy Neutron', 'This is just a test i want to test if the comment is working.', '2022-09-14 11:57:02', 0),
(27, 89, 57, 'Jimmy Neutron', 'I want to test this again', '2022-09-14 11:57:19', 0),
(28, 89, 57, 'Jimmy Neutron', 'Why commenting causes errors?', '2022-09-14 11:57:55', 0),
(29, 89, 57, 'Jimmy Neutron', 'Testing 2 comments on one go!', '2022-09-14 11:58:13', 0),
(30, 106, 64, 'CCMPOA BoardMember', 'Wanted ba to?', '2022-09-30 03:21:41', 0);

-- --------------------------------------------------------

--
-- Table structure for table `company_info`
--

CREATE TABLE `company_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company_info`
--

INSERT INTO `company_info` (`id`, `user_id`, `firstname`, `lastname`, `email`, `phone`) VALUES
(20, 43, 'Christian', 'Pelitones', 'admin@test.', '09054576953'),
(21, 44, 'John', 'Doe', 'jd@gmail.co', '1234'),
(22, 45, 'Christian', 'Pelitones', 'admin@ccmpo', '1234'),
(23, 46, '1234', 'Phil', 'ceta@phil.c', '1234'),
(24, 47, '1234', 'Pelitones', 'pelitonesch', '1234'),
(25, 48, 'Jamie', 'Butler', 'jamiebutler', '09099596995'),
(26, 49, 'Jerry', 'Boi', 'jerryboi@gm', '1234'),
(28, 51, 'Master', 'Christian', 'masterchris', '09099569559'),
(29, 52, 'Eric', 'Butler', 'ericbutler@gmail.com', '1234'),
(30, 53, 'Another', 'Test', 'atest@gmail.com', '09099596559'),
(31, 54, 'FIle', 'Upload', 'fileUpload@gmail.com', '+639099648667'),
(32, 55, 'wqer', 'qwer', 'qwer@gmail.com', '1234'),
(33, 56, 'ffasdsfadsf', 'asdfdfsdsfafsad', 'dfafdsafdsa@test.com', '1234'),
(34, 57, 'Jimmy', 'Neutron', 'jimmy.neutron@ccmpoa.org', '1234'),
(35, 58, 'Christian', 'Pelitones', 'jimmy.neutron@ccmpoa.org', '1234'),
(36, 59, 'Lofi', 'Beats', 'lofi-beats@lofi.com', '09099648667'),
(37, 60, 'Dell', 'Rio', 'del-rio@ccmpoa.org', '09099495596'),
(38, 61, '1234', '1234', '1123@gmail.com', '1234'),
(39, 62, 'Affiliate', 'Affiliate', 'affiliate@ccmpoa.org', '1234'),
(40, 63, 'huawei', 'sample', 'hs@gmail.com', '1234'),
(41, 64, 'CCMPOA', 'BoardMember', 'cb@ccmpoa.org', '1234567889'),
(42, 65, 'Jerico', 'Natad', 'jnatad@ccmpoa.org', '1231231234'),
(43, 66, 'Mavis Cassidy', 'Aquino', 'mavis@gmail.com', '1231231234'),
(44, 67, 'Mikey', 'Bustos', 'mb@gmail.com', '1234'),
(45, 68, 'Mikey', 'Bustos', 'mb@gmail.com', '1234'),
(46, 69, 'Mikey', 'Bustos', 'mb@gmail.com', '1234'),
(47, 70, 'walalang', 'walalang', 'walalng@gmail.com', '1234'),
(48, 71, 'Escape', 'Plan', 'ep@gmail.com', '1234'),
(49, 72, 'Eric', 'Santos', 'ericsantos@gmail.com', '1234'),
(50, 82, 'James', 'Caraan', '', '09054576953');

-- --------------------------------------------------------

--
-- Table structure for table `marketplace`
--

CREATE TABLE `marketplace` (
  `mp_id` int(11) NOT NULL,
  `mp_ownerID` int(11) NOT NULL,
  `mp_ownerName` varchar(250) NOT NULL,
  `mp_name` varchar(200) NOT NULL,
  `mp_description` text NOT NULL,
  `mp_price` int(11) NOT NULL,
  `mp_location` text NOT NULL,
  `mp_image` text NOT NULL,
  `mp_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `marketplace`
--

INSERT INTO `marketplace` (`mp_id`, `mp_ownerID`, `mp_ownerName`, `mp_name`, `mp_description`, `mp_price`, `mp_location`, `mp_image`, `mp_date`) VALUES
(24, 57, 'Jimmy Neutron', 'Christian Pelitones', '123', 123, 'Surigao City', 'Copy of Copy of Fall 2022 Class Product Cards (7).png', '2022-09-30 01:46:13'),
(25, 57, 'Jimmy Neutron', 'This is just a sample', 'I just want this sample', 20000, 'Davao', 'Copy of Copy of Fall 2022 Class Product Cards (2).png', '2022-09-30 01:46:55'),
(26, 57, 'Jimmy Neutron', 'Land Master', 'This is just a sample', 2000, 'Manila City', 'maria-gisladottir-jUKQcocX17c-unsplash.jpg', '2022-09-30 01:55:37'),
(27, 57, 'Jimmy Neutron', 'Sample Product For Sale', 'This is product is just a sample and I just want to test if this works.', 200, 'Sample', 'Right Side.jpg', '2022-09-30 03:03:06'),
(28, 57, 'Jimmy Neutron', 'test', 'sample', 20, 'Surigao', 'Copy of Copy of Fall 2022 Class Product Cards (4).png', '2022-09-30 03:05:51'),
(29, 67, 'Mikey Bustos', 'This is just a sample', 'Sample website', 200, 'Surigao City', 'Copy of Copy of Fall 2022 Class Product Cards (1).png', '2022-10-25 03:48:35');

-- --------------------------------------------------------

--
-- Table structure for table `member_code`
--

CREATE TABLE `member_code` (
  `id` int(11) NOT NULL,
  `user_role` varchar(100) NOT NULL,
  `member_code` varchar(100) NOT NULL,
  `date_generated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_name` varchar(200) NOT NULL,
  `user_email` varchar(300) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member_code`
--

INSERT INTO `member_code` (`id`, `user_role`, `member_code`, `date_generated`, `user_name`, `user_email`, `status`) VALUES
(13, 'Board Member', 'rujfy6u5', '2022-09-30 10:09:39', 'Escape Plan', 'ep@gmail.com', '1'),
(14, 'Homeowner', '74y7g5vh', '2022-09-30 10:22:27', '', '', '0'),
(15, 'Board Member', '0ypvud97', '2022-09-30 10:23:38', 'Eric Santos', 'ericsantos@gmail.com', '1'),
(16, 'Homeowner', '3v0wpe35', '2022-10-25 12:07:52', '', '', '0');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `post_userID` int(11) NOT NULL,
  `post_userName` varchar(100) NOT NULL,
  `post_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `post_content` text NOT NULL,
  `post_totalLikes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_userID`, `post_userName`, `post_date`, `post_content`, `post_totalLikes`) VALUES
(67, 49, 'Jerry Boi', '2022-07-15 08:48:50', 'This is just a test post!', 0),
(77, 57, 'Jimmy Neutron', '2022-07-19 11:56:47', 'I am testing this!', 0),
(78, 57, 'Jimmy Neutron', '2022-07-19 11:57:59', 'I am testing this again!', 0),
(82, 57, 'Jimmy Neutron', '2022-07-19 12:08:57', 'I just want to test', 0),
(83, 57, 'Jimmy Neutron', '2022-07-19 12:09:41', 'one last time!', 0),
(84, 57, 'Jimmy Neutron', '2022-07-19 12:10:34', 'one last last!', 0),
(85, 57, 'Jimmy Neutron', '2022-07-19 12:12:20', 'One last time test', 0),
(101, 60, 'Dell Rio', '2022-09-14 15:48:45', 'This is my post without an image', 0),
(102, 60, 'Dell Rio', '2022-09-14 15:49:04', 'Thisi s my post with an image attached.', 0),
(103, 57, 'Jimmy Neutron', '2022-09-16 13:40:03', 'THis is just a test', 0),
(104, 63, 'huawei sample', '2022-09-19 08:20:29', 'This is a sample post!', 0),
(105, 57, 'Jimmy Neutron', '2022-09-30 02:58:34', 'This is just a sample', 0),
(106, 64, 'CCMPOA BoardMember', '2022-09-30 03:21:29', 'Wanted!', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_images`
--

CREATE TABLE `post_images` (
  `post_image_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `post_imageName` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post_images`
--

INSERT INTO `post_images` (`post_image_id`, `post_id`, `post_imageName`) VALUES
(1, 79, '7Uzpydya2T.jpg'),
(2, 80, 'GiCvlHqbAO.jpg'),
(3, 81, 'AkgjgDYcnS.jpg'),
(4, 82, 'vVZfnuVCmL.jpg'),
(5, 83, 'ZAh8PtvPVA.jpg'),
(6, 84, '2a5CzYYgyb.jpg'),
(7, 85, 'NKsWIKYdOH.jpg'),
(8, 86, ''),
(9, 87, 'hrbMaPzREp.jpg'),
(10, 88, 'CJQ47HeuOo.jpg'),
(11, 89, '2vsGeaEhW8.jpg'),
(12, 90, ''),
(13, 91, ''),
(14, 92, ''),
(15, 93, ''),
(16, 94, 'hSmaXNVYpQ.jpg'),
(17, 97, 'LDM0fxxCUq.jpg'),
(18, 98, '6YEwFRGf57.jpg'),
(19, 99, 'e8jNTVuRBn.jpg'),
(20, 100, 'fiV6fXQqtx.jpg'),
(21, 101, ''),
(22, 102, 'jMyyRefnND.jpg'),
(23, 103, 'VVYjl6xLOT.jpg'),
(24, 104, 'dnFRgYNkqV.jpg'),
(25, 105, 'OFwDuXXNEI.jpg'),
(26, 106, 'lUyD5fIPQq.jpg'),
(27, 107, '');

-- --------------------------------------------------------

--
-- Table structure for table `pwdreset`
--

CREATE TABLE `pwdreset` (
  `pwdResetId` int(11) NOT NULL,
  `pwdResetEmail` text NOT NULL,
  `pwdResetSelector` text NOT NULL,
  `pwdResetToken` longtext NOT NULL,
  `pwdResetExpires` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(50) NOT NULL,
  `profile_img` varchar(200) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 for approved accounts / 1 for pending accounts'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `profile_img`, `status`) VALUES
(43, 'admin@test.com', '$2y$10$KLkydvX6srjpvDaLoRtgzeA5NfTTYO3GI0WqsR3pNDIrIoPrmjdJq', 'Board Member', '', 0),
(44, 'jd@gmail.com', '$2y$10$2THO1ZdR0fg6DKqdJ3252ukB28FBOYeaKY5CLMqo/RQFNgKlR8/vm', 'Board Member', '', 0),
(45, 'admin@ccmpoa.org', '$2y$10$Ow45IizbmxfaByKgi.14L.iGuRL6V1JP1QNcZqsXQi6en4p0t7/2W', 'Board Member', '', 0),
(46, 'ceta@phil.com', '$2y$10$jDXugDXIflZXdaoiBrtDDuUJ1X.eqvHl4YIQQ/2wpC2cRKZ6.QSGi', 'Board Member', '', 0),
(48, 'jamiebutler@gmail.com', '$2y$10$6NTp9p3f7CJgNo.uFv3wOuojntIxoKF2hLJD2muXGKlNCeTnLsBLa', 'Board Member', '', 0),
(49, 'jerryboi@gmail.com', '$2y$10$mTPKZgjTrmNO4BO7NSIJn.P.A65YyN7jX54PcOtK.LoyYZXl8yQS2', 'Board Member', '', 0),
(51, 'masterchristian@gmail.com', '$2y$10$f2c5LXOtoqPFD6YEmYeBtOUsKYmtH/cwHZ/4DE3H3ysvIH5sJsxr6', 'Board Member', '', 0),
(52, 'ericbutler@gmail.com', '$2y$10$tUEt0G5R3nR3iIYHYYjvDuT25I9nS1ZIsXFfCQmMYokXXiX2SJD8.', 'Board Member', '', 0),
(53, 'atest@gmail.com', '$2y$10$uq7lGNipSsUY8GciZLGl2utnLuM6RhQQZFC4YFOdXcQPZ8uLIWb3e', 'Board Member', 'PnH15c20Od.jpg', 0),
(54, 'fileUpload@gmail.com', '$2y$10$vqEqEPgyikVWXIsypVzIG.AybmywmHOH5qRhYmFRmkjDVA8aoOwV6', 'Board Member', 'kTpybBA4zs.jpg', 0),
(55, 'qwer@gmail.com', '$2y$10$3hCi7DJEUhE6gMZqalc3nufeDjIv.iAifZmBRyLPVb8w2OWX3pxSC', 'Board Member', 'default.png', 0),
(56, 'dfafdsafdsa@test.com', '$2y$10$56R2wMZaCln4/mrqi8HmQOSKbolDzNPdKGQoRrCUKCJ5d.9I/42G.', 'Board Member', 'ATiAimHhbd.jpg', 0),
(57, 'jimmy.neutron@ccmpoa.org', '$2y$10$u.0L1AoYJRu5pEC95PZya.HaqhzIhP45ENRebyc5b/eiu4WK4ZIPy', 'Admin', 'FiycYXnYZq.jpg', 0),
(59, 'lofi-beats@lofi.com', '$2y$10$iOYweMNIyVemSR4IEtYLd.x7nxxW4xxt8QsmDYlAXIGqk2pFa6iMe', 'Board Member', 'rR7B0n3OlK.jpg', 0),
(60, 'del-rio@ccmpoa.org', '$2y$10$xkTYwOiwVQdHqCQsjhVrZ.TXHWlXy3m4bX93esfWYqHZiFeU3Pmjy', 'Board Member', 'lRVWHOAoRd.jpg', 0),
(61, '1123@gmail.com', '$2y$10$6MSSIwrWTcfQpowD2u1PbeZ/MD20JiXbtdJQMnSwECIG8c9PfztJa', 'Homeowner', 'default.png', 0),
(62, 'affiliate@ccmpoa.org', '$2y$10$eJP8pjBEU2coG3Un56hZ6u.sy8kJgYeSq8yZm2vbNtLFnX/BFWZhy', 'Affiliate', 'yQ631gaota.jpg', 0),
(63, 'hs@gmail.com', '$2y$10$SeJMqqBE96cvhhoIq3dYnu3dzgVpZAD07qkDSFJcZJ39Y3dRfmEYq', 'Board Member', 'default.png', 0),
(64, 'cb@ccmpoa.org', '$2y$10$FWedhTW7JOeS1GWFAGhJkuO3mEDHrxognNg8t35u1ITfUy7w1PYPi', 'Board Member', 'CPinh9SmR8.jpg', 0),
(65, 'jnatad@ccmpoa.org', '$2y$10$F.wcvo82l3Sl9YQ9VUslluDNu8cTfb5kEuIlnvXVvnsn2EJUtR7l.', 'Affiliate', 'C99uaSN7Zg.jpg', 0),
(66, 'mavis@gmail.com', '$2y$10$rkCd78l5nCveZJq83kG4OOPSUPK0kFcqO0aXLzrD06v8yXgLLkrxG', 'Homeowner', 'voqma5TVcv.jpg', 0),
(67, 'mb@gmail.com', '$2y$10$ovdCaLOn9AlRiGGILBiFSeFX44ljTZk5YTdptg.afFcNWVxS2eZ7m', 'Board Member', 'XOqE8od5Ro.jpg', 0),
(68, 'mb@gmail.com', '$2y$10$F4C2O/BlOraLaIDnXAEC5.NpPGqY8IAsRiNLrLDUnCzuc9TF0bIyK', 'Board Member', 'XWF4Uk6W0i.jpg', 0),
(69, 'mb@gmail.com', '$2y$10$DKWxpbiIln.BJoILn3ngWeFgBkxfVQJdCVttnRkM2P3QwCYJSy6pe', 'Board Member', 'p3VWQbJJwA.jpg', 0),
(70, 'walalng@gmail.com', '$2y$10$m1P9G4KBXnHsisUzCzslPuwfDVmij3RNTwehyN4jv6J76MmejLx0y', 'Board Member', 'vWxRwdQ1Zw.jpg', 0),
(71, 'ep@gmail.com', '$2y$10$zJ0UMTI/u4AwShiX7htQ1OtMrQbXYNVUKdWx3uAevy4dfWxNrzKWu', 'Board Member', 'vxd3IFANla.jpg', 0),
(72, 'ericsantos@gmail.com', '$2y$10$SxjS14.RwnKgy/Y7G4ClMePzvWDE5C2/VzdUN2yimoRbaAz17sNla', 'Board Member', 'Tff7w060Xy.jpg', 0),
(82, 'lolo@gmail.com', '$2y$10$yTTaKSvKb05uRRhCh2gQQOm12oc0PP10ETohSBZedWO1BgWYgtmNa', 'Board Member', 'QePDLysWuL.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_requests`
--
ALTER TABLE `account_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`ann_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `company_info`
--
ALTER TABLE `company_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marketplace`
--
ALTER TABLE `marketplace`
  ADD PRIMARY KEY (`mp_id`);

--
-- Indexes for table `member_code`
--
ALTER TABLE `member_code`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`post_image_id`);

--
-- Indexes for table `pwdreset`
--
ALTER TABLE `pwdreset`
  ADD PRIMARY KEY (`pwdResetId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_requests`
--
ALTER TABLE `account_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `ann_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `company_info`
--
ALTER TABLE `company_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `marketplace`
--
ALTER TABLE `marketplace`
  MODIFY `mp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `member_code`
--
ALTER TABLE `member_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `post_image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `pwdreset`
--
ALTER TABLE `pwdreset`
  MODIFY `pwdResetId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
