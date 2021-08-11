FROM ubuntu:20.04

LABEL maintainer="Shashank Thanalapati"
LABEL version="0.1"
LABEL description="This is custom Docker Image for \
  CMPT383 Project 3 - Backend Files."

RUN apt update

RUN apt-get update && \
  apt-get install -y openjdk-8-jdk && \
  apt-get install -y ant && \
  apt-get clean;

RUN apt-get update && \
  apt-get install ca-certificates-java && \
  apt-get clean && \
  update-ca-certificates -f;

ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

RUN apt-get update \
  && apt-get install -y python3-pip python3-dev \
  && cd /usr/local/bin \
  && ln -s /usr/bin/python3 python \
  && pip3 --no-cache-dir install --upgrade pip \
  && rm -rf /var/lib/apt/lists/*

RUN apt-get update\
  && apt-get install maven -y

RUN apt-get update \
  && apt-get install nodejs npm -y

COPY /course_calculator/ /course_calculator/
WORKDIR /course_calculator
RUN npm install

WORKDIR /

COPY /CMPT383-API /CMPT383-API
COPY /CoursysAPI /CoursysAPI

WORKDIR /CoursysAPI
RUN pip install -r requirements.txt

WORKDIR /CMPT383-API
RUN mvn clean install -DskipTests
RUN mvn package -DskipTests


WORKDIR /
EXPOSE 8080
ENTRYPOINT ["java","-jar","/CMPT383-API/target/CMPT383-API-0.0.1-SNAPSHOT.jar"]

WORKDIR /course_calculator
EXPOSE 3000
RUN npm install
RUN npm start &