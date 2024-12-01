INSERT INTO employees (id, name, positionId, positionName, parentId) VALUES
(1, 'CTO', 1, 'Chief Technology Officer', NULL),
(2, 'Name 2', 2, 'Senior software eng', 1),
(3, 'Name 3', 3, 'Software eng', 2),
(4, 'Name 4', 4, 'Junior software eng', 3),
(5, 'Name 5', 2, 'Senior software eng', 1),
(6, 'Name 6', 3, 'Software eng', 5);