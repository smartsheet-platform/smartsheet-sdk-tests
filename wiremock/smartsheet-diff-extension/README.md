# smartsheet-diff-extension
This is a WireMock extension to provide diff responses in the form of Smartsheet errors. When a request fails to match a mapping, the diff extension will perform a comparison between the request and the specified scenario.

## Building
The extension is built using Gradle. To package the extension, run the `clean` and `shadowJar` Gradle tasks. This can be done using either an IDE or via the commandline with:

```bash
$ ./gradlew clean shadowJar
```

This will create a JAR in the `build/libs/` directory.

## Running
The simplest way to run the extension is by creating a bundle using the `package.sh` script and using the provided launch script. If you would like to run the extension without these scripts you can do so using the following command:

```bash
$ java -cp "<Path to Wiremock Standalone JAR>:<Path to Extension>" com.github.tomakehurst.wiremock.standalone.WireMockServerRunner --extension=ApiScenarioTransformer --port=8082 --root-dir=<Path to WireMock root directory>
```
