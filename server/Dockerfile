# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Copy the actual JAR file correctly
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
