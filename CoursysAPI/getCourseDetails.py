import os
import sys
import getopt
import requests

full_cmd_arguments = sys.argv
argument_list = full_cmd_arguments[1:]

print(argument_list)

baseResponse = 'http://www.sfu.ca/bin/wcm/course-outlines?'
year = argument_list[0]
term = argument_list[1]
department = argument_list[2]
course = argument_list[3]

overallRequest = baseResponse+str(year)+'/' + \
    term+'/'+department+'/'+course
response = requests.get(overallRequest)

print(response.text)
