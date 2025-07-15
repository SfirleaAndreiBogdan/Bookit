package com.bookit.demo.service.coupon;
import com.bookit.demo.dto.CouponDto;
import com.bookit.demo.model.Coupon;
import com.bookit.demo.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CouponService {
    private final CouponRepository couponRepository;


    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public Optional<Coupon> getCouponByCode(String code) {
        return couponRepository.findByCode(code);
    }

    public Coupon createCoupon(Coupon coupon) throws Exception {
        var couponToSave = couponRepository.findByCode(coupon.getCode());

        if (couponToSave.isPresent()){
            throw new Exception("Coupon with this code already exists");
        }

        Coupon coupon1 = new Coupon();
        coupon1.setDiscount(coupon.getDiscount());
        coupon1.setCode(coupon.getCode());
        coupon1.setCompanyId(coupon.getCompanyId());
        coupon1.setUserId(coupon.getUserId());
        coupon1.setRoomId(coupon.getRoomId());

        return couponRepository.save(coupon1);
    }

    public List<CouponDto> getCouponByUserId(String userId){
        return couponRepository.findByUserId(userId);
    }


    public boolean redeemCoupon(String couponId) {
        Optional<Coupon> couponOpt = couponRepository.findById(couponId);
        if (couponOpt.isPresent() && !couponOpt.get().isUsed()) {
            Coupon coupon = couponOpt.get();
            coupon.setUsed(true);
            couponRepository.save(coupon);
            return true;
        }
        return false;
    }

    public Optional<Coupon> findOrThrow(String couponId){
        return couponRepository.findById(couponId);
    }
}
