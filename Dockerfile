# Build frontend
FROM node:16 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./ 
RUN npm install --legacy-peer-deps
COPY frontend ./ 
RUN npm run build

# Build backend
FROM maven:3.8.3-openjdk-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml . 
COPY backend/.mvn ./.mvn
COPY backend/mvnw ./mvnw
COPY backend/src ./src
RUN chmod +x mvnw
RUN mvn clean install -DskipTests
RUN mvn clean package -DskipTests

# Final image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=backend-build /app/backend/target/*.jar ./app.jar
COPY --from=frontend-build /app/frontend/build /app/frontend/build

ENV PORT=8080
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]