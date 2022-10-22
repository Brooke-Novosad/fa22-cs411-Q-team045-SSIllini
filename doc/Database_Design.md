# Database Design

## DDL commands 

We made slight changes to our database design since the last stage, namely deciding to use the student login as primary key instead of student name.

### Students table

![Students table](./images/students.png)

```sql
CREATE TABLE Students (Name VARCHAR(255), Location VARCHAR(255), Login VARCHAR(255), PRIMARY KEY (Login));
```

![Students count](./images/StudentsCount.png)

### Habits table

![Habits table](./images/habits.png)

```sql
CREATE TABLE Classes_Habits(Habit INT NOT NULL, Student VARCHAR(255) NOT NULL, Location VARCHAR(255), Time DATETIME, PRIMARY KEY (Habit, Student), FOREIGN KEY (Student) REFERENCES Students(Login));
```

![Habits count](./images/Classes_HabitsCount.png)

### Inventory table

![Inventory table](./images/inventory.png)

```sql
CREATE TABLE Inventory(Student VARCHAR(255) NOT NULL, Item VARCHAR(255) NOT NULL, PRIMARY KEY(Student, Item), FOREIGN KEY (Student) REFERENCES Students(Login) ON DELETE CASCADE);
```

![Inventory count](./images/InventoryCount.png)

### History table

![History table](./images/history.png)

```sql
CREATE TABLE History(Time DATETIME, Student VARCHAR(255), Habit INT, PRIMARY KEY (Time, Student, Habit), FOREIGN KEY(Student) REFERENCES Students(Login), FOREIGN KEY(Habit)
REFERENCES Classes_Habits(Habit));
```

![History count](./images/HistoryCount.png)

### Queries

This variable is to designate the currently logged-in student

```sql
DECLARE currentStudent AS VARCHAR(255)
```

This first query is to display a student's schedule with times they successfully followed that habit

```sql
SELECT DISTINCT Habit, Location, COUNT(y.Time)
FROM Habits h JOIN History y ON y.Habit=h.Habit
WHERE h.Student=currentStudent
GROUP BY Habit
ORDER BY h.Time
```

This second query displays a students inventory and calculate the relative rarity of an item compared to how many exist in other student's inventories

```sql
SELECT Item, COUNT(Student) rarity
FROM Inventory
GROUP BY Item HAVING EXISTS(SELECT Item FROM Inventory WHERE Student=currentStudent)
ORDER BY rarity DESC
```



