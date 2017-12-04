import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.tomakehurst.wiremock.http.QueryParameter;
import com.github.tomakehurst.wiremock.http.Request;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static net.javacrumbs.jsonunit.JsonAssert.assertJsonEquals;

class RequestDiff {
	private static final String SCENARIO_QUERY_PARAMETERS_FIELD = "queryParameters";
	private static final String SCENARIO_REQUEST_FIELD = "request";
	private static final String SCENARIO_BODY_FIELD = "body";
	private static final String SCENARIO_URL_PATH_FIELD = "urlPath";
	private static final String SCENARIO_METHOD_FIELD = "method";
	private static final String SCENARIO_HEADERS_FIELD = "headers";

	static String getDiff(Request request, JsonNode scenario) {
		return String.format("%s %s %s %s %s",
				diffHeaders(request, scenario),
				diffUrl(request, scenario),
				diffMethod(request, scenario),
				diffQueryParams(request, scenario),
				diffBody(request, scenario)).trim();
	}

	private static String diffBody(Request request, JsonNode scenario) {
		JsonNode scenarioBody = scenario.get(SCENARIO_REQUEST_FIELD).get(SCENARIO_BODY_FIELD);

		String scenarioBodyString = "";
		if(scenarioBody != null){
			scenarioBodyString = scenarioBody.toString();
		}

		String requestBodyString = request.getBodyAsString();
		String diffResult = getJsonDiff(scenarioBodyString, requestBodyString);

		if(diffResult == null || diffResult.isEmpty())	return "";

		String diffMessage = String.format("Compare result: %s    Expected body: %s\n    Actual body:   %s\n", diffResult, scenarioBodyString, requestBodyString);
		return diffMessage;
	}

	private static String getJsonDiff(String scenarioBodyString, String requestBodyString) {
		try {
			assertJsonEquals(scenarioBodyString, requestBodyString);
		}
		catch(AssertionError e) {
			return "Body differs from expectation - " + e.getMessage();
		}

		return "";
	}

	private static String diffUrl(Request request, JsonNode scenario) {
		JsonNode scenarioURL = scenario.get(SCENARIO_REQUEST_FIELD).get(SCENARIO_URL_PATH_FIELD);
		if(scenarioURL == null){
			return "Test scenario's request URL path was not defined or failed to parse.";
		}
		String scenarioURLString = scenarioURL.textValue();
		String requestURLString = request.getUrl().split("\\?")[0];

		scenarioURLString = removeTrailingSlash(scenarioURLString);
		requestURLString = removeTrailingSlash(requestURLString);

		if (requestURLString.equals(scenarioURLString)) {
			return "";
		}

		return formatAssert("URL Match", scenarioURLString, requestURLString);
	}

	private static String removeTrailingSlash(String str) {
		if (str.charAt(str.length() - 1) == '/') {
			return str.substring(0, str.length() - 1);
		}

		return str;
	}

	private static String diffMethod(Request request, JsonNode scenario) {
		JsonNode scenarioMethod = scenario.get(SCENARIO_REQUEST_FIELD).get(SCENARIO_METHOD_FIELD);
		if(scenarioMethod == null){
			return "Test scenario's request method was not defined or failed to parse.";
		}

		String scenarioMethodString = scenarioMethod.textValue().toUpperCase();
		String requestMethodString = request.getMethod().toString().toUpperCase();

		if (requestMethodString.equals(scenarioMethodString)) {
			return "";
		}

		return formatAssert("HTTP Method Match", scenarioMethodString, requestMethodString);
	}

	private static String diffQueryParams(Request request, JsonNode scenario) {
		JsonNode scenarioQueryParams = scenario.get(SCENARIO_REQUEST_FIELD).get(SCENARIO_QUERY_PARAMETERS_FIELD);
		if(scenarioQueryParams == null) {
			ObjectMapper mapper = new ObjectMapper();
			scenarioQueryParams = mapper.createObjectNode();
		}

		return String.format("%s %s",diffExpectedQueryParams(request, scenarioQueryParams), diffUnexpectedQueryParams(request, scenarioQueryParams)).trim();
	}

	private static String diffHeaders(Request request, JsonNode scenario) {
		JsonNode scenarioHeaders = scenario.get(SCENARIO_REQUEST_FIELD).get(SCENARIO_HEADERS_FIELD);

		if(scenarioHeaders == null){
			return "";
		}
		return diffExpectedHeaders(request, scenarioHeaders);
	}

