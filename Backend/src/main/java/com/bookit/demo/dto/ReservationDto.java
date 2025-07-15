package com.bookit.demo.dto;

import com.bookit.demo.enums.ReservationStatus;
import com.bookit.demo.enums.ReviewStatus;
import com.bookit.demo.model.Reservation;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

@Data
public class ReservationDto {

    private String id;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date startDate;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date endDate;

    private String bookingName;

    private ReservationStatus reservationStatus;

    private ReviewStatus reviewStatus;

    private String companyId;

    private String userId;

    private String clientName;

    private String roomId;

    private Double price;

    private String city;

    private String county;

    private CouponDto couponDetails;

    private String offerId;
}
