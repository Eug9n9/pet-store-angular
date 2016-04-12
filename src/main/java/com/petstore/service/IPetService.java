package com.petstore.service;

import java.util.List;

import com.petstore.domain.Pet;

public interface IPetService {

	List<Pet> getAll();
	Pet getById(Long id);
	Pet add(Pet pet);
	void delete(Long id);
}
