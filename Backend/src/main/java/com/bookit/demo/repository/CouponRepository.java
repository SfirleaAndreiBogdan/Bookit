package com.bookit.demo.repository;

import com.bookit.demo.dto.CouponDto;
import com.bookit.demo.model.Coupon;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CouponRepository extends MongoRepository<Coupon,String> {
    Optional<Coupon> findByCode(String code);

    @Aggregation(pipeline = {
            "{'$match': {userId: ?0, used: false}}"
    })
    List<CouponDto> findByUserId(String userId);
}
