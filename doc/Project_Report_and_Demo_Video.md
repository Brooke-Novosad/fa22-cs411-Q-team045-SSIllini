Project Report 


Demo Video: https://youtu.be/9l9fVf7hMmA


1. Please list out changes in directions of your project if the final project is different from your original proposal (based on your stage 1 proposal submission).

    Some of the changes we made from our proposal was storing login information like usernames and passwords. We decided to use the students username and store that in the students table and not have a login table. We also mainly wanted it to be used for students uploading their class schedules to track the classes they went to on time, but we decided to make it more broad and just to check in if you did a habit. The layout of our website is also different from our proposal. 

2. Discuss what you think your application achieved or failed to achieve regarding its usefulness.

	Our application achieved using an incentive to help people reach their goals. Every time someone logs a habit, they will receive an animal. Some of the animals in our database are rare animals so it gets people excited to complete and log habits to get a cool animal. Our application failed to achieve logging specific habits. Currently we only have 4 habits based on integers, so if someone using this application wanted to follow a habit we didn’t support, they would not be able to log it. 

3. Discuss if you changed the schema or source of the data for your application

    We did change the schema of our database tables compared to our proposal when we began to implement them so that we could write queries more easily and efficiently. The source of the data did not change since we were planning on randomly generating data. 

4. Discuss what you change to your ER diagram and/or your table implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design? 

    In the original design, we used the student name instead of student login as foreign keys for the non-student tables. We changed this because student names have spaces in them and student login do not, and we thought that having no spaces made things easier for querying. We also changed the primary key of some of our tables from a single key to a composite key in order to be able to insert records we think should be in them, ex. checking into the same habit multiple times for each student.

5. Discuss what functionalities you added or removed. Why?

    We added the feature that finds a group of individuals based on similar interests in hopes of connecting users together. In the future when the trading system is adding the feature allows for like-minded individuals to see each other's items and suggest trades.

6. Explain how you think your advanced database programs complement your application.

    The trigger we implemented streamlines the item collection process, where whenever a user’s history has been logged as a success, an item is automatically added to the inventory. The stored procedure is an auxiliary feature that returns similar users and the items they have available, allowing for much more user interaction.

7. Each team member should describe one technical challenge that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project.

    -Rainy: Connecting to GCP with Node.js was quite challenging since none of us had experience with either GCP or Node.js prior to this assignment. It took several GCP help articles, both official and unofficial, before we were able to set up the connection and test our code locally, ranging from articles that talked about how to create and download service account keys, articles that talked about how to use the cloud sql proxy, and articles that talked about how to connect to the actual database with code using Node.js.

    -Brooke: During the midterm demo, we did not have our trigger working yet so we had a query to insert the habit into the students history, a query to insert the habit into the Classes_habits table, and a query to add a random animal to the students inventory. We were having trouble doing 3 queries at once on node.js. We found out that we could have 1 giant query separated by semicolons to run all the queries at the same time. This was more of a syntax thing we learned since there are many different ways to do this but this is the way that worked best for us.

    -Landon: testing queries and functionalities of the database was difficult to do in the terminal. To make this more manageable I made sure to set delimiters properly and have a copy of the code I was testing in some sort of text editor. Depending on the error in the shell I would go back to change the code and re-insert it into the terminal along with the commands to test the code.
    
    -Michael: I struggled with the syntax of SQL when implementing it through the GCP terminal.

8. Are there other things that changed comparing the final application with the original proposal?

    We added more additional features that we thought of during the project, like connecting users together based on common habits. The application itself mostly exists on one page as opposed to our original plan that included multiple pages. Originally we also planned to introduce an item-merging, but it would have been unintuitive to users since all items are not unique except for name.

9. Describe future work that you think, other than the interface, that the application can improve on

    We could add a trading system that allows users to connect with others and trade animals. We could also make item rewards a chance to obtain with every successful habit, with the chance increasing successively with each failure to obtain. Another thing we originally had on our proposal was having a password for each username so that someone can’t just change someone else's inventory or habits. 

10. Describe the final division of labor and how well you managed teamwork. 

    Rainy - Helped with project description, converted ER diagram to relational schema, modify and uploaded data to GCP and implemented tables, wrote the majority of frontend code, fixed advanced queries, wrote functionality of trigger, presented at midterm and final demo, participated in making the demo video.

    Brooke - Helped with project description, created ER Diagram, obtained data for database, assisted Rainy with the coding for the midterm demo and helped with errors, wrote stored procedure, presented at midterm and final demo, helped with project report and made demo video.

    Landon - Came up with project idea, helped with project description, wrote advanced queries, implemented stored procedure into database

    Michael - Helped with project description, carried out indexing tests for tables, completed trigger and implemented into database

