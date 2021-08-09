from CourseDiggerScores import CourseDiggerScoreDTO
import requests
from multiprocessing.dummy import Pool as ThreadPool
import json

baseURL = "http://www.coursediggers.com/data/{}.json"


def scrapeCourseDiggerForCourse(searchCourseName: str = "CMPT 300"):

    # Use this when intellij
    jsonFile = open("../CoursysAPI/courseIDPair.json")
    #jsonFile = open("CoursysAPI/courseIDPair.json")
    jsonData = json.load(jsonFile)
    websiteCourseID = 0
    for i in jsonData['courseIDPairs']:
        if(i['courseName'] == searchCourseName):
            websiteCourseID = i['courseID']

    courseURL = baseURL.format(websiteCourseID)
    coursePage = requests.get(courseURL)

    if coursePage.status_code == requests.codes.ok:
        coursePageJsonFile = coursePage.json()
        if coursePageJsonFile['metadata']['dataSource']['id'] in [3, 4]:
            name = None
            grade = None
            failrate = None

            if 'name' in coursePageJsonFile:
                name = coursePageJsonFile['name']

            if 'data' in coursePageJsonFile:
                grade = coursePageJsonFile['data'][0][0]
                failrate = coursePageJsonFile['data'][0][1]
        courseDiggerScore = CourseDiggerScoreDTO(
            courseName=name, meanGrade=grade, failRate=failrate)
        return courseDiggerScore
    else:
        courseDiggerScore = CourseDiggerScoreDTO(
            courseName=searchCourseName, meanGrade="B+", failRate=5)
        return courseDiggerScore


def generateCoursesIDPairJson():
    # This function was used to scrape every single SFU course from Course Diggers and save it into a json
    # Saving it because scraping took too long and the above function will access the saved database, then call the URL using the course ID
    jsonFile = open("CoursysAPI/courseIDPair.json", 'a')
    jsonURLList = [baseURL.format(i) for i in range(1, 20376)]

    courseID = 1
    jsonFile.write("{\"courseIDPairs\": [")
    for presentURL in jsonURLList:
        coursePage = requests.get(presentURL)
        if coursePage.status_code == requests.codes.ok:
            toWrite = ("{\"courseName\":\"" + coursePage.json()
                       ['name'] + "\", \"courseID\":" + str(courseID) + "},\n")
            jsonFile.write(toWrite)
        courseID = courseID+1
    jsonFile.write("\n]}")
