package com.petstore.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.petstore.domain.Pet;
import com.petstore.service.IPetService;

@RestController
public class PetController {

	@Autowired
	private IPetService service;

    @RequestMapping("/petList")
    public List<Pet> getAll(final HttpServletResponse response) {
    	preventIEFromCaching(response);
        return service.getAll();
    }

    @RequestMapping("/pet/{petId}")
    public Pet findById(@PathVariable(value="petId") Long id, final HttpServletResponse response) {
    	System.out.println("Fetching: " + id);
    	preventIEFromCaching(response);
        return service.getById(id);
    }

    @RequestMapping(path="/pet", method=RequestMethod.POST)
    public Pet add(@RequestBody Pet pet, final HttpServletResponse response) {
    	System.out.println("Adding: " + pet.getName());
    	preventIEFromCaching(response);
        return service.add(pet);
    }

    @RequestMapping(path="/pet/{petId}", method=RequestMethod.DELETE)
    public void delete(@PathVariable(value="petId") Long id, final HttpServletResponse response) {
    	System.out.println("Deleting: " + id);
    	preventIEFromCaching(response);
        service.delete(id);
    }

	private void preventIEFromCaching(final HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Expires", "-1");
	}
}