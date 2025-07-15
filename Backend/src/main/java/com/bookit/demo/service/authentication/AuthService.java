package com.bookit.demo.service.authentication;

import com.bookit.demo.componentes.Jwt;
import com.bookit.demo.dto.SignUpDto;
import com.bookit.demo.dto.UserDto;
import com.bookit.demo.enums.UserRoles;
import com.bookit.demo.model.User;
import com.bookit.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.PasswordAuthentication;

@Service
public class AuthService implements AuthServiceImplement {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Jwt jwt;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto singUpClient(SignUpDto signUpDto){
        User user = new User();

        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpDto.getPassword()));
        user.setPhone(signUpDto.getPhone());
        user.setCity(signUpDto.getCity());
        user.setCounty(signUpDto.getCounty());
        user.setRole(UserRoles.CLIENT);

        return userRepository.save(user).getuserDto();
    }

    public UserDto singUpCompany(SignUpDto signUpDto){
        User user = new User();

        user.setCompanyName(signUpDto.getCompanyName());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpDto.getPassword()));
        user.setPhone(signUpDto.getPhone());
        user.setCity(signUpDto.getCity());
        user.setCounty(signUpDto.getCounty());
        user.setRole(UserRoles.COMPANY);

        return userRepository.save(user).getuserDto();
    }


    @Override
    public UserDto signUpOwner(SignUpDto signUpDto) {
        User user = new User();

        user.setFirstName(signUpDto.getFirstName());
        user.setLastName(signUpDto.getLastName());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpDto.getPassword()));
        user.setPhone(signUpDto.getPhone());
        user.setCity(signUpDto.getCity());
        user.setCounty(signUpDto.getCounty());
        user.setRole(UserRoles.OWNER);

        return userRepository.save(user).getuserDto();
    }

    public boolean findByEmail(String email){
        return userRepository.findByEmail(email)!=null;
    }


}
