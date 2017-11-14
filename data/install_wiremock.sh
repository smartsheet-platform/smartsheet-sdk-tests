#!/usr/bin/env sh

# exit on error
set -e

WIREMOCK_MAVEN='https://search.maven.org/remotecontent?filepath=com/github/tomakehurst/wiremock/2.11.0/wiremock-2.11.0.jar'
WIREMOCK_INSTALL_DIR='./libs'

# download wiremock
cd $WIREMOCK_INSTALL_DIR
curl -O -L -s --url $WIREMOCK_MAVEN 
