CREATE TABLE "employee" (
    "id" INT PRIMARY KEY AUTO_INCREMENT,
    "name" VARCHAR(255) NOT NULL,
    "positionId" INT NOT NULL,
    "positionName" VARCHAR(255) NOT NULL,
    "parentId" INT NULL,
    FOREIGN KEY ("parent_id") REFERENCES employees (id) ON DELETE CASCADE
);