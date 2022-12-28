FROM maven:3.8.6-amazoncorretto-8 as build
WORKDIR /app
COPY . .    
RUN mvn package     
EXPOSE 8080
CMD ["java", "-jar", "/app/target/spring-1.0-SNAPSHOT.jar"]
