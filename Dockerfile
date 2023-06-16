FROM maven:3.9.2-eclipse-temurin-11 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:20
WORKDIR /app
COPY --from=build /app/target/*.jar /usr/app/app.jar

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/AlgoMathDB
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=123

ENV MINIO_URL=http://localhost:9000
ENV MINIO_ACCESS_KEY=minioadmin
ENV MINIO_SECRET_KEY=minioadmin

EXPOSE 8080

CMD ["java", "-jar", "/usr/app/app.jar"]
