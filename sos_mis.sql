-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2025 at 04:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sos_mis`
--

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `Mark_Id` int(11) NOT NULL,
  `Trainee_Id` int(11) DEFAULT NULL,
  `Trade_Id` int(11) DEFAULT NULL,
  `Module_Id` int(11) DEFAULT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `Formative_Ass` float DEFAULT NULL CHECK (`Formative_Ass` between 0 and 100),
  `Summative_Ass` float DEFAULT NULL CHECK (`Summative_Ass` between 0 and 100),
  `Comprehensive_Ass` float DEFAULT NULL CHECK (`Comprehensive_Ass` between 0 and 100),
  `Total_Marks_100` float DEFAULT NULL CHECK (`Total_Marks_100` between 0 and 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`Mark_Id`, `Trainee_Id`, `Trade_Id`, `Module_Id`, `User_Id`, `Formative_Ass`, `Summative_Ass`, `Comprehensive_Ass`, `Total_Marks_100`) VALUES
(1, 1, 2, 2, 3, 20, 80, 90, 63.3),
(2, 2, 3, 3, 2, 90, 89, 78, 86);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `Module_Id` int(11) NOT NULL,
  `ModName` varchar(100) NOT NULL,
  `ModCredits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`Module_Id`, `ModName`, `ModCredits`) VALUES
(2, 'Database', 200),
(3, 'Frontend Development', 30);

-- --------------------------------------------------------

--
-- Table structure for table `trades`
--

CREATE TABLE `trades` (
  `Trade_Id` int(11) NOT NULL,
  `Trade_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trades`
--

INSERT INTO `trades` (`Trade_Id`, `Trade_Name`) VALUES
(2, 'Mathematic Studies'),
(3, 'Software development');

-- --------------------------------------------------------

--
-- Table structure for table `trainees`
--

CREATE TABLE `trainees` (
  `Trainees_Id` int(11) NOT NULL,
  `FirstNames` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Gender` enum('Male','Female','Other') NOT NULL,
  `Trade_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainees`
--

INSERT INTO `trainees` (`Trainees_Id`, `FirstNames`, `LastName`, `Gender`, `Trade_Id`) VALUES
(1, 'Shyaka', 'Carrick', 'Male', 2),
(2, 'Mwesigye', 'Elton', 'Male', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Users_Id` int(11) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Users_Id`, `UserName`, `Password`) VALUES
(2, 'Carrick', '$2b$10$TAO4G0a4ZSKofPPTvebvjOhdD.LMh0ESTUSy7CVJikvdBAudI26H.'),
(3, 'Bruno', '$2b$10$3FLQJr07ZpxbqAHDe3Ky0u6mS6LGyuO.UUUkkD0dNOtuZzpqQsWwi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`Mark_Id`),
  ADD KEY `Trainee_Id` (`Trainee_Id`),
  ADD KEY `Trade_Id` (`Trade_Id`),
  ADD KEY `Module_Id` (`Module_Id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`Module_Id`);

--
-- Indexes for table `trades`
--
ALTER TABLE `trades`
  ADD PRIMARY KEY (`Trade_Id`);

--
-- Indexes for table `trainees`
--
ALTER TABLE `trainees`
  ADD PRIMARY KEY (`Trainees_Id`),
  ADD KEY `Trade_Id` (`Trade_Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Users_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `Mark_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `Module_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trades`
--
ALTER TABLE `trades`
  MODIFY `Trade_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trainees`
--
ALTER TABLE `trainees`
  MODIFY `Trainees_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Users_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `marks`
--
ALTER TABLE `marks`
  ADD CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`Trainee_Id`) REFERENCES `trainees` (`Trainees_Id`),
  ADD CONSTRAINT `marks_ibfk_2` FOREIGN KEY (`Trade_Id`) REFERENCES `trades` (`Trade_Id`),
  ADD CONSTRAINT `marks_ibfk_3` FOREIGN KEY (`Module_Id`) REFERENCES `modules` (`Module_Id`),
  ADD CONSTRAINT `marks_ibfk_4` FOREIGN KEY (`User_Id`) REFERENCES `users` (`Users_Id`);

--
-- Constraints for table `trainees`
--
ALTER TABLE `trainees`
  ADD CONSTRAINT `trainees_ibfk_1` FOREIGN KEY (`Trade_Id`) REFERENCES `trades` (`Trade_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
