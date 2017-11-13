import com.github.tomakehurst.wiremock.common.SingleRootFileSource;
import com.github.tomakehurst.wiremock.extension.ResponseDefinitionTransformer;
import com.github.tomakehurst.wiremock.http.RequestMethod;
import com.github.tomakehurst.wiremock.http.ResponseDefinition;
import org.hamcrest.CoreMatchers;
import org.junit.Test;
import wiremock.com.fasterxml.jackson.databind.JsonNode;
import wiremock.com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

import static org.junit.Assert.*;

public class ApiScenarioTransformerTest {
	private SingleRootFileSource fileSource;
	private MockRequest request;
	private ResponseDefinition transformedResponse;
	private ResponseDefinition responseDefinition;

	@Test
	public void returnsOriginalResponseWhenMatched() {
		givenFileSource();
		givenMatchedRequest();
		givenMatchedResponseDefinition();

		whenTransformIsCalled();

		thenReturnsOriginalResponse();
	}

	@Test
	public void returnsDiffIfNotMatchedButNoDiff() {
		givenFileSource();
		givenMatchedRequest();
		givenUnmatchedResponseDefinition();

		whenTransformIsCalled();

		thenReturnsDiffResponse();
	}

	@Test
	public void returnsDiffIfMatchedButDiff() {
		givenFileSource();
		givenUnmatchedRequest();
		givenMatchedResponseDefinition();

		whenTransformIsCalled();

		thenReturnsValidSmartsheetErrorResponse();
		thenReturnsDiffResponse();
	}

	@Test
	public void returnsUnknownScenarioRespIfUnknownScenario() {
		givenFileSource();
		givenUnknownScenarioRequest();
		givenUnmatchedResponseDefinition();

		whenTransformIsCalled();

		thenReturnsValidSmartsheetErrorResponse();
		thenReturnsUnknownScenarioResponse();
	}

	@Test
	public void returnsInvalidScenarioRespIfBadScenarioHeader() {
		givenFileSource();
		givenInvalidScenarioRequest();
		givenUnmatchedResponseDefinition();

		whenTransformIsCalled();

		thenReturnsValidSmartsheetErrorResponse();
		thenReturnsInvalidResponse();
	}

	private void thenReturnsOriginalResponse() {
		assertSame(responseDefinition, transformedResponse);
	}

	private void thenReturnsDiffResponse() {
		assertEquals(400, transformedResponse.getStatus());
	}

	private void thenReturnsUnknownScenarioResponse() {
		assertNotSame(responseDefinition, transformedResponse);
		assertEquals(404, transformedResponse.getStatus());
		JsonNode body = getResponseBody(transformedResponse);
		assertThat(body.get("message").asText(), CoreMatchers.containsString("Unknown Scenario"));
	}

	private void thenReturnsInvalidResponse() {
		assertNotSame(responseDefinition, transformedResponse);
		assertEquals(404, transformedResponse.getStatus());
		JsonNode body = getResponseBody(transformedResponse);
		assertEquals("No scenario provided", body.get("message").asText());
	}

	private void whenTransformIsCalled() {
		ApiScenarioTransformer transformer = new ApiScenarioTransformer();
		transformedResponse = transformer.transform(request, responseDefinition, fileSource, null);
	}

	private void givenMatchedRequest() {
		request = new MockRequest()
				.url("/sheets")
				.method(RequestMethod.GET)
				.header("Api-Scenario", "List Sheets - No Params")
				.body("");
	}

	private void givenUnmatchedRequest() {
		givenMatchedRequest();
		request.method(RequestMethod.POST);
	}

	private void givenInvalidScenarioRequest() {
		givenMatchedRequest();
		request.clearHeaders();
	}

	private void givenUnknownScenarioRequest() {
		givenMatchedRequest();
		request.clearHeaders();
		request.header("Api-Scenario", "Unknown Scenario");
	}

	private void givenFileSource() {
		URL filesUrl = ClassLoader.getSystemResource("__files");

		File file;
		try {
			file = new File(filesUrl.toURI());
		} catch (URISyntaxException e) {
			throw new RuntimeException(e);
		}

		fileSource = new SingleRootFileSource(file);
	}

	private void givenMatchedResponseDefinition() {
		responseDefinition = new ResponseDefinition(200, "");
	}

	private void givenUnmatchedResponseDefinition() {
		responseDefinition = new ResponseDefinition(404, "");
	}

	private void thenReturnsValidSmartsheetErrorResponse() {
		JsonNode body = getResponseBody(transformedResponse);
		assertEquals(9999, body.get("errorCode").asInt());
		assertTrue(body.has("refId"));
		assertTrue(body.has("message"));
	}

	private JsonNode getResponseBody(ResponseDefinition response) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.readTree(response.getBody());
		} catch (IOException e) {
			fail("Response body is not valid JSON");
		}

		return null;
	}
}
