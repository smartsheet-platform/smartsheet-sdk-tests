import com.github.tomakehurst.wiremock.http.Request;
import com.github.tomakehurst.wiremock.http.RequestMethod;
import com.github.tomakehurst.wiremock.servlet.WireMockHttpServletRequestAdapter;
import javafx.util.Pair;
import org.hamcrest.CoreMatchers;
import org.junit.Test;
import wiremock.com.fasterxml.jackson.databind.JsonNode;
import wiremock.com.fasterxml.jackson.databind.ObjectMapper;
import wiremock.com.fasterxml.jackson.databind.node.ObjectNode;
import wiremock.org.eclipse.jetty.server.HttpChannel;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class RequestDiffTest {
	private MockRequest request;
	private String diff;
	private ObjectNode scenario;

	private void givenFullRequest() {
		request = new MockRequest()
				.url("/sheets/1?query1=param1&query2=param2")
				.method(RequestMethod.POST)
				.header("header1", "headerValue1")
				.header("header2", "headerValue2")
				.body("{\"someField\": \"someValue\"}");
	}

	private void givenFullRequestWithPath(String path) {
		givenFullRequest();
		request.url(path + "?query1=param1&query2=param2");
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

	private void givenFullScenario() {
		givenScenario(buildFullScenarioRequest());
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

		ObjectNode scenarioRequest = mapper.createObjectNode();
		scenarioRequest.put("method", "POST");
		scenarioRequest.put("urlPath", "/sheets/1");
		scenarioRequest.put("headers", headers);
		scenarioRequest.put("queryParameters", params);
		scenarioRequest.put("body", body);

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

	@Test
	public void noDiffForMatch() {
		givenFullRequest();
		givenFullScenario();

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
//
//	@Test
//	public void returnsDiffForMissingQueryParams() {
//		givenFullRequestWithPath("/some/wrong/path");
//		givenFullScenario();
//
//		whenGetDiffIsCalled();
//
//		assertThat(diff, CoreMatchers.containsString("/some/wrong/path"));
//		assertTrue(false);
//	}
//
//	@Test
//	public void returnsDiffForExtraQueryParams() {
//		givenFullRequestWithPath("/some/wrong/path");
//		givenFullScenario();
//
//		whenGetDiffIsCalled();
//
//		assertThat(diff, CoreMatchers.containsString("/some/wrong/path"));
//		assertTrue(false);
//	}
//
//	@Test
//	public void returnsDiffForIncorrectQueryParams() {
//		givenFullRequestWithPath("/some/wrong/path");
//		givenFullScenario();
//
//		whenGetDiffIsCalled();
//
//		assertThat(diff, CoreMatchers.containsString("/some/wrong/path"));
//		assertTrue(false);
//	}
}
