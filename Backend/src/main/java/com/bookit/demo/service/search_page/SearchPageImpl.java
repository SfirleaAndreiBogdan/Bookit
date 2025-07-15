package com.bookit.demo.service.search_page;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.model.Facility;
import com.bookit.demo.model.Room;
import com.bookit.demo.model.Reservation;
import com.bookit.demo.repository.FacilityRepository;
import com.bookit.demo.repository.RoomRepository;
import com.bookit.demo.repository.ReservationRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SearchPageImpl implements SearchPage{

    // == public repository fields ==

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private FacilityRepository facilityRepository;

    // == public Service Method ==

    public List<RoomDetails> getBookingsBySearchCriteria(Map<String ,String> params){

        String county = params.getOrDefault("county", null);
        String city = params.getOrDefault("city", null);
        int persons = Integer.parseInt(params.getOrDefault("persons", "0"));
        int childs = Integer.parseInt(params.getOrDefault("childs", "0"));
        int rooms = Integer.parseInt(params.getOrDefault("rooms", "0"));
        boolean petAllowed = Boolean.parseBoolean(params.getOrDefault("petAllowed", "false"));
        LocalDate checkIn = params.containsKey("checkIn") ? LocalDate.parse(params.get("checkIn")) : null;
        LocalDate checkOut = params.containsKey("checkOut") ? LocalDate.parse(params.get("checkOut")) : null;
        String roomName = params.getOrDefault("roomName", null);

        List<Reservation>  reservedRooms  = reservationRepository.findByStartDate(checkIn, checkOut);
        List<Room> roomList;

        if (roomName != null && !roomName.isEmpty()) {
            roomList = roomRepository.findAllByName(roomName);
        } else {
            roomList = roomRepository.findByCountyAndCityAndNumberOfRoomsAndNumberOfChildrenAndNumberOfAdultsAndPetAllowed(
                    county, city, rooms, childs, persons, petAllowed);
        }

        return roomList.stream()
                .filter(room -> reservedRooms.stream()
                        .noneMatch(res -> res.getRoomId().equals(new ObjectId(room.getId()))))
                .map(room -> {
                    RoomDetails dto = new RoomDetails();

                    dto.setId(room.getId());
                    dto.setName(room.getName());
                    dto.setDescription(room.getDescription());
                    dto.setPrice(room.getPrice());
                    dto.setImgUrls(room.getImgUrls());
                    dto.setCompanyName(room.getCompany().getCompanyName());
                    dto.setCity(room.getCity());
                    dto.setCounty(room.getCounty());
                    dto.setRoomType(room.getRoomType());
                    dto.setNumberOfAdults(room.getNumberOfAdults());
                    dto.setNumberOfChildren(room.getNumberOfChildren());
                    dto.setNumberOfRooms(room.getNumberOfRooms());
                    dto.setPetAllowed(room.isPetAllowed());

                    List<Facility> facilities = room.getFacilities() != null && !room.getFacilities().isEmpty()
                            ? facilityRepository.findAllById(room.getFacilities())
                            : Collections.emptyList();

                    dto.setFacilityDetails(facilities);

                    return dto;
                }).collect(Collectors.toList());

    }

}
