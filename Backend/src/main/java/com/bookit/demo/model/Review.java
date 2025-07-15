package com.bookit.demo.model;

import com.bookit.demo.dto.ReviewDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@Document(collection = "reviews")
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    private String id;

    private Date reviewDate;

    private String review;

    private Long rating;

    private String userId;

    private String roomId;

    private String reservationId;

    private String clientName;
    public ReviewDto getReviewDto(){
        ReviewDto reviewDto = new ReviewDto();

        reviewDto.setId(id.toString());
        reviewDto.setReviewDate(reviewDate);
        reviewDto.setRating(rating);
        reviewDto.setUserId(userId);
        reviewDto.setReservationId(reservationId);
        reviewDto.setClientName(clientName);
        return reviewDto;
    }
}
