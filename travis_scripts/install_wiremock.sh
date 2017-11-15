#!/usr/bin/env sh

# exit on error
set -e

INSTALL_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WIREMOCK_DOWNLOAD="$INSTALL_SCRIPT_DIR/../sdk_tests_package.zip"
WIREMOCK_INSTALL_DIR='Smartsheet-WireMock-Bundle'


# unzip wiremock
unzip -qq -d $WIREMOCK_INSTALL_DIR $WIREMOCK_DOWNLOAD
