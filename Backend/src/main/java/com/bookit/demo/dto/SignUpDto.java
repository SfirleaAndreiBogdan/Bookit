package com.bookit.demo.dto;

import com.bookit.demo.enums.UserRoles;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
public class SignUpDto {

    private ObjectId id;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String phone;

    private String county;

    private String city;

    private String companyName;

    private UserRoles role;
}
