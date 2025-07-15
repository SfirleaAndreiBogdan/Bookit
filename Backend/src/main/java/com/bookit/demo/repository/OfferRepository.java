package com.bookit.demo.repository;

import com.bookit.demo.dto.OfferDetails;
import com.bookit.demo.dto.OfferDto;
import com.bookit.demo.model.Offer;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OfferRepository extends MongoRepository<Offer,String> {

    @Aggregation(pipeline = {
            "{ $addFields: { toRoomObjectId: { $toObjectId: '$roomId' } } }",
            "{ $lookup: { from: 'rooms', localField: 'toRoomObjectId', foreignField: '_id', as: 'roomDetails' } }",
            "{ $unwind: '$roomDetails' }"
    })
    List<OfferDetails> findAllOffersWithRoomDetails();

    @Aggregation(pipeline = {
            "{ $match: { userId: ?0 } }",
            "{ $addFields: { toRoomObjectId: { $convert: { input: '$roomId', to: 'objectId', onError: null, onNull: null } } } }",
            "{ $lookup: { from: 'rooms', localField: 'toRoomObjectId', foreignField: '_id', as: 'roomDetails' } }",
            "{ $unwind: { path: '$roomDetails', preserveNullAndEmptyArrays: true } }"
    })
    List<OfferDetails> findByUserId(String userId);

}
