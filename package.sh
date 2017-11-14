#!/usr/bin/env sh

# exit on error
set -e

PACKAGE_NAME=$1
EXTENSION_JAR=$2

DATA_SCENARIO_DIR='data/scenarios'
LAUNCH_SCRIPT='data/launch.sh'
INSTALL_WIREMOCK_SCRIPT='data/install_wiremock.sh'
PACKAGE_README='data/README.md'
STUB_DEFAULTS='data/stub_defaults.json'

INVALID_INPUT=0
if [ -z "$PACKAGE_NAME" ]; then
    echo 'Package name must be specified'
    INVALID_INPUT=1
fi

if [ -z "$EXTENSION_JAR" ] || [ ! -f "$EXTENSION_JAR" ]; then
    echo 'Could not find extension JAR'
    INVALID_INPUT=1
fi

USAGE_TEXT="Usage: ./$0 package-name wiremock-standalone.jar diff-extension.jar"
if [ $INVALID_INPUT == 1 ]; then
    echo $USAGE_TEXT
    exit 1
fi

PACKAGE_MAPPINGS_DIR="$PACKAGE_NAME/mappings/"
PACKAGE_SCENARIO_DIR="$PACKAGE_NAME/__files/__scenarios/"
PACKAGE_SCENARIOS="$PACKAGE_SCENARIO_DIR/scenarios.json"
TMP_SCENARIOS=".tmp_scenarios.json"

# make wiremock root directory
mkdir -p "$PACKAGE_SCENARIO_DIR"
mkdir -p "$PACKAGE_MAPPINGS_DIR"

# add scenario and apply defaults
node concat_scenarios.js --scenarios="$DATA_SCENARIO_DIR" --output="$TMP_SCENARIOS"
node apply_defaults.js --output="$PACKAGE_SCENARIOS" --defaults="$STUB_DEFAULTS" --scenarios="$TMP_SCENARIOS"
rm "$TMP_SCENARIOS"

# add mappings
node gen_mappings.js --scenarios="$PACKAGE_SCENARIOS" --output_dir="$PACKAGE_MAPPINGS_DIR"

# add readme
cp "$PACKAGE_README" "$PACKAGE_NAME/README.md"
node gen_docs.js --scenarios="$PACKAGE_SCENARIOS" >> "$PACKAGE_NAME/README.md"

# add wiremock extension JAR
mkdir -p "$PACKAGE_NAME/libs"
cp "$EXTENSION_JAR" "$PACKAGE_NAME/libs/"

# add launch script
cp "$LAUNCH_SCRIPT" "$PACKAGE_NAME/launch.sh"

# add install wiremock script
cp "$INSTALL_WIREMOCK_SCRIPT" "$PACKAGE_NAME/install_wiremock.sh"

# create zip, if zip is defined
if command -v zip >/dev/null 2>&1; then
    (cd "$PACKAGE_NAME"; zip -q -r "$PACKAGE_NAME.zip" *)
    mv "$PACKAGE_NAME/$PACKAGE_NAME.zip" .
fi
