package com.baeldung.application.repositories;

import com.baeldung.application.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


@Repository
public interface UserRepository extends CrudRepository<User, Long>{
//public interface UserRepository extends JpaRepository<User, Long>{
	
	@Query("select user from User user where name = :name and password = :password"
			//+ " and amount = :amount and transid = :transid"
			)
	//Transactions findbyAmountMSISDNandTransid(@Param("msisdn") String msisdn, @Param("amount") String amount, @Param("transid") String transid);
	User findByUserName(@Param("name")String name, @Param("password")String password);
}
