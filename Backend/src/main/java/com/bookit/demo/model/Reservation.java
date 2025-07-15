package com.bookit.demo.model;

import com.bookit.demo.dto.CouponDto;
import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.enums.ReservationStatus;
import com.bookit.demo.enums.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@Document(collection = "reservations")
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    private ObjectId id;

    private ReservationStatus reservationStatus;

    private ReviewStatus reviewStatus;

    private Date startDate;

    private Date endDate;

    private ObjectId userId;

    private ObjectId companyId;

    private ObjectId roomId;

    private String CouponId;

    private Double price;

    private CouponDto couponDetails;

    private String offerId;

    private ReservationStatus status;
    public ReservationDto reservationDto(){
        ReservationDto  reservationDto = new ReservationDto();

        reservationDto.setId(id.toString());
        reservationDto.setStartDate(startDate);
        reservationDto.setEndDate(endDate);
        reservationDto.setReservationStatus(reservationStatus);
        reservationDto.setReviewStatus(reviewStatus);
        reservationDto.setPrice(price);
        reservationDto.setCouponDetails(couponDetails);

        reservationDto.setUserId(userId.toString());
        reservationDto.setRoomId(roomId.toString());
        reservationDto.setCompanyId(companyId.toString());
        reservationDto.setOfferId(offerId);
        return reservationDto;
    }
}
