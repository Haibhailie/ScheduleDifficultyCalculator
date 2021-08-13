# CMPT383 Project - SFU Schedule Workload Calculator

*Why waste so much time researching about courses and professors when this application does it all for you?*

**Project Specification/Goal:**
------

- The Workload Calculator is an application that unifies all the research that students do prior to enrolling into courses in a single, accessible environment.
- It uses the Coursys API to ensure that it only shows relevant courses pertaining to each semester.
- It scrapes RateMyProf and CourseDiggers for information and refines them into a way that is understandable and describable.
- It will display approximate workload per week.
- It will display an overall difficulty score.


**Languages:**
------
1. **Java - Systems:** The backend of the program will be running on Java:

	- Handles the REST API that is implemented into the container.
	- Handles the arithmetics and logic behind calculating the difficulty.
	- Creates Data transfer Objects to create the bridge between scraping and front-end.


2. **Python - Scripting:** The scripting language:

	- Handles all the webscraping:
		- Performs web scraping on RateMyProf and returns difficulty, and rating
		- Performs web scraping on CourseDiggers and returns difficulty, and fail rate
	- The main reason that I picked these two is because one is based on the professor and one is based on the course so even without one, we will have the other hence resulting in a basic idea on the difficulty.
	- Creates DTOs and passes it to Java.


3. **React/Typescript - Scripting, Frontend:**

	- Handles the frontend and UI aspects of the application
	- Creates API calls based on the user's input to the dropdowns
	- Does some basic calculation in the frontend using the data
	- Makes the Coursys API calls to retrieve the Departments, Courses and Sections per semester to ensure relevancy.

**Communication Methods:**
------

1. Between Java and Python - **Inter Process Communication**:
```
1. My Java application creates a subprocess inside itself that runs the Python script
2. Python script webscrapes, compiles meaningful data into a DTO
3. Returns that DTO in an output stream and Java picks it up and parses it
```
2. Between Java and React - **Spring Boot REST API**
```
1. The user enters the required courses (limited to dropdowns to ensure scope)
2. Upon submitting, the frontend makes an API call to the backend (Java REST API) and receives a JSON of the data response.
3. Frontend then parses it and uses it accordingly.
```
**Instructions to run:**
------
Once the repository has been pulled:
1. Run `docker compose build` from the root of the repository.
 (**NOTE**: Allow 15 - 20 minutes to build on first build as it is an ubuntu container and needs to install JDK, Python, Node, Maven and PIP. Both the frontend and backend ports are contained into this single container).

2.  Once built, run `docker compose up` and the container should start up both Spring and npm:

3. Once the container is up, you should be able to access the Web-Application using:  [Localhost Port 3000](http://localhost:3000/)

4. The backend can be accessed using [Localhost Port 8080](http://localhost:8080/) and the following is the API call format:
```
	Base URL: http://localhost:8080/courseAPI/getCourse/{year}
	Request Parameters:
	- term (Spring, Summer, Fall)
	- dep (CMPT, ENSC, PSYC etc.)
	- courseNum (300, 310, 383 etc.)
	- section (D100, O400 etc.)
```

**Key features:**
------

- Allows the user to add up to 6 courses in one semester
- User can then add and see the individual difficulties of courses.
- Once all the courses are added, clicking on the calculate difficulty button will compute all of them and give a result of the overall difficulty of the semester with data such as estimated workload (hours per week)
- The courses that appear in the dropdown only do so after the previous one has been made since clicking on a dropdown triggers an API call to coursys that takes single steps so data is accurate with respect to each semester
- Refresh all removes all the courses and refreshes the page for a new input
- If you look at the Python directory (CoursysAPI/CourseDiggerScoreExtractor.py), you'll see an unused function that created a json since scraping through coursedigger to find a specific course took too long and this JSON made an ordered pair of all courses with the name and the code.
- I used regex (LOL)
