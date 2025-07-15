package com.bookit.demo.dto;

import com.bookit.demo.enums.RoomType;
import lombok.Data;

import java.util.List;

@Data
public class RoomDto {

    private String id;

    private String name;

    private String description;

    private Double price;

    private List<byte[]> imgUrls;

    private String companyName;

    private String city;
    private String county;

    private RoomType roomType;

    private int numberOfAdults;

    private int numberOfChildren;

    private int numberOfRooms;
    private boolean petAllowed;
    private String CouponId;

    private List<String> facilities;
}
