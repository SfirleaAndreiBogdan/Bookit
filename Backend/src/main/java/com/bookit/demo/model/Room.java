package com.bookit.demo.model;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Slf4j
@Getter
@Setter
@Document(collection = "rooms")
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    private String id;

    private String name;

    private String description;

    private Double price;

    private List<byte[]> imgUrls;

    private User company;

    private int numberOfAdults;

    private int numberOfChildren;

    private String city;
    private String county;

    private int numberOfRooms;
    private boolean petAllowed;

    private RoomType roomType;
    private List<String> facilities;
    public RoomDto getDto(){
        RoomDto roomDto = new RoomDto();

        roomDto.setId(id);
        roomDto.setName(name);
        roomDto.setDescription(description);
        roomDto.setPrice(price);
        roomDto.setImgUrls(imgUrls);
        roomDto.setCompanyName(company.getCompanyName());
        roomDto.setCity(city);
        roomDto.setCounty(county);
        roomDto.setNumberOfAdults(numberOfAdults);
        roomDto.setNumberOfChildren(numberOfChildren);
        roomDto.setNumberOfRooms(numberOfRooms);
        roomDto.setPetAllowed(petAllowed);
        roomDto.setRoomType(roomType);
        roomDto.setFacilities(facilities);

        return roomDto;
    }
}
