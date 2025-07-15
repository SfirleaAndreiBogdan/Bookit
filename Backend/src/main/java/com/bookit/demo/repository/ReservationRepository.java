package com.bookit.demo.repository;

import com.bookit.demo.dto.ReservationDetails;
import com.bookit.demo.model.Reservation;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ReservationRepository extends MongoRepository<Reservation, ObjectId> {

    @Aggregation(pipeline = {
            "{ '$match': { 'userId': ?0 } }",
            "{ '$sort': { 'startDate': -1 } }"
    })
    List<Reservation> findByUserId(ObjectId userId);


    List<Reservation> findByCompanyId(ObjectId companyId);

    @Aggregation(pipeline = {
            "{ $match: { roomId: ?0 } }",
            "{ $addFields: { toOfferId: { $convert: { input: '$offerId', to: 'objectId', onError: null, onNull: null } } } }",
            "{ $lookup: { from: 'offers', localField: 'toOfferId', foreignField: '_id', as: 'offerDetails' } }",
            "{ $unwind: { path: '$offerDetails', preserveNullAndEmptyArrays: true } }"
    })
    List<ReservationDetails> findByBookingId(ObjectId bookingId);



    List<Reservation> findByStartDate(LocalDate startDate, LocalDate endDate);
}
