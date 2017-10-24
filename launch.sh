#!/usr/bin/env sh

WIREMOCK_JAR='wiremock.jar'
PORT=8082

# launch wiremock
java -jar $WIREMOCK_JAR --extensions=com.smartsheet.wiremock.extensions.ApiScenarioTransformer --port=$PORT
