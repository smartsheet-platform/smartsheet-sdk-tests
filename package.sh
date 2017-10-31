#!/usr/bin/env sh

PACKAGE_NAME=$1
WIREMOCK_JAR=$2
SCENARIO='data/scenarios.json'
LAUNCH_SCRIPT='data/launch.sh'
PACKAGE_README='data/README.md'
STUB_DEFAULTS='data/stub_defaults.json'

INVALID_INPUT=0
if [ -z $PACKAGE_NAME ]; then
    echo 'Package name must be specified'
    INVALID_INPUT=1
fi

if [ ! -f $SCENARIO ]; then
    echo 'Could not find scenario file'
    INVALID_INPUT=1
fi

if [ -z $WIREMOCK_JAR ] || [ ! -f $WIREMOCK_JAR ]; then
    echo 'Could not find wiremock JAR'
    INVALID_INPUT=1
fi

USAGE_TEXT="Usage: ./$0 package-name wiremock-jar"
if [ $INVALID_INPUT == 1 ]; then
    echo $USAGE_TEXT
    exit 1
fi

WIREMOCK_ROOT="$(cd "$(dirname "$WIREMOCK_ROOT_REL_PATH")"; pwd)/$(basename "$WIREMOCK_ROOT_REL_PATH")"
MAPPINGS_DIR="$PACKAGE_NAME/mappings/"
SCENARIO_DIR="$PACKAGE_NAME/__files/__scenarios/"

# make wiremock root directory
mkdir -p $SCENARIO_DIR
mkdir -p $MAPPINGS_DIR

# add scenario
cp $SCENARIO "$SCENARIO_DIR/scenarios.json"

# add mappings
ruby gen_mappings.rb --stub-defaults $STUB_DEFAULTS $SCENARIO $MAPPINGS_DIR

# add readme
cp $PACKAGE_README "$PACKAGE_NAME/README.md"
ruby gen_docs.rb $SCENARIO >> "$PACKAGE_NAME/README.md"

# add wiremock JAR
cp $WIREMOCK_JAR "$PACKAGE_NAME/wiremock.jar"

# add launch script
cp $LAUNCH_SCRIPT "$PACKAGE_NAME/launch.sh"

# create zip
(cd $PACKAGE_NAME; zip -q -r "$PACKAGE_NAME.zip" *)
mv "$PACKAGE_NAME/$PACKAGE_NAME.zip" .
