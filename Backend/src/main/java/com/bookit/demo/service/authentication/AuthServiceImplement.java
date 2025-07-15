package com.bookit.demo.service.authentication;

import com.bookit.demo.dto.SignUpDto;
import com.bookit.demo.dto.UserDto;

public interface AuthServiceImplement {
    public UserDto singUpClient(SignUpDto signUpDto);

    public boolean findByEmail(String email);

    public UserDto signUpOwner(SignUpDto signUpDto);

    public UserDto singUpCompany(SignUpDto signUpDto);

}
