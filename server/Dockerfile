# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Copy the actual JAR file correctly
RUN apt-get update && apt-get install -y ffmpeg

COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
