package com.petstore.domain;

public enum Status {
	available("available"), pending("pending"), sold("sold");

	private final String text;

	Status(String text) {
		this.text = text;
	}

	@Override
	public String toString() {
		return text;
	}
}
