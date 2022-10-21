# Database Design

## DDL commands 

We made slight changes to our database design since the last stage, namely deciding to use the student login as primary key instead of student name.

### Students table

![Students table](./images/students.png)

CREATE TABLE Students (Name VARCHAR(255), Location VARCHAR(255), Login VARCHAR(255), PRIMARY KEY (Login));

### Habits table

![Habits table](./images/habits.png)

CREATE TABLE Classes_Habits(Habit INT NOT NULL, Student VARCHAR(255) NOT NULL, Location VARCHAR(255), Time DATETIME, PRIMARY KEY (Habit, Student), FOREIGN KEY (Student) REFERENCES Students(Login));

### Inventory table

![Inventory table](./images/inventory.png)

CREATE TABLE Inventory(Student VARCHAR(255) NOT NULL, Item VARCHAR(255) NOT NULL, PRIMARY KEY(Student, Item), FOREIGN KEY (Student) REFERENCES Students(Login) ON DELETE CASCADE);

### History table

![History table](./images/history.png)

CREATE TABLE History(Time DATETIME, Student VARCHAR(255), Habit INT, PRIMARY KEY (Time, Student, Habit), FOREIGN KEY(Student) REFERENCES Students(Login), FOREIGN KEY(Habit)
REFERENCES Classes_Habits(Habit));