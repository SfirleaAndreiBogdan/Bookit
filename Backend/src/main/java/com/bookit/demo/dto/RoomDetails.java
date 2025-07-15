package com.bookit.demo.dto;

import com.bookit.demo.enums.RoomType;
import com.bookit.demo.model.Facility;
import com.bookit.demo.model.User;
import lombok.*;

import java.util.List;


@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDetails {

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

    private User company;
    private List<Facility> facilityDetails;
}
