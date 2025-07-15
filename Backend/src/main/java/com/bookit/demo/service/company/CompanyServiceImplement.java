package com.bookit.demo.service.company;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.enums.ReservationStatus;
import com.bookit.demo.enums.UserRoles;
import com.bookit.demo.model.Room;
import com.bookit.demo.model.Reservation;
import com.bookit.demo.model.User;
import com.bookit.demo.repository.RoomRepository;
import com.bookit.demo.repository.ReservationRepository;
import com.bookit.demo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CompanyServiceImplement implements CompanyService {

    // == fields ==
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository;
    // == public methods ==
    public boolean createBooking(ObjectId userId, RoomDto roomDto, MultipartFile[] files) {
        System.out.println("Creare booking pentru user: " + userId);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            Room room = new Room();
            System.out.println(roomDto);
            room.setName(roomDto.getName());
            room.setDescription(roomDto.getDescription());
            room.setPrice(roomDto.getPrice());
            room.setCompany(optionalUser.get());
            room.setCity(roomDto.getCity());
            room.setCounty(roomDto.getCounty());
            room.setNumberOfAdults(roomDto.getNumberOfAdults());
            room.setNumberOfChildren(roomDto.getNumberOfChildren());
            room.setNumberOfRooms(roomDto.getNumberOfRooms());
            room.setPetAllowed(roomDto.isPetAllowed());
            room.setRoomType(roomDto.getRoomType());
            room.setFacilities(roomDto.getFacilities());

            List<byte[]> images = new ArrayList<>();
            try {
                for (MultipartFile file : files) {
                    byte[] imageBytes = file.getBytes();
                    images.add(imageBytes);
                }
                room.setImgUrls(images);

                roomRepository.save(room);
                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return false;
    }

    public List<RoomDetails> getAllBookings(String userId) {
        ObjectId objectId = new ObjectId(userId);
        return roomRepository.findAllByUserIdWithFacilities(objectId);
    }

    public RoomDetails getBookingById(String roomId) {
        return roomRepository.findByIdWithFacilities(roomId);
    }

    public List<User> getAllUsersByRole(){
        return userRepository.findByRole(UserRoles.CLIENT);
    }
    public boolean updatedBooking(String roomId, RoomDto roomDto, MultipartFile[] files) {
        Optional<Room> optionalBookings = roomRepository.findById(roomId);
        if (optionalBookings.isPresent()) {
            Room room = optionalBookings.get();
            room.setDescription(roomDto.getDescription());
            room.setName(roomDto.getName());
            room.setPrice(roomDto.getPrice());
            room.setCity(roomDto.getCity());
            room.setCounty(roomDto.getCounty());
            room.setNumberOfAdults(roomDto.getNumberOfAdults());
            room.setNumberOfRooms(roomDto.getNumberOfRooms());
            room.setNumberOfChildren(roomDto.getNumberOfChildren());
            room.setPetAllowed(roomDto.isPetAllowed());
            room.setRoomType(roomDto.getRoomType());
            room.setFacilities(roomDto.getFacilities());
            if (files != null) {
                List<byte[]> images = new ArrayList<>();
                try {
                    for (MultipartFile file : files) {
                        byte[] imageBytes = file.getBytes();
                        images.add(imageBytes);
                    }
                    room.setImgUrls(images);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            roomRepository.save(room);
            return true;
        }
        return false;
    }

    public boolean deleteBookingById(String roomId){
        if (roomId.isEmpty()){
            return false;
        }
        roomRepository.deleteById(roomId);
        return true;
    }

    public List<ReservationDto> findByCompanyId(String companyId){
        ObjectId objectId = new ObjectId(companyId);
        return reservationRepository.findByCompanyId(objectId)
                    .stream()
                    .map(reservation -> {
                        Optional<Room> booking = roomRepository.findById(reservation.getRoomId().toString());
                        User user = userRepository.findById(reservation.getUserId()).orElse(null);

                        System.out.println(user.getFirstName() + " " + user.getLastName());

                        ReservationDto dto = new ReservationDto();
                        dto.setId(reservation.getId().toString());
                        dto.setStartDate(reservation.getStartDate());
                        dto.setEndDate(reservation.getEndDate());
                        dto.setReservationStatus(reservation.getReservationStatus());
                        dto.setRoomId(reservation.getRoomId().toString());
                        dto.setUserId(reservation.getUserId().toString());
                        dto.setCompanyId(reservation.getCompanyId().toString());
                        dto.setBookingName(booking.get().getName());
                        dto.setClientName(user.getFirstName() + " " + user.getLastName());
                        dto.setPrice(booking.get().getPrice());
                        dto.setCouponDetails(reservation.getCouponDetails());
                        return dto;
                    }).collect(Collectors.toList()) ;
    }

    public boolean changeBookingStatus(String roomId, String status){
        ObjectId booking = new ObjectId(roomId);
        Optional<Reservation> optionalReservation = reservationRepository.findById(booking);

        if (optionalReservation.isPresent()){
            Reservation existingReservation = optionalReservation.get();

            if (Objects.equals(status,"Approve")){
                existingReservation.setReservationStatus(ReservationStatus.APPROVED);
            }else {
                existingReservation.setReservationStatus(ReservationStatus.REJECTED);
            }
            reservationRepository.save(existingReservation);
            return true;
        }
        return false;
    }


}
