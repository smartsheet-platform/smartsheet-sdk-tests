#!/usr/bin/env sh

# exit on error
set -e

PACKAGE_NAME='sdk_tests_package'
EXTENSION_JAR_FILENAME='diff-extension.jar'
EXTENSION_JAR="$PACKAGE_NAME/libs/$EXTENSION_JAR_FILENAME"
DATA_SCENARIO_DIR='data/scenarios'
LAUNCH_SCRIPT='data/launch.sh'
PACKAGE_README='data/README.md'
STUB_DEFAULTS='data/stub_defaults.json'

if [ $# -eq 1 ]; then
    EXTENSION_JAR=$1
fi

if [ -z "$EXTENSION_JAR" ] || [ ! -f "$EXTENSION_JAR" ]; then
    echo 'Usage: $0 [diff-extension.jar]'
    echo "    diff-extension.jar - Optional, uses jar in package by default: $PACKAGE_NAME/libs/$EXTENSION_JAR_FILENAME"
    echo ''
    echo 'ERROR: Could not find extension JAR'

    exit 1
fi

PACKAGE_MAPPINGS_DIR="$PACKAGE_NAME/mappings/"
PACKAGE_SCENARIO_DIR="$PACKAGE_NAME/__files/__scenarios/"
PACKAGE_SCENARIOS="$PACKAGE_SCENARIO_DIR/scenarios.json"
TMP_SCENARIOS=".tmp_scenarios.json"

# make wiremock root directory
mkdir -p "$PACKAGE_SCENARIO_DIR"
mkdir -p "$PACKAGE_MAPPINGS_DIR"
echo 'Package directories created'

# add scenario and apply defaults
node concat_scenarios.js --scenarios="$DATA_SCENARIO_DIR" --output="$TMP_SCENARIOS"
echo 'Scenarios concatenated'

node apply_defaults.js --output="$PACKAGE_SCENARIOS" --defaults="$STUB_DEFAULTS" --scenarios="$TMP_SCENARIOS"
rm "$TMP_SCENARIOS"
echo 'Defaults applied'

# add mappings
node gen_mappings.js --scenarios="$PACKAGE_SCENARIOS" --output_dir="$PACKAGE_MAPPINGS_DIR"
echo 'Mappings generated'

# add readme
cp "$PACKAGE_README" "$PACKAGE_NAME/README.md"
node gen_docs.js --scenarios="$PACKAGE_SCENARIOS" >> "$PACKAGE_NAME/README.md"
echo 'Docs generated'

# add wiremock extension JAR
mkdir -p "$PACKAGE_NAME/libs"
if [ "$EXTENSION_JAR" != "$PACKAGE_NAME/libs/$EXTENSION_JAR_FILENAME" ]; then
  cp "$EXTENSION_JAR" "$PACKAGE_NAME/libs/$EXTENSION_JAR_FILENAME"
fi
echo 'Wiremock diff extension included'

# add launch script
cp "$LAUNCH_SCRIPT" "$PACKAGE_NAME/launch.sh"
echo 'Launch script added'

echo 'Package complete'
