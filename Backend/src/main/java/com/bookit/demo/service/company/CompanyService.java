package com.bookit.demo.service.company;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.model.User;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CompanyService {

    boolean createBooking(ObjectId userId, RoomDto roomDto, MultipartFile[] files);

    List<RoomDetails> getAllBookings(String userId);

    RoomDetails getBookingById(String roomId);

    boolean updatedBooking(String roomId, RoomDto roomDto, MultipartFile[] files);

    boolean deleteBookingById(String roomId);

    List<ReservationDto> findByCompanyId(String companyId);

    boolean changeBookingStatus(String roomId, String status);

    List<User> getAllUsersByRole();
}
