package com.bookit.demo.service.client;

import com.bookit.demo.dto.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {
    List<RoomDto> getAllBookings();

    List<RoomDto> getBookingByName(String name);

    UserDto getUserById(String userId);

    boolean bookService(ReservationDto reservationDto);

    bookingDetailsForClientDto getDetailsById(String roomId);

    List<ReservationDetails> getBookingsByUserId(String userId);

    boolean updateUser(UserDto userDto);
    Boolean giveReview(ReviewDto reviewDto);

    List<ReviewDto> getAllReviewSite(String userId, String bookingId, String reservationId);

    List<ReservationDetails> getReservationByRoomId(String roomId);
}
