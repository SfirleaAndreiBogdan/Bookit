package com.bookit.demo.repository;

import com.bookit.demo.model.CountryAndCities;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CountryAndCityRepository extends MongoRepository<CountryAndCities, ObjectId> {
    Optional<CountryAndCities> findByCounty(String county);
}
