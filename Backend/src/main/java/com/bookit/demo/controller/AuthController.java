package com.bookit.demo.controller;

import com.bookit.demo.componentes.Jwt;
import com.bookit.demo.dto.AuthRequest;
import com.bookit.demo.dto.SignUpDto;
import com.bookit.demo.dto.UserDto;
import com.bookit.demo.model.CountryAndCities;
import com.bookit.demo.model.User;
import com.bookit.demo.repository.CountryAndCityRepository;
import com.bookit.demo.repository.UserRepository;
import com.bookit.demo.service.authentication.AuthService;
import com.bookit.demo.util.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class AuthController {

    // == fields ==

    @Autowired
    private CountryAndCityRepository countryAndCities;
    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private Jwt jwt;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    // == Mapping methods ==

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/client/sign-up")
    public ResponseEntity<?> signUpClient(@RequestBody SignUpDto signUpDto) {

        if (authService.findByEmail(signUpDto.getEmail())) {
            return new ResponseEntity<>("Client already exists!", HttpStatus.NOT_ACCEPTABLE);
        }
        System.out.println(signUpDto.getFirstName() + " " + signUpDto.getLastName());

        UserDto user = authService.singUpClient(signUpDto);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/company/sign-up")
    public ResponseEntity<?> signUpCompany(@RequestBody SignUpDto signUpDto) {

        if (authService.findByEmail(signUpDto.getEmail())) {
            return new ResponseEntity<>("Company already exists!", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto user = authService.singUpCompany(signUpDto);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/owner/sign-up")
    public ResponseEntity<?> signUpOwner(@RequestBody SignUpDto signUpDto) {

        if (authService.findByEmail(signUpDto.getEmail())) {
            return new ResponseEntity<>("Owner already exists!", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto user = authService.signUpOwner(signUpDto);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/country-city")
    public List<CountryAndCities> getCities() {
        return countryAndCities.findAll();
    }

    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthRequest authenticationRequest
            , HttpServletResponse response) throws IOException {

        System.out.println("Username: " + authenticationRequest.getUsername());
        System.out.println("Password: " + authenticationRequest.getPassword());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
            System.out.println("Autentificare reusita!");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password!", e);
        }

        final UserDetails userDetails = jwtService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwtToken = jwt.generateToken(userDetails.getUsername());
        User user = userRepository.findByEmail(authenticationRequest.getUsername());
        System.out.println("TIme expir: " + jwt.getExpirationTime(jwtToken));

        response.getWriter().write(new JSONObject()
                .put("userID", user.getId())
                .put("role", user.getRole())
                .toString()
        );

        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader("Access-Control-Allow-Headers", "Authorization," +
                " X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");

        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwtToken);
    }
}
