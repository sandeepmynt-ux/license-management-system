# H2 TCP server - shared database for all microservices
FROM eclipse-temurin:17-jre-alpine

# H2 version aligned with Spring Boot 3.2
ENV H2_VERSION=2.2.224

RUN apk add --no-cache curl netcat-openbsd \
    && curl -fsSL -o /h2.jar "https://repo1.maven.org/maven2/com/h2database/h2/${H2_VERSION}/h2-${H2_VERSION}.jar" \
    && apk del curl

EXPOSE 9092

VOLUME /data

# -tcp: start TCP server
# -tcpAllowOthers: allow connections from other hosts (containers)
# -baseDir: where to store DB files
CMD ["java", "-cp", "/h2.jar", "org.h2.tools.Server", "-tcp", "-tcpPort", "9092", "-tcpAllowOthers", "-baseDir", "/data"]
