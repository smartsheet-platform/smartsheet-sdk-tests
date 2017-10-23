#!/usr/bin/env sh

SCENARIO=$1
WIREMOCK_JAR=$2
SCENARIO_MAIN='main.rb'
WIREMOCK_ROOT_REL_PATH='.wiremock_root' # temporary wiremock root directory

if [ ! -f $SCENARIO ]; then
    echo 'Could not find scenario file'
fi

if [ ! -f $WIREMOCK_JAR ]; then
    echo 'Could not find wiremock JAR'
fi

WIREMOCK_ROOT="$(cd "$(dirname "$WIREMOCK_ROOT_REL_PATH")"; pwd)/$(basename "$WIREMOCK_ROOT_REL_PATH")"
SCENARIO_PATH="$WIREMOCK_ROOT/__files/__scenarios/scenarios.json"
MAPPINGS_DIR="$WIREMOCK_ROOT/mappings/"

# make wiremock root directory
mkdir -p "$WIREMOCK_ROOT/__files/__scenarios/"
mkdir -p "$WIREMOCK_ROOT/mappings/"

cp $SCENARIO $SCENARIO_PATH

# add mappings
ruby main.rb $SCENARIO $MAPPINGS_DIR

# launch wiremock
java -jar $WIREMOCK_JAR --extensions=com.smartsheet.wiremock.extensions.ApiScenarioTransformer --port=8082 --root-dir=$WIREMOCK_ROOT

# clean up configuration
rm -rf $WIREMOCK_ROOT_REL_PATH
