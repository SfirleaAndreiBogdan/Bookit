package com.bookit.demo.configuration;


import com.bookit.demo.service.jwt.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurity {

    // == fields ==
    @Autowired
    private JwtRequestFilter requestFilter;

    // == Bean methods ==
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth.requestMatchers(
                        "/authenticate", "/company/sign-up", "/client/sign-up","/owner/sign-up",
                        "/updateBooking/{bookingId}",
                        "/bookingUpdated/{bookingId}","/bookings/{companyId}",
                        "/posts/{userId}", "/search/{name}",
                        "/deleteBooking/{bookingId}","/client/bookings",
                        "/booked","/booking/{roomId}","/{roomId}/dates"
                        ,"/bookings/{companyId}","/bookings/{bookingId}/{status}"
                        ,"/my-bookings/{userId}","/review","/country-city",
                        "/search-page","/user/{userId}","/update/{userId}","/api/assistant/chat",
                        "/coupons/{code}","/coupons/redeem/{code}","/coupons/user/{userId}",
                        "/user/role","/coupons/add/{companyId}","date/{companyId}",
                        "/home/review", "/home/review/{roomId}","/home/all/reviews","/site/review/{userId}"
                        ,"/home/bookings","/api/claude/message","/api/claude/messageWithData",
                        "home/all","/client/{reservationId}","/offer","/reservation/{roomId}",
                        "/offer/{userId}","/offer/detail/{offerId}","/room/{userId}","/offer/{offerId}",
                        "/facility","/facility/room"
                        ).permitAll())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/api/**").authenticated())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/bookings/{companyId}").authenticated())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/posts/{userId}").authenticated())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/client/bookings").authenticated())
                .authorizeHttpRequests(auth -> auth.requestMatchers("/booking/{roomId}").permitAll())
                .sessionManagement(sets -> sets.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
