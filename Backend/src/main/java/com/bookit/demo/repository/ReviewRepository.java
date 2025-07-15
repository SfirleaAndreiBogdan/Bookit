package com.bookit.demo.repository;

import com.bookit.demo.dto.ReviewBookingResponse;
import com.bookit.demo.dto.ReviewDto;
import com.bookit.demo.model.Review;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, ObjectId> {


    List<Review> findByRoomId(String roomId);

    @Query("{'$or': [{'userId': ?0}, {'userId': null}], 'roomId': ?1, '$or': [{'reservationId': ?2}, {'reservationId': null}]}")
    List<ReviewDto> findByUserIdAndRoomIdAndReservationId(String userId, String roomId, String reservationId);

    @Aggregation(pipeline = {
            "{'$addFields': { 'roomIdObjectId': { '$toObjectId': '$roomId' }}}",
            "{'$lookup': { 'from': 'rooms', 'localField': 'roomIdObjectId', 'foreignField': '_id', 'as': 'roomDetails' }}",
            "{'$unwind': '$roomDetails'}"
    })
    List<ReviewBookingResponse> findReviewsOfRoom();


    @Aggregation(pipeline = {
            "{ $match: { roomId: ?0 } }"
    })
    List<ReviewBookingResponse> findReviewsOfRoomId(ObjectId roomId);


}
