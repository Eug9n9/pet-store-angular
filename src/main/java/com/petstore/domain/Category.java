package com.petstore.domain;

public class Category {
/*
Category {
id (integer, optional),
name (string, optional)
}
 */

	private long id;
	private String name;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
