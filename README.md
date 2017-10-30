# wiremock-scenario-templating
A script for packaging a custom WireMock server.

## Building Packages
To build a package, run the following in a bash terminal:

```bash
$ sh package.sh my-package path/to/custom/wiremock.jar
```

When called successfully, the new package (both a directory and zip) will be created in the current directory. The server can be run using the provided launch script:

```bash
$ sh my-package/launch.sh
```

## Releasing a Package
To release a package, create a new release in GitHub and upload the ZIP file created in [Building Packages](#building-packages). When you are ready for the SDKs running Travis to start using your package, update the download link in the Travis install script [Updating Release in Install Script](#updating-release-in-install-script)

## Using with Travis CI
Travis can use this package to run the Smartsheet WireMock mock API server. This package contains two scripts to use with Travis: an install script and a start script. The install script downloads a WireMock bundle unzips it. The start script runs WireMock in the background and waits for WireMock to warm-up.

### Configuring SDKs to Run the Mock API
Add the following to your SDKs `.travis.yml` configuration file to run the WireMock server:

```yaml
before_install:
  - git clone https://github.com/stollgr/wiremock-scenario-templating.git
  - wiremock-scenario-templating/travis_scripts/install_wiremock.sh
  # install SDK dependencies

script:
  - wiremock-scenario-templating/travis_scripts/start_wiremock.sh
  # run SDK specific functional and mock API tests
```

### Updating Release in Install Script
The install script currently downloads the WireMock bundle based on a hard-coded string. To update this, you will need to update the `RELEASE_DOWNLOAD_URL` variable in travis_scripts/install_wiremock.sh. Once this has been updated and pushed to master, any future SDK Travis builds will run using the new mock server release