	private static String formatAssert(String assertLabel, String expected, String actual) {
		return String.format("%s Expected: %s Got: %s ", assertLabel, expected, actual);
	}

	private static String diffExpectedHeaders(Request request, JsonNode scenarioHeaders) {
		Iterator<Map.Entry<String, JsonNode>> scenarioHeaderIterator = scenarioHeaders.fields();

		StringBuilder headerDiff = new StringBuilder();
		while(scenarioHeaderIterator.hasNext()) {
			Map.Entry<String, JsonNode> header = scenarioHeaderIterator.next();

			headerDiff.append(diffExpectedHeader(request, header));
		}

		return headerDiff.toString();
	}

	private static String diffExpectedHeader(Request request, Map.Entry<String, JsonNode> header) {
		if (!request.containsHeader(header.getKey())) {
			return String.format("Headers: Expected %s, but not found. ", header.getKey());
		}

		String headerValue = header.getValue().asText();
		String requestValue = request.getHeader(header.getKey());

		if (!headerValue.equals(requestValue)) {
			return formatAssert("Headers:" + header.getKey(), headerValue, requestValue);
		}

		return "";
	}

	private static String diffExpectedQueryParams(Request request, JsonNode scenarioQueryParams) {
		Iterator<Map.Entry<String, JsonNode>> scenarioQueryParamIterator = scenarioQueryParams.fields();

		StringBuilder queryParamDiff = new StringBuilder();
		while(scenarioQueryParamIterator.hasNext()) {
			Map.Entry<String, JsonNode> queryParam = scenarioQueryParamIterator.next();

			queryParamDiff.append(diffExpectedQueryParam(request, queryParam));
		}

		return queryParamDiff.toString();
	}

	private static String diffExpectedQueryParam(Request request, Map.Entry<String, JsonNode> queryParam) {
		QueryParameter requestParam = request.queryParameter(queryParam.getKey());
		if(requestParam == null || !requestParam.isPresent()){
			return String.format("Expected Query Parameters: Expected %s, but not found. ", queryParam.getKey());
		}

		if (!requestParam.containsValue(queryParam.getValue().asText())) {
			return formatAssert("Expected Query Parameter:" + queryParam.getKey(), queryParam.getValue().asText(), requestParam.firstValue());
		}

		return "";
	}


	private static String diffUnexpectedQueryParams(Request request, JsonNode scenarioQueryParams) {
		StringBuilder queryParamDiff = new StringBuilder();
		List<String> requestQueryParamKeys = getRequestQueryParameterKeys(request);
		List<String> scenarioQueryParamKeys = getScenarioQueryParameterKeys(scenarioQueryParams);

		for(String requestParamKey : requestQueryParamKeys) {
			if (!scenarioQueryParamKeys.contains(requestParamKey.trim())) {
				queryParamDiff.append(String.format("Query Parameters: Request contained '%s', but was not expected. ", requestParamKey));
			}
		}
		return queryParamDiff.toString();
	}

	private static List<String> getRequestQueryParameterKeys(Request request) {
		List<String> requestQueryParamKeys = new ArrayList<>();
		String[] requestQueryParamStrings = request.getUrl().split("\\?");
		String requestQueryParamString = null;
		if(requestQueryParamStrings.length == 2){
			requestQueryParamString = requestQueryParamStrings[1];
		}
		if(requestQueryParamString == null || requestQueryParamString.isEmpty()){
			return requestQueryParamKeys;
		}

		//Populate list of query parameter keys found in request.
		String[] queryParamStrings = requestQueryParamString.split("\\&");
		for (String queryParam : queryParamStrings) {
			String[] queryParamString = queryParam.split("\\=");
			requestQueryParamKeys.add(queryParamString[0].trim());
		}

		return requestQueryParamKeys;
	}

	private static List<String> getScenarioQueryParameterKeys(JsonNode scenarioQueryParams) {
		//Populate list of scenario expected query parameter keys.
		Iterator<Map.Entry<String, JsonNode>> scenarioQueryParamIterator = scenarioQueryParams.fields();
		List<String> scenarioQueryParamKeys = new ArrayList<>();
		while (scenarioQueryParamIterator.hasNext()) {
			Map.Entry<String, JsonNode> scenarioQueryParam = scenarioQueryParamIterator.next();
			scenarioQueryParamKeys.add(scenarioQueryParam.getKey().trim());
		}

		return scenarioQueryParamKeys;
	}
}