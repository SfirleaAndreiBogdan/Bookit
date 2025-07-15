package com.bookit.demo.repository;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.model.Room;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {

    @Aggregation(pipeline = {
            "{ '$match': { 'company.id': ?0 } }",
            "{ '$addFields': { 'facilities': { '$map': { 'input': '$facilities', 'as': 'f', 'in': { '$toObjectId': '$$f' } } } } }",
            "{ '$lookup': { 'from': 'facilities', 'localField': 'facilities', 'foreignField': '_id', 'as': 'facilityDetails' } }"
    })
    List<RoomDetails> findAllByUserIdWithFacilities(ObjectId userId);

    @Aggregation(pipeline = {
            "{ '$match': { '_id': { '$eq': ?0  } } }",
            "{ '$addFields': { 'facilities': { '$map': { 'input': '$facilities', 'as': 'f', 'in': { '$toObjectId': '$$f' } } } } }",
            "{ '$lookup': { 'from': 'facilities', 'localField': 'facilities', 'foreignField': '_id', 'as': 'facilityDetails' } }"
    })
    RoomDetails findByIdWithFacilities(String roomId);

    @Aggregation(pipeline = {
            "{ '$match': { 'name': { '$regex': ?0, '$options': 'i' } } }"
    })
    List<Room> findAllByName(String name);

    List<Room> findByCountyAndCityAndNumberOfRoomsAndNumberOfChildrenAndNumberOfAdultsAndPetAllowed
            (String county,String city,int numberOfRooms, int numberOfChildren,
                                  int numberOfAdults,boolean petAllowed);

    @Aggregation(pipeline = {
            "{ '$addFields': { 'facilities': { '$map': { 'input': '$facilities', 'as': 'f', 'in': { '$toObjectId': '$$f' } } } } }",
            "{ '$lookup': { 'from': 'facilities', 'localField': 'facilities', 'foreignField': '_id', 'as': 'facilityDetails' } }",
            "{ '$skip': ?0 }",
            "{ '$limit': ?1 }"
    })
    List<RoomDetails> findAllPaginated(long skip, long limit);
}
