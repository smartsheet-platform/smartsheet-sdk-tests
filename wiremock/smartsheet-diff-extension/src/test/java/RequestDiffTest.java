import com.github.tomakehurst.wiremock.http.RequestMethod;
import javafx.util.Pair;
import org.hamcrest.CoreMatchers;
import org.junit.Test;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class RequestDiffTest {
	@Test
	public void returnsNoDiffForFullMatch() {
		givenFullRequest();
		givenFullScenario();

		whenGetDiffIsCalled();

		assertEquals("", diff);
	}

	@Test
	public void returnsNoDiffForMinimalMatch() {
		givenMinimalRequest();
		givenMinimalScenario();

		whenGetDiffIsCalled();

		assertEquals("", diff);
	}

	@Test
	public void returnsDiffForUrl() {
		givenFullRequestWithPath("/some/wrong/path");
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("/some/wrong/path"));
	}

	@Test
	public void returnsDiffForMethod() {
		givenFullRequestWithMethod(RequestMethod.DELETE);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("DELETE"));
	}

	@Test
	public void returnsDiffForNoHeaders() {
		List<Pair<String, String>> headers = new ArrayList<Pair<String, String>>();

		givenFullRequestWithHeaders(headers);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("header1"));
		assertThat(diff, CoreMatchers.containsString("header2"));
	}

	@Test
	public void returnsDiffForMissingHeaders() {
		List<Pair<String, String>> headers = new ArrayList<Pair<String, String>>();
		headers.add(new Pair<String, String>("header1", "headerValue1"));

		givenFullRequestWithHeaders(headers);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.not(CoreMatchers.containsString("header1")));
		assertThat(diff, CoreMatchers.containsString("header2"));
	}

	@Test
	public void noDiffForExtraHeaders() {
		List<Pair<String, String>> headers = new ArrayList<Pair<String, String>>();
		headers.add(new Pair<String, String>("header1", "headerValue1"));
		headers.add(new Pair<String, String>("header2", "headerValue2"));
		headers.add(new Pair<String, String>("header3", "headerValue3"));

		givenFullRequestWithHeaders(headers);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertEquals("", diff);
	}

	@Test
	public void returnsDiffForHeadersWithDifferentValue() {
		List<Pair<String, String>> headers = new ArrayList<Pair<String, String>>();
		headers.add(new Pair<String, String>("header1", "notRight1"));
		headers.add(new Pair<String, String>("header2", "alsoWrong2"));

		givenFullRequestWithHeaders(headers);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("notRight1"));
		assertThat(diff, CoreMatchers.containsString("alsoWrong2"));
	}

	@Test
	public void returnsDiffForNoQueryParams() {
		List<Pair<String, String>> params = new ArrayList<>();

		givenFullRequestWithQueryParams(params);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("query1"));
		assertThat(diff, CoreMatchers.containsString("query2"));
	}

	@Test
	public void returnsDiffForMissingQueryParams() {
		List<Pair<String, String>> params = new ArrayList<Pair<String, String>>();
		params.add(new Pair<String, String>("query1", "param1"));

		givenFullRequestWithQueryParams(params);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.not(CoreMatchers.containsString("query1")));
		assertThat(diff, CoreMatchers.containsString("query2"));
	}

	@Test
	public void returnsDiffForExtraQueryParams() {
		List<Pair<String, String>> params = new ArrayList<Pair<String, String>>();
		params.add(new Pair<String, String>("query1", "param1"));
		params.add(new Pair<String, String>("query2", "param2"));
		params.add(new Pair<String, String>("query3", "param3"));

		givenFullRequestWithQueryParams(params);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.not(CoreMatchers.containsString("query1")));
		assertThat(diff, CoreMatchers.not(CoreMatchers.containsString("query2")));
		assertThat(diff, CoreMatchers.containsString("query3"));
	}

	@Test
	public void returnsDiffForExtraQueryParamsWhenNotExpecting() {
		List<Pair<String, String>> params = new ArrayList<Pair<String, String>>();
		params.add(new Pair<String, String>("query1", "param1"));

		givenFullRequestWithQueryParams(params);
		givenMinimalScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("query1"));
	}

	@Test
	public void returnsDiffForQueryParamsWithDifferentValue() {
		List<Pair<String, String>> params = new ArrayList<Pair<String, String>>();
		params.add(new Pair<String, String>("query1", "notRightOne"));
		params.add(new Pair<String, String>("query2", "wrongTwo"));

		givenFullRequestWithQueryParams(params);
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("notRightOne"));
		assertThat(diff, CoreMatchers.containsString("wrongTwo"));
	}

	@Test
	public void returnsDiffForBodyWhenNotExpectingBody() {
		givenMinimalRequestWithBody("{\"someCrazyField\": \"value\"}");
		givenMinimalScenario();

		whenGetDiffIsCalled();

		assertNotEquals("", diff);
	}

	@Test
	public void returnsDiffForNoBody() {
		givenFullRequestWithBody("");
		givenFullScenario();

		whenGetDiffIsCalled();

		assertNotEquals("", diff);
	}

	@Test
	public void returnsDiffForBodyWithMissingFields() {
		givenFullRequestWithBody("{\"someField\": \"someValue\"}");
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("someOtherField"));
	}

	@Test
	public void returnsDiffForBodyWithExtraFields() {
		givenFullRequestWithBody("{\"someField\": \"someValue\", \"someOtherField\": \"someOtherValue\", \"someExtraField\": \"someExtraValue\"}");
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("someExtraField"));
	}

	@Test
	public void returnsDiffForBodyWithDifferentValue() {
		givenFullRequestWithBody("{\"someField\": \"someValue\", \"someOtherField\": \"someCrazyValue\"}");
		givenFullScenario();

		whenGetDiffIsCalled();

		assertThat(diff, CoreMatchers.containsString("someCrazyValue"));
	}

	private MockRequest request;
	private String diff;
	private ObjectNode scenario;

	private void givenFullRequest() {
		request = new MockRequest()
				.url("/sheets/1?query1=param1&query2=param2")
				.method(RequestMethod.POST)
				.header("header1", "headerValue1")
				.header("header2", "headerValue2")
				.body("{\"someField\": \"someValue\", \"someOtherField\": \"someOtherValue\"}");
	}

	private void givenMinimalRequest() {
		request = new MockRequest()
				.url("/sheets/1")
				.method(RequestMethod.GET)
				.body("");
	}

	private void givenFullRequestWithPath(String path) {
		givenFullRequest();
		request.url(path + "?query1=param1&query2=param2");
	}

	private void givenFullRequestWithBody(String body) {
		givenFullRequest();
		request.body(body);
	}

	private void givenMinimalRequestWithBody(String body) {
		givenMinimalRequest();
		request.body(body);
	}

	private void givenFullRequestWithMethod(RequestMethod method) {
		givenFullRequest();
		request.method(method);
	}

	private void givenFullRequestWithHeaders(List<Pair<String, String>> headers) {
		givenFullRequest();
		request.clearHeaders();

		for (Pair<String,String> headerPair: headers) {
			request.header(headerPair.getKey(), headerPair.getValue());
		}
	}

	private void givenFullRequestWithQueryParams(List<Pair<String, String>> paramPairs) {
		givenFullRequest();
		String url = request.getUrl();
		String baseUrl = url.split("\\?", 2)[0];

		if (paramPairs.isEmpty()) {
			request.url(baseUrl);
			return;
		}

		List<String> params = new ArrayList<String>();
		for (Pair<String,String> paramPair: paramPairs) {
			params.add(paramPair.getKey() + "=" + paramPair.getValue());
		}

		String newUrl = baseUrl + "?";
		newUrl += String.join("&", params);

		request.url(newUrl);
	}

	private void givenFullScenario() {
		givenScenario(buildFullScenarioRequest());
	}

	private void givenMinimalScenario() {
		givenScenario(buildMinimalScenarioRequest());
	}

	private ObjectNode buildFullScenarioRequest() {
		ObjectMapper mapper = new ObjectMapper();

		ObjectNode headers = mapper.createObjectNode();
		headers.put("header1", "headerValue1");
		headers.put("header2", "headerValue2");

		ObjectNode params = mapper.createObjectNode();
		params.put("query1", "param1");
		params.put("query2", "param2");

		ObjectNode body = mapper.createObjectNode();
		body.put("someField", "someValue");
		body.put("someOtherField", "someOtherValue");

		ObjectNode scenarioRequest = mapper.createObjectNode();
		scenarioRequest.put("method", "POST");
		scenarioRequest.put("urlPath", "/sheets/1");
		scenarioRequest.put("headers", headers);
		scenarioRequest.put("queryParameters", params);
		scenarioRequest.put("body", body);

		return scenarioRequest;
	}

	private ObjectNode buildMinimalScenarioRequest() {
		ObjectMapper mapper = new ObjectMapper();

		ObjectNode scenarioRequest = mapper.createObjectNode();
		scenarioRequest.put("method", "GET");
		scenarioRequest.put("urlPath", "/sheets/1");

		return scenarioRequest;
	}

	private void givenScenario(ObjectNode scenarioRequest) {
		ObjectMapper mapper = new ObjectMapper();

		scenario = mapper.createObjectNode();
		scenario.put("scenario", "testScenario");
		scenario.put("description", "testDescription");
		scenario.put("request", scenarioRequest);
		scenario.put("response", mapper.createObjectNode());
	}

	private void whenGetDiffIsCalled() {
		diff = RequestDiff.getDiff(request, scenario);
	}
}
