package com.bookit.demo.dto;

import com.bookit.demo.model.Coupon;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouponDto {

    private String id;
    private String code;
    private BigDecimal discount;
    private boolean used;
}
