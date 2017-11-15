#!/usr/bin/env sh

# exit on error
set -e

WIREMOCK_DOWNLOAD="smartsheet-sdk-tests/sdk_tests_package.zip"
WIREMOCK_INSTALL_DIR='Smartsheet-WireMock-Bundle'


# unzip wiremock
unzip -qq -d $WIREMOCK_INSTALL_DIR $WIREMOCK_DOWNLOAD
