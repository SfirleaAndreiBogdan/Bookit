package com.bookit.demo.controller;

import com.bookit.demo.dto.CouponDto;
import com.bookit.demo.model.Coupon;
import com.bookit.demo.service.coupon.CouponService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/coupons")
public class CouponController {
    private final CouponService couponService;

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    @PostMapping("/add")
    public Coupon createCoupon(@RequestBody Coupon coupon) throws Exception {
        return couponService.createCoupon(coupon);
    }

    @GetMapping("/user/{userId}")
    public List<CouponDto> getUserCoupons(@PathVariable String userId) {
        return couponService.getCouponByUserId(userId);
    }

    @GetMapping("/{code}")
    public ResponseEntity<Coupon> getCoupon(@PathVariable String code) {
        Optional<Coupon> coupon = couponService.getCouponByCode(code);
        return coupon.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/redeem/{code}")
    public ResponseEntity<String> redeemCoupon(@PathVariable String couponId) {
        boolean success = couponService.redeemCoupon(couponId);
        if (success) {
            return ResponseEntity.ok("Cupon utilizat cu succes!");
        } else {
            return ResponseEntity.badRequest().body("Cupon invalid sau deja folosit!");
        }
    }
}
