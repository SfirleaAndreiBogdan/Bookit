package com.bookit.demo.model;

import com.bookit.demo.dto.UserDto;
import com.bookit.demo.enums.UserRoles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String id;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String phone;

    private String county;

    private String city;

    private UserRoles role;

    private String companyName;
    public UserDto getuserDto(){
        UserDto userDto = new UserDto();

        userDto.setId(id);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setPassword(password);
        userDto.setEmail(email);
        userDto.setPhone(phone);
        userDto.setRegion(county);
        userDto.setRole(UserRoles.CLIENT);
        userDto.setCompanyName(companyName);
        userDto.setCounty(county);
        userDto.setCity(city);

        return userDto;
    }
}
