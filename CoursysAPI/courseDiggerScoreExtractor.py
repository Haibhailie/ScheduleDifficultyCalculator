import requests

baseURL = "http://www.coursediggers.com/data/{}.json"
sfuID = [3, 4]


urls = [baseURL.format(i) for i in range(1, 20376)]
for url in urls:
    print("Scraping: " + url)
    course_page = requests.get(url)
    if course_page.status_code == requests.codes.ok:
        course_page_json = course_page.json()
        if course_page_json['metadata']['dataSource']['id'] in sfuID:
            course_name = None
            median_grade = None
            fail_percentage = None
            num_students = 0
