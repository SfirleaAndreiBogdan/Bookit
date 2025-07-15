package com.bookit.demo.dto;

import com.bookit.demo.enums.UserRoles;
import lombok.Data;
import org.bson.types.ObjectId;

@Data
public class UserDto {

    private String id;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String phone;

    private String region;

    private UserRoles role;

    private String companyName;

    private String county;

    private String city;
}


