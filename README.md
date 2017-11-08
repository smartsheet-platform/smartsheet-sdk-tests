# wiremock-scenario-templating
Scripts for packaging and deploying a custom WireMock server.

## Requirements
* Node 6.11 or newer

## Usage
This repository provides a number of scripts that can be used to bundle a WireMock server with Smartsheet scenario configuration files. It also contains scripts that can be used by Travis builds to install and run a WireMock server bundle.

## Creating Scenarios
Scenarios can either be written by hand following the scenario spec here (TODO: document spec) or by converting a Postman collections export file.

### Converting Postman Export Files
Scenario files can be created from Postman export files, version 2. See [here](https://www.getpostman.com/docs/postman/collections/data_formats) for information on how to export a Postman collection. Scenario files are converted using the `convert_from_postman.js` script:

```bash
$ node convert_from_postman.js --collection=path/to/collection.json --output=my_scenarios.json
```

Once the scenario file has been converted, it must be cleaned up a bit. Postman variables will have to be converted into literals, the url path may need to be changed from absolute to relative, extra headers (such as `Authorization`) should be removed, and data should be sanitized.

## Bundling Packages
To bundle a package, run the following in a bash terminal:

```bash
$ sh package.sh my-package path/to/custom/wiremock.jar
```

When called successfully, the new package (both a directory and zip) will be created in the current directory. The server can be run using the provided launch script:

```bash
$ sh my-package/launch.sh
```

## Releasing a Package
To release a package, create a new release in GitHub and upload the ZIP file created in [Bundling Packages](#bundling-packages). When you are ready for Travis to start using your new package, follow the instructions in [Updating Release in Travis](#updating-release-in-travis)

## Using with Travis CI
Travis can use this package to run the Smartsheet WireMock mock API server. This package contains two scripts to use with Travis: an install script and a start script. The install script downloads a WireMock bundle unzips it. The start script runs WireMock in the background and waits for WireMock to warm-up.

### Configuring SDKs to Run the Mock API
Add the following to your SDK's `.travis.yml` configuration file to run the WireMock server:

```yaml
before_install:
  - git clone https://github.com/stollgr/wiremock-scenario-templating.git
  - wiremock-scenario-templating/travis_scripts/install_wiremock.sh

script:
  - wiremock-scenario-templating/travis_scripts/start_wiremock.sh
  # run SDK specific functional and mock API tests
```

For example, the Node SDK's `.travis.yml` configuration is:

```yaml
before_install:
  - git clone https://github.com/stollgr/wiremock-scenario-templating.git
  - wiremock-scenario-templating/travis_scripts/install_wiremock.sh

script:
  - wiremock-scenario-templating/travis_scripts/start_wiremock.sh
  - npm test
```

Follow the instructions in [Updating Release in Travis](#updating-release-in-travis) to configure the current release.

### Updating Release in Travis
The install script currently downloads the WireMock bundle based on the `MOCK_API_RELEASE_URL` environment variable. To update this, you will need to update the `MOCK_API_RELEASE_URL` variable in each of the SDK-specific Travis jobs. See [here](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings) for more information about configuring environment variables in Travis.
