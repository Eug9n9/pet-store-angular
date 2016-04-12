package com.petstore.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;


import org.springframework.stereotype.Service;

import com.petstore.domain.Category;
import com.petstore.domain.Pet;
import com.petstore.domain.Status;
import com.petstore.domain.Tag;

@Service
public class PetService implements IPetService {

	private Map<Long, Pet> pets = Collections.synchronizedMap(new HashMap<Long, Pet>());
	private AtomicLong lastId = new AtomicLong(0l);

	public PetService() {
		super();
		long id = lastId.incrementAndGet();
		Pet pet = new Pet();
		pet.setId(id);
		pet.setName("Name 1");
		Category category = new Category();
		category.setId(1l);
		category.setName("Category 1");
		pet.setCategory(category);
		List<String> photoUrls = new ArrayList<String>();
		photoUrls.add("Url 1");
		photoUrls.add("Url 2");
		pet.setPhotoUrls(photoUrls);
		pet.setStatus(Status.available);
		List<Tag> tags = new ArrayList<Tag>();
		Tag tag = new Tag();
		tag.setId(1l);
		tag.setName("Tag 1");
		tags.add(tag);
		tag = new Tag();
		tag.setId(2l);
		tag.setName("Tag 2");
		tags.add(tag);
		pet.setTags(tags);
		pets.put(id, pet);

		id = lastId.incrementAndGet();
		pet = new Pet();
		pet.setId(id);
		pet.setName("Name 2");
		category = new Category();
		category.setId(1l);
		category.setName("Category 1");
		pet.setCategory(category);
		photoUrls = new ArrayList<String>();
		photoUrls.add("Url 3");
		photoUrls.add("Url 4");
		pet.setPhotoUrls(photoUrls);
		pet.setStatus(Status.available);
		tags = new ArrayList<Tag>();
		tag = new Tag();
		tag.setId(2l);
		tag.setName("Tag 2");
		tags.add(tag);
		tag = new Tag();
		tag.setId(3l);
		tag.setName("Tag 3");
		tags.add(tag);
		pet.setTags(tags);
		pets.put(id, pet);

		id = lastId.incrementAndGet();
		pet = new Pet();
		pet.setId(id);
		pet.setName("Name 3");
		category = new Category();
		category.setId(2l);
		category.setName("Category 2");
		pet.setCategory(category);
		photoUrls = new ArrayList<String>();
		photoUrls.add("Url 5");
		photoUrls.add("Url 6");
		pet.setPhotoUrls(photoUrls);
		pet.setStatus(Status.pending);
		tags = new ArrayList<Tag>();
		tag = new Tag();
		tag.setId(1l);
		tag.setName("Tag 1");
		tags.add(tag);
		tag = new Tag();
		tag.setId(3l);
		tag.setName("Tag 3");
		tags.add(tag);
		pet.setTags(tags);
		pets.put(id, pet);

		id = lastId.incrementAndGet();
		pet = new Pet();
		pet.setId(id);
		pet.setName("Name 4");
		category = new Category();
		category.setId(2l);
		category.setName("Category 2");
		pet.setCategory(category);
		photoUrls = new ArrayList<String>();
		photoUrls.add("Url 7");
		photoUrls.add("Url 8");
		pet.setPhotoUrls(photoUrls);
		pet.setStatus(Status.sold);
		tags = new ArrayList<Tag>();
		tag = new Tag();
		tag.setId(3l);
		tag.setName("Tag 3");
		tags.add(tag);
		tag = new Tag();
		tag.setId(4l);
		tag.setName("Tag 4");
		tags.add(tag);
		pet.setTags(tags);
		pets.put(id, pet);

	}

	public List<Pet> getAll() {
		List<Pet> result = new ArrayList<Pet>(pets.values());
		return result;
	}

	public Pet getById(Long id) {
		return pets.get(id);
	}

	public Pet add(Pet pet) {
		long id = lastId.incrementAndGet();
		pets.put(id, pet);
		pet.setId(id);
		return pet;
	}

	public void delete(Long id) {
		pets.remove(id);
	}
}
