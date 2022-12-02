# Final Demo

## Stored Procedure

```sql
CREATE PROCEDURE sp(IN habitnumber INT)
    BEGIN
        DECLARE varstudent VARCHAR(50);
        DECLARE varhabit INT;
        DECLARE exit_loop BOOLEAN DEFAULT FALSE;

        DECLARE cusStu CURSOR FOR SELECT h.Habit, h.Student FROM Classes_Habits h;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET exit_loop = TRUE;

        DROP TABLE IF EXISTS NewTable;
        CREATE TABLE NewTable(student VARCHAR(50) PRIMARY KEY);

        OPEN cusStu;

        cloop: LOOP
            FETCH cusStu INTO varhabit, varstudent;
            IF(exit_loop) THEN
                LEAVE cloop;
            END IF;

            IF(habitnumber=varhabit) THEN
                INSERT INTO NewTable VALUES(varstudent);
            END IF;

        END LOOP cloop;

        CLOSE cusStu;

        SELECT n.student, i.item
        FROM NewTable n NATURAL JOIN Inventory i
        ORDER BY n.student;

    END;
```

## Trigger

```sql
create trigger ins_animal before insert on History for each row
begin
select new.Student into @student;
select new.Habit into @habit;
select new.Time into @time;
insert ignore into Classes_Habits(Student, Habit, Time) values (@student, @habit, @time);
select Item into @new_item from Inventory order by rand() limit 1;
insert ignore into Inventory(Item, Student) values(@new_item, @student);
end;
```