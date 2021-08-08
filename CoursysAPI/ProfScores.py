import dataclasses
import json
from dataclasses import dataclass


@dataclass
class ProfScoresDTO:
    instructor: str
    course: str
    courseDiggerMeanGrade: float
    courseDiggerFailRate: float
    RMPscore: float

    def returnJson(self):
        profJson = json.dumps(dataclasses.asdict(self))
        return profJson
