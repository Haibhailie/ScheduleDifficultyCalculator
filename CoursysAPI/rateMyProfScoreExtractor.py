import re
import requests
from urllib.request import urlopen

#
headers = {
    "User-Agent": "Mozilla/91.0 (Windows NT 10.0; Win64; x64) Chrome/92.0.4515.131"
}


class makeRMPRequest:
    def returnScoreOfProf(schoolId: str = "U2Nob29sLTE0ODI", teacherName: str = "Greg+Baker"):

        profRMPURL = makeRMPRequest.getProfURL(schoolId, teacherName)
        if(profRMPURL == "NA"):
            return -1
        else:
            encodedHTML = urlopen(profRMPURL).read().decode('utf-8')
            teacherPageData = re.findall(r'\">(.*?)</', encodedHTML)
            score = teacherPageData[25][-3:]
            score = re.sub('[^A-Za-z0-9-.]+', '', score)
            return float(score)

    def getProfURL(schoolId: int = "U2Nob29sLTE0ODI", teacherName: str = "Greg+Baker"):
        url = "https://www.ratemyprofessors.com/search/teachers?query=" + \
            teacherName+"&sid="+schoolId+"="
        page = requests.get(url=url, headers=headers)
        pageData = page.text
        pageDataTemp = re.findall(r'ShowRatings\.jsp\?tid=\d+', pageData)
        if len(pageDataTemp) > 0:
            pageDataTemp = re.findall(
                r'ShowRatings\.jsp\?tid=\d+', pageData)[0]
            finalUrl = "https://www.ratemyprofessors.com/" + pageDataTemp
            return finalUrl
        else:
            return "NA"
