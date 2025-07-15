package com.bookit.demo.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ReviewDto {

    private String id;

    private Date reviewDate;

    private String review;

    private Long rating;

    private String userId;

    private String roomId;

    private String clientName;

    private String bookingName;

    private String reservationId;
}
