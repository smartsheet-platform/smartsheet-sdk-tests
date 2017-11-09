#!/usr/bin/env sh

WIREMOCK_JAR='wiremock.jar'
EXTENSION_JAR='extension.jar'
MAIN_CLASS='com.github.tomakehurst.wiremock.standalone.WireMockServerRunner'

EXTENSION='ApiScenarioTransformer'

PORT=8082

# launch wiremock
java  -cp "$WIREMOCK_JAR:$EXTENSION_JAR" $MAIN_CLASS --extensions=$EXTENSION  --port=$PORT
