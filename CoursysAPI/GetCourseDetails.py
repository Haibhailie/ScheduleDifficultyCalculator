from CleanInstructorJson import cleanInstructorJson
from CourseDiggerScoreExtractor import scrapeCourseDiggerForCourse, generateCoursesIDPairJson
from dataclasses import dataclass
import json
import sys
import requests
import RateMyProfScoreExtractor as rmpScore
from ProfScores import ProfScoresDTO

full_cmd_arguments = sys.argv
argument_list = full_cmd_arguments[1:]

schoolID = "U2Nob29sLTE0ODI"  # RateMyProf schoool ID for SFU
baseResponse = 'http://www.sfu.ca/bin/wcm/course-outlines?'
year = argument_list[0]
term = argument_list[1]
department = argument_list[2]
course = argument_list[3]
section = argument_list[4]

overallRequest = baseResponse+str(year)+'/' + \
    term+'/'+department+'/'+course+'/'+section
response = requests.get(overallRequest)
response.raise_for_status()
jsonResponse = response.json()
instructorJson = ''

for key, value in jsonResponse.items():
    if(key == "instructor"):
        instructorJson = json.dumps(value)

instructorName = cleanInstructorJson(instructorJson)

score = rmpScore.makeRMPRequest.returnScoreOfProf(teacherName=instructorName)
course = department.upper()+" "+course

courseDiggerScore = scrapeCourseDiggerForCourse(course)
profscore = ProfScoresDTO(instructor=instructorName,
                          course=course,
                          RMPscore=score,
                          courseDiggerMeanGrade=courseDiggerScore.meanGrade,
                          courseDiggerFailRate=courseDiggerScore.failRate)
                          
print(profscore.returnJson())
