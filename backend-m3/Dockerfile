FROM openjdk:17
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} backend-m3-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/backend-m3-0.0.1-SNAPSHOT.jar"]