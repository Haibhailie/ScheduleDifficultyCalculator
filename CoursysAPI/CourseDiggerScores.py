import dataclasses
import json
from dataclasses import dataclass


@dataclass
class CourseDiggerScoreDTO:
    courseName: str
    meanGrade: str
    failRate: float
