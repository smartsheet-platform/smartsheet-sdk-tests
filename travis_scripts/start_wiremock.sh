#!/usr/bin/env sh

WIREMOCK_PACKAGE_DIR='sdk_tests_package'

# run wiremock
(cd $WIREMOCK_PACKAGE_DIR; ./launch.sh &)

# wait for wiremock to start
sleep 10
