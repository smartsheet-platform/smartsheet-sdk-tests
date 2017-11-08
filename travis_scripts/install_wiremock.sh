#!/usr/bin/env sh

# exit on error
set -e

WIREMOCK_DOWNLOAD='Smartsheet-WireMock-Bundle.zip'
WIREMOCK_INSTALL_DIR='Smartsheet-WireMock-Bundle'

if [ -z "$MOCK_API_RELEASE_URL" ]; then
    echo "Must set MOCK_API_RELEASE_URL environment variable"
    exit 1
fi

# download wiremock
curl $MOCK_API_RELEASE_URL -L -s -o $WIREMOCK_DOWNLOAD

# unzip wiremock
unzip -qq -d $WIREMOCK_INSTALL_DIR $WIREMOCK_DOWNLOAD
