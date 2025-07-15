package com.bookit.demo.controller;

import com.bookit.demo.dto.ReservationDetails;
import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.dto.ReviewDto;
import com.bookit.demo.dto.UserDto;
import com.bookit.demo.model.Review;
import com.bookit.demo.repository.RoomRepository;
import com.bookit.demo.repository.ReviewRepository;
import com.bookit.demo.service.client.ClientService;
import com.bookit.demo.service.reservations.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ClientController {

    // == fields ==
    @Autowired
    private ClientService clientService;
    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RoomRepository roomRepository;
    // == Mapping methods ==
    @GetMapping("/client/bookings")
    public ResponseEntity<?> getAllBookings(){
        return ResponseEntity.ok(clientService.getAllBookings());
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> getBookingByName(@PathVariable String name){
        return ResponseEntity.ok(clientService.getBookingByName(name));
    }

    @PostMapping("/booked")
    public ResponseEntity<?> bookService(@RequestBody ReservationDto reservationDto){
        boolean reserved = clientService.bookService(reservationDto);
        if (reserved){
            Map<String,Object> response = new HashMap<>();
            response.put("success",true);
            response.put("message","Room was booked successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else {
            Map<String,Object> response = new HashMap<>();
            response.put("success",true);
            response.put("message","Unable to book this room");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @GetMapping("/{roomId}/dates")
    public ResponseEntity<?> getAllDateReservation(String roomId){
        return ResponseEntity.ok(reservationService.findAllReservationsDateByRoomId(roomId));
    }

    @GetMapping("/booking/{roomId}")
    public ResponseEntity<?> getBookingDetails(@PathVariable String roomId){
        return ResponseEntity.ok(clientService.getDetailsById(roomId));
    }

    @GetMapping("/my-bookings/{userId}")
    public ResponseEntity<?> getAllBookingsByUserId(@PathVariable String userId){
        return ResponseEntity.ok(clientService.getBookingsByUserId(userId));
    }

    @GetMapping("/reservation/{roomId}")
    private List<ReservationDetails> getReservationsByRoomId(@PathVariable String roomId) {
        return clientService.getReservationByRoomId(roomId);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto){
        boolean response = clientService.updateUser(userDto);

        if (response){
            Map<String,Object> responses = new HashMap<>();
            responses.put("success",true);
            responses.put("message","User updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else{
            Map<String,Object> responses = new HashMap<>();
            responses.put("success",false);
            responses.put("message","Error while updating user");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/review")
    public ResponseEntity<?> giveReview(@RequestBody ReviewDto reviewDto){
       log.info("{}",reviewDto);
        boolean ok = clientService.giveReview(reviewDto);
        if (ok){
            Map<String,Object> response = new HashMap<>();
            response.put("success",true);
            response.put("message","Review Added Successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else {

            Map<String,Object> response = new HashMap<>();
            response.put("success",false);
            response.put("message","Can't added review.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
    @GetMapping("/all/reviews")
    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable String userId){
        return ResponseEntity.ok(clientService.getUserById(userId));
    }

    @GetMapping("/site/review/{userId}")
    public List<ReviewDto> getReviewsSite( @PathVariable(required = false) String userId,
                                           @RequestParam(required = false) String bookingId,
                                           @RequestParam(required = false) String reservationId){
        return clientService.getAllReviewSite(userId, bookingId, reservationId);
    }

    @DeleteMapping("/client/{reservationId}")
    private void deleteBookingReservation(@PathVariable String reservationId) throws Exception {
        reservationService.deleteReservation(reservationId);
    }
}

