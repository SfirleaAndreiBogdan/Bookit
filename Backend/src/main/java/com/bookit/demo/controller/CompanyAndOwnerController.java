package com.bookit.demo.controller;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.model.User;
import com.bookit.demo.service.company.CompanyService;
import com.bookit.demo.service.reservations.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;  // Import ObjectId
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class CompanyAndOwnerController {

    // == fields ==
    @Autowired
    private CompanyService companyService;

    @Autowired
    private ReservationService reservationService;

    // == Mapping methods ==
    @PostMapping("/bookings/{companyId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> createBooking(@PathVariable String companyId, @ModelAttribute RoomDto roomDto, @RequestParam("images") MultipartFile[] images) {
        try {
            ObjectId objectId = new ObjectId(companyId);

            boolean created = companyService.createBooking(objectId, roomDto, images);

            Map<String, Object> response = new HashMap<>();
            if (created) {
                response.put("message", "Booking created successfully.");
                response.put("success", true);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } else {
                response.put("message", "User not found.");
                response.put("success", false);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (IllegalArgumentException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invalid ObjectId: " + e.getMessage());
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/posts/{userId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> postAllBookingsByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(companyService.getAllBookings(userId));
    }

    @GetMapping("/updateBooking/{bookingId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> getBookingById(@PathVariable String bookingId){
        RoomDetails roomDetails = companyService.getBookingById(bookingId);
        if (roomDetails != null){
            return ResponseEntity.ok(roomDetails);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    @PutMapping("/bookingUpdated/{bookingId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> updateBooking(@PathVariable String bookingId, @ModelAttribute RoomDto roomDto, @RequestParam(value = "images",required = false) MultipartFile[] images){
        boolean ok = companyService.updatedBooking(bookingId, roomDto, images);
        if (ok){
            log.info("merge");
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Booking updated successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Booking not found or update failed.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    @DeleteMapping("/deleteBooking/{bookingId}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> deleteBookingById(@PathVariable String bookingId){

        boolean deleted = companyService.deleteBookingById(bookingId);

        if (deleted){
            Map<String,Object> response = new HashMap<>();
            response.put("success",true);
            response.put("message","Booking deleted succesfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else {
            Map<String,Object> response = new HashMap<>();
            response.put("success",false);
            response.put("message","Can't delete this booking.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @GetMapping("/date/{companyId}")
    public List<ReservationDto> getAllDateReservationByCompany(@PathVariable String companyId){
        return reservationService.findByCompanyId(companyId);
    }

    @GetMapping("/user/role")
    private List<User> getClients(){
        return companyService.getAllUsersByRole();
    }

    @GetMapping("/bookings/{companyId}")
    @CrossOrigin(origins = "http://localhost:4200")
    private ResponseEntity<?> findByCompanyId(@PathVariable String companyId){
        return ResponseEntity.ok(companyService.findByCompanyId(companyId));
    }

    @GetMapping("/bookings/{bookingId}/{status}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<?> changeBookingStatus(@PathVariable String bookingId,@PathVariable String status){
        boolean ok = companyService.changeBookingStatus(bookingId,status);

        if (ok){
            Map<String ,Object> response = new HashMap<>();
            response.put("success",true);
            response.put("message","Booking accepted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }else {

            Map<String ,Object> response = new HashMap<>();
            response.put("success",false);
            response.put("message","Booking not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
    @GetMapping("/room/{userId}")
    public List<RoomDetails> getRoomById(@PathVariable String userId){
        return companyService.getAllBookings(userId);
    }
}
