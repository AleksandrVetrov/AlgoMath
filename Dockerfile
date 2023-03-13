FROM openjdk:11-jdk-slim
WORKDIR /app
COPY target/algomath.jar /app
CMD ["java", "-jar", "algomath.jar"]
