package com.bookit.demo.repository;

import com.bookit.demo.dto.UserDto;
import com.bookit.demo.enums.UserRoles;
import com.bookit.demo.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findByEmail(String email);

    List<User> findByRole(UserRoles role);
}
