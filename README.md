# wiremock-scenario-templating
A script for packaging a custom WireMock server.

## Usage
To build a package, run the following in a bash terminal:

```bash
$ sh package.sh my-package path/to/custom/wiremock.jar
```

When called successfully, the new package will be created in the current directory. The server can be run using the provided launch script:

```bash
$ sh my-package/launch.sh
```
