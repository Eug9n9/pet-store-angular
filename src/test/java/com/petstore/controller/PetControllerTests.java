package com.petstore.controller;

import javax.servlet.http.HttpServletResponse;

import org.junit.Test;
import static com.jayway.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class PetControllerTests {

	private String getAllPayload = "[{\"id\":1,\"category\":{\"id\":1,\"name\":\"Category 1\"},\"name\":\"Name 1\",\"photoUrls\":[\"Url 1\",\"Url 2\"],\"tags\":[{\"id\":1,\"name\":\"Tag 1\"},{\"id\":2,\"name\":\"Tag 2\"}],\"status\":\"available\"},{\"id\":2,\"category\":{\"id\":1,\"name\":\"Category 1\"},\"name\":\"Name 2\",\"photoUrls\":[\"Url 3\",\"Url 4\"],\"tags\":[{\"id\":2,\"name\":\"Tag 2\"},{\"id\":3,\"name\":\"Tag 3\"}],\"status\":\"available\"},{\"id\":3,\"category\":{\"id\":2,\"name\":\"Category 2\"},\"name\":\"Name 3\",\"photoUrls\":[\"Url 5\",\"Url 6\"],\"tags\":[{\"id\":1,\"name\":\"Tag 1\"},{\"id\":3,\"name\":\"Tag 3\"}],\"status\":\"pending\"},{\"id\":4,\"category\":{\"id\":2,\"name\":\"Category 2\"},\"name\":\"Name 4\",\"photoUrls\":[\"Url 7\",\"Url 8\"],\"tags\":[{\"id\":3,\"name\":\"Tag 3\"},{\"id\":4,\"name\":\"Tag 4\"}],\"status\":\"sold\"}]";
	private String get4Payload = "{\"id\":4,\"category\":{\"id\":2,\"name\":\"Category 2\"},\"name\":\"Name 4\",\"photoUrls\":[\"Url 7\",\"Url 8\"],\"tags\":[{\"id\":3,\"name\":\"Tag 3\"},{\"id\":4,\"name\":\"Tag 4\"}],\"status\":\"sold\"}";

	@Test
	public void petListTest() {
		given().
	    when().
	        get("http://localhost:8080/petList").
	    then().
	        statusCode(HttpServletResponse.SC_OK).
	        contentType("application/json").
	        body(equalTo(getAllPayload));
	}

	@Test
	public void getPetTest() {
		given().
	    when().
	        get("http://localhost:8080/pet/4").
	    then().
	        statusCode(HttpServletResponse.SC_OK).
	        contentType("application/json").
	        body(equalTo(get4Payload));
	}
}
