package com.bookit.demo.repository;

import com.bookit.demo.dto.FacilityDto;
import com.bookit.demo.model.Facility;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FacilityRepository extends MongoRepository<Facility,String> {

    @Aggregation(pipeline = {
            "{ '$match': { _id: { $in: ?0 } } }"
    })
    List<FacilityDto> getFacilitiesByIds(List<String> ids);

}
