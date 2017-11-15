var should = require('should');

var postmanToScenario = require('../lib/postman_to_scenario');


describe("Postman to Scenario Test", function () {
    describe("#postmanCollectionToScenarios", function () {
        it("returns the correct number of scenarios", function() {
            var collection = givenFullCollection(10);

            var scenarios = postmanToScenario.postmanCollectionToScenarios(collection);

            scenarios.length.should.equal(10);
        });

        it("parses items in folders", function() {
            var collection = givenCollectionWithFolders();

            var scenarios = postmanToScenario.postmanCollectionToScenarios(collection);

            scenarios.length.should.equal(7);
        });

        function givenNestedFolder() {
            // has four items
            return {
                "name": "testNestedFolder",
                "description": "it is a nested folder!",
                "variable": [],
                "item": [
                    givenFullItem(),
                    givenMinimalItem(),
                    givenShallowFolder()
                ]
            };
        }

        function givenShallowFolder() {
            // has two items
            return {
                "name": "testShallowFolder",
                "description": "it is a shallow folder!",
                "variable": [],
                "item": [
                    givenFullItem(),
                    givenFullItem()
                ]
            };
        }

        function givenFullCollection(numItems) {
            var items = [];
            for (var i = 0; i < numItems; i++) {
                items.push(givenFullItem());
            }

            return _givenCollection(items);
        }

        function givenCollectionWithFolders() {
            // has 7 items
            return _givenCollection([givenNestedFolder(), givenShallowFolder(), givenMinimalItem()]);
        }

        function _givenCollection(items) {
            return {
                "info": {},
                "item": items,
                "event": [],
                "variable": [],
                "auth": {}
            };
        }
    });

    describe("#postmanItemToScenario", function() {
        it("sets the scenario name correctly", function() {
            var item = givenMinimalItem();

            var scenario = postmanToScenario.postmanItemToScenario(item);

            scenario.scenario.should.equal("testMinimalItem");
        });

        it("sets the scenario description correctly", function() {
            var item = givenFullItem();

            var scenario = postmanToScenario.postmanItemToScenario(item);

            scenario.description.should.equal("This is a test!");
        });

        describe("scenario request", function () {
            it("sets the url path correctly", function() {
                var item = givenMinimalItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.request.urlPath.should.equal("{{smartsheet-url}}/sheets/1/rows");
            });

            it("removes query parameters from url path", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.request.urlPath.should.equal("{{smartsheet-url}}/sheets/1/rows");
            });

            it("sets the url path correctly with string url", function() {
                var item = givenItemWithStringUrl();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.request.urlPath.should.equal("http://api.smartsheet.com/2.0/sheets");
            });

            it("sets the url path correctly with string request", function() {
                var item = givenItemWithStringRequest();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.request.urlPath.should.equal("http://api.smartsheet.com/2.0/sheets");
            });

            it("sets the method correctly", function() {
                var item = givenMinimalItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.request.method.should.equal("GET");
            });

            it("sets the method correctly with string request", function() {
                var item = givenItemWithStringRequest();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.request.method.should.equal("GET");
            });

            it("sets the headers correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.exist(scenario.request.headers['Content-Type']);
                scenario.request.headers['Content-Type'].should.equal("application/json");
                should.exist(scenario.request.headers['Some-Type']);
                scenario.request.headers['Some-Type'].should.equal("blah/json");
            });

            it("doesn't set headers with string request", function() {
                var item = givenItemWithStringRequest();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.request.headers);
            });

            it("doesn't set the headers when not specified", function() {
                var item = givenMinimalItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.request.headers);
            });

            it("sets the query parameters correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.exist(scenario.request.queryParameters['query']);
                scenario.request.queryParameters['query'].should.equal("param");
            });

            it("doesn't set query parameters with string request", function() {
                var item = givenItemWithStringRequest();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.request.queryParameters);
            });

            it("doesn't set query parameters when not specified", function() {
                var item = givenMinimalItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.request.queryParameters);
            });

            it("sets the body correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.exist(scenario.request.body);
                scenario.request.body[0].id.should.equal(10);
            });

            it("doesn't set body when not specified", function() {
                var item = givenMinimalItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.request.body);
            });

            it("doesn't set body when body mode isn't raw", function() {
                var item = givenItemWithUrlEncodedBody();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.request.body);
            });
        });

        describe("scenario response", function () {
            it("uses first response if multiple specified", function() {
                var item = givenItemWithMultipleResponses();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.response.statusMessage.should.equal("test1");
            });

            it("sets empty response if not specified", function() {
                var item = givenItemWithNoResponses();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.response.should.eql({});
            });

            it("sets the status message correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.response.statusMessage.should.equal("Forbidden");
            });

            it("sets the status code correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.response.status.should.equal(403);
            });

            it("sets the headers correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.exist(scenario.response.headers['Connection']);
                scenario.response.headers['Connection'].should.equal('close');
                should.exist(scenario.response.headers['Content-Encoding']);
                scenario.response.headers['Content-Encoding'].should.equal('gzip');
            });

            it("doesn't set headers when not specified", function() {
                var item = givenMinimalItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                should.not.exist(scenario.response.headers);
            });

            it("sets the body correctly", function() {
                var item = givenFullItem();

                var scenario = postmanToScenario.postmanItemToScenario(item);

                scenario.response.jsonBody.errorCode.should.equal(1004);
            });
        });
    });

    function givenFullItem() {
        return _givenItem("testFullItem", _givenFullRequest(), _givenFullResponse());
    }

    function givenItemWithStringRequest() {
        return _givenItem("testStrRequest", "http://api.smartsheet.com/2.0/sheets", []);
    }

    function givenMinimalItem() {
        return _givenItem("testMinimalItem", _givenMinimalRequest(), _givenMinimalResponse("Forbidden"))
    }

    function givenItemWithStringUrl() {
        return _givenItem("testStringUrlItem", _givenRequestWithStringUrl(), _givenMinimalResponse("Forbidden"))
    }

    function givenItemWithUrlEncodedBody() {
        return _givenItem("testUrlEncBodyItem", _givenRequestWithUrlEncodedBody(), _givenMinimalResponse("Forbidden"))
    }

    function givenItemWithMultipleResponses() {
        var responses = _givenMinimalResponse("test1").concat(_givenMinimalResponse("test2"));
        return _givenItem("testMultRespItem", _givenMinimalRequest(), responses);
    }

    function givenItemWithNoResponses() {
        return _givenItem("testNoRespItem", _givenMinimalRequest(), []);
    }

    function _givenMinimalRequest() {
        return {
            "method": "GET",
            "header": [],
            "body": {},
            "url": {
                "raw": "{{smartsheet-url}}/sheets/1/rows",
                "host": [
                    "{{smartsheet-url}}"
                ],
                "path": [
                    "sheets",
                    "1",
                    "rows"
                ]
            },
            "description": ""
        };
    }

    function _givenRequestWithStringUrl() {
        return {
            "method": "GET",
            "header": [],
            "body": {},
            "url": "http://api.smartsheet.com/2.0/sheets",
            "description": ""
        };
    }

    function _givenRequestWithUrlEncodedBody() {
        return {
            "method": "GET",
            "header": [],
            "body": {
                "mode": "urlencoded",
                "urlencoded": [{"key": "blah", "value": "blahValue"}]
            },
            "url": "http://api.smartsheet.com/2.0/sheets",
            "description": ""
        };
    }

    function _givenMinimalResponse(status) {
        return [
            {
                "id": "cc2fc00c-001d-440b-80b3-6342390c12e6",
                "name": "test",
                "originalRequest": {
                    "method": "GET",
                    "header": [],
                    "body": {},
                    "url": "{{smartsheet-url}}/sheets/1/rows"
                },
                "status": status,
                "code": 403,
                "_postman_previewlanguage": "json",
                "_postman_previewtype": "text",
                "header": [],
                "cookie": [],
                "responseTime": 263,
                "body": "{}"
            }
        ];
    }

    function _givenFullRequest() {
        return {
            "method": "PUT",
            "header": [
                {
                    "key": "Content-Type",
                    "value": "application/json"
                },
                {
                    "key": "Some-Type",
                    "value": "blah/json"
                }
            ],
            "body": {
                "mode": "raw",
                "raw": "[\n  {\n    \"id\": 10,\n    \"cells\": [\n      1,\n      2\n    ]\n  }\n]"
            },
            "url": {
                "raw": "{{smartsheet-url}}/sheets/1/rows?query=param",
                "host": [
                    "{{smartsheet-url}}"
                ],
                "path": [
                    "sheets",
                    "1",
                    "rows"
                ],
                "query": [
                    {
                        "key": "query",
                        "value": "param"
                    }
                ]
            },
            "description": "This is a test!" // TODO: description can be object
        };
    }

    function _givenFullResponse() {
        return [
            {
                "id": "cc2fc00c-001d-440b-80b3-6342390c12e6",
                "name": "test",
                "originalRequest": {
                    "method": "PUT",
                    "header": [
                        {
                            "key": "Content-Type",
                            "value": "application/json"
                        }
                    ],
                    "body": {
                        "mode": "raw",
                        "raw": "[\n  {\n    \"id\": 10,\n    \"cells\": [\n      1,\n      2\n    ]\n  }\n]"
                    },
                    "url": "{{smartsheet-url}}/sheets/1/rows"
                },
                "status": "Forbidden",
                "code": 403,
                "_postman_previewlanguage": "json",
                "_postman_previewtype": "text",
                "header": [
                    {
                        "key": "Connection",
                        "value": "close",
                        "name": "Connection",
                        "description": "Options that are desired for the connection"
                    },
                    {
                        "key": "Content-Encoding",
                        "value": "gzip",
                        "name": "Content-Encoding",
                        "description": "The type of encoding used on the data."
                    }
                ],
                "cookie": [],
                "responseTime": 263,
                "body": "{\n  \"errorCode\" : 1004,\n  \"message\" : \"You are not authorized to perform this action.\",\n  \"refId\" : \"1fitkjpsy6h2e\"\n}"
            }
        ];
    }

    function _givenItem(name, request, response) {
        return {
            "name": name,
            "description": "it's an item!",
            "variable": [],
            "event": [],
			"request": request,
			"response": response
        };
    }
});
