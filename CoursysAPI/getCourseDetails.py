import json
import os
import sys
import getopt
import requests
import rateMyProfScoreExtractor as rmpScore

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

instructorJson = json.loads(instructorJson[1:-1])
instructorName = instructorJson['name']
# print(instructorJson['name'])
print(rmpScore.makeRMPRequest.returnScoreOfProf(teacherName=instructorName))
