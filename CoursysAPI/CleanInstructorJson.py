import json

# Fetches the instructor from the list with 3 cases:
# 1. No instructor present
# 2. 1 instructor present
# 3. Several instructor present (selects first one)


def cleanInstructorJson(instructorJson: str):
    if(len(instructorJson) == 0):
        return "Instructor Not Found"
    elif(instructorJson[0] == '[' and instructorJson[-1] == ']'):
        startPoint = instructorJson.index("{")
        endPoint = instructorJson.index("}", startPoint) + 1
        instructorJson = instructorJson[startPoint:endPoint]
        instructorName = json.loads(instructorJson)['name']
        return instructorName
