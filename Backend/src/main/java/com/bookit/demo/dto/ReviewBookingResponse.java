package com.bookit.demo.dto;

import com.bookit.demo.model.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewBookingResponse {

    private String id;

    private Date reviewDate;

    private String review;

    private Long rating;

    private String userId;

    private String roomId;

    private String clientName;

    private String bookingName;

    private String reservationId;

    private Room roomDetails;
}
