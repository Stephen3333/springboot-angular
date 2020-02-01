package com.baeldung.application.controllers;

import com.baeldung.application.entities.User;
import com.baeldung.application.repositories.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;


import java.util.List;

import org.apache.tomcat.util.json.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	private static final  Logger log = LoggerFactory.getLogger(UserController.class);


    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody User user) {
        userRepository.save(user);
    }
	@RequestMapping(value = "/registration", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)

	@ResponseBody
	public ResponseEntity<?> registration(@RequestBody User user) {
		Gson gson = new Gson();

	
		// JsonObject reqObj = gson.fromJson(user, JsonObject.class);
		String name = user.getName();// reqObj.get("name").getAsString();
		String password = user.getPassword();// reqObj.get("name").getAsString();
        String email = user.getEmail();
		// System.out.println("name"+ name +"password"+password);
		/// Save to DB
		userRepository.save(user);

		// Send json response // Send json response
		JsonObject responseObj = new JsonObject();
		//responseObj.addProperty("response_status", true);
		//responseObj.addProperty("response_message", "success");
		responseObj.addProperty("response_name", name);
		responseObj.addProperty("response_password", password);
		return ResponseEntity.ok(gson.toJson(responseObj));

	}

	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public User UserLogin(@RequestBody User user) {
		// public ResponseEntity<?> login(@RequestBody Customer customer) {
		user = userRepository.findByUserName(user.getName(), user.getPassword());
		
		if(user==null) {
			log.info("user does not exist");
		}
		else 
		{
		return user;
		}
		
		return user;
	}
}
