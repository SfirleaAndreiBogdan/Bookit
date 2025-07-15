package com.bookit.demo.controller;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.dto.ReviewBookingResponse;
import com.bookit.demo.model.Room;
import com.bookit.demo.model.Review;
import com.bookit.demo.repository.RoomRepository;
import com.bookit.demo.repository.ReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@RestController
@RequestMapping("/home")
public class HomePageController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    @GetMapping("/review")
    public List<ReviewBookingResponse> getAllBookingsReview(){
        return reviewRepository.findReviewsOfRoom();
    }

    @GetMapping("/all/reviews")
    public List<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    @GetMapping("/bookings")
    public List<RoomDetails> getAllBookingsPaginated(@RequestParam(required = false, defaultValue = "0") long skip,
                                                     @RequestParam(required = false, defaultValue = "25") long limit){
        var result = roomRepository.findAllPaginated(skip,limit);
        return  result;
    }

    @GetMapping("/all")
    public List<RoomDto> getAllBookings() {
        return roomRepository.findAll()
                .stream()
                .map(Room::getDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/review/{roomId}")
    public List<ReviewBookingResponse> getAllBookingsReview(@PathVariable String roomId){
        ObjectId roomObjectId = new ObjectId(roomId);
        return reviewRepository.findReviewsOfRoomId(roomObjectId);
    }

}
