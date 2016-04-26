--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `graphs`
--

CREATE TABLE `graphs` (
  `userId` int(11) NOT NULL,
  `graphId` int(11) NOT NULL,
  `Graph` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `graphs`
--

INSERT INTO `graphs` (`userId`, `graphId`, `Graph`) VALUES
(2, 1, '[[[100,1],[100,3],[100,4]],[[100,0],[100,2]],[[100,1]],[[100,0],[100,4]],[[100,0],[100,3]]]'),
(2, 7, '[[[100,1],[100,3],[100,4],[3,5]],[[100,0],[100,2]],[[100,1]],[[100,0],[100,4]],[[100,0],[100,3]],[[3,0],[3,7]],[[1,7]],[[1,6],[3,5]]]'),
(2, 8, '[[[100,1],[100,3],[100,4],[3,6]],[[100,0],[100,2]],[[100,1],[3,5]],[[100,0],[100,4]],[[100,0],[100,3]],[[3,2]],[[3,0]]]'),
(2, 9, '[[[100,1],[100,3],[100,4]],[[100,0],[100,2]],[[100,1]],[[100,0],[100,4]],[[100,0],[100,3]],[[3,6],[12,8]],[[3,5],[1,7]],[[1,6],[3,8]],[[12,5],[3,7]]]'),
(1, 10, '[[[100,1],[100,3],[100,4]],[[100,0],[100,2],[23,6]],[[100,1],[3,5]],[[100,0],[100,4]],[[100,0],[100,3]],[[3,2]],[[23,1]]]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Usernam` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Users and passwords';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Usernam`, `Password`) VALUES
(1, 'Pavel', '123456'),
(2, 'Ima', 'login'),
(3, 'vsushnost', 'nqma'),
(4, 'Dido', 'yolo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `graphs`
--
ALTER TABLE `graphs`
  ADD PRIMARY KEY (`graphId`,`userId`),
  ADD UNIQUE KEY `graphId` (`graphId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Id_3` (`Id`),
  ADD KEY `Id` (`Id`),
  ADD KEY `Id_2` (`Id`),
  ADD KEY `Id_4` (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `graphs`
--
ALTER TABLE `graphs`
  MODIFY `graphId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
