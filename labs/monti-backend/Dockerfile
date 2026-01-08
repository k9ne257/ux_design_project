#FROM eclipse-temurin:21-jdk-alpine
#
#WORKDIR /app
#RUN mvn -DskipTests package
#COPY /target/*.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]

# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

# Copy pom.xml first (enables Docker layer caching)
COPY pom.xml .

# Download dependencies (cached unless pom.xml changes)
RUN mvn -B -DskipTests dependency:go-offline

# Copy source code
COPY src ./src

# Build the jar
RUN mvn -B -DskipTests package


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /build/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
