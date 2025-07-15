package com.bookit.demo.dto;

import com.bookit.demo.enums.ReservationStatus;
import com.bookit.demo.enums.ReviewStatus;
import com.bookit.demo.model.Coupon;
import com.bookit.demo.model.Offer;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class ReservationDetails {
    private String id;

    private Date startDate;

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

    private Offer offerDetails;
}
