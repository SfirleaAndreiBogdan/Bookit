package com.bookit.demo.controller;

import com.bookit.demo.dto.OfferDetails;
import com.bookit.demo.dto.OfferDto;
import com.bookit.demo.model.Offer;
import com.bookit.demo.model.User;
import com.bookit.demo.service.offer.OfferService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("/offer")
public class OfferController {

    private final OfferService offerService;
    @PostMapping
    private Offer add(@RequestBody OfferDto offerDto){
        return offerService.add(offerDto);
    }


    @PutMapping
    private Offer update(@RequestBody OfferDto offerDto) throws Exception {
        return offerService.update(offerDto);
    }
    @GetMapping
    private List<OfferDetails> getOffers(){
        return offerService.getOffers();
    }

        @GetMapping("/{userId}")
        private List<OfferDetails> getOffersByUserId(@PathVariable String userId){
            return offerService.getOffersByUserId(userId);
        }

        @GetMapping("/detail/{offerId}")
        private OfferDetails getOffer(@PathVariable String offerId) throws Exception {
            return offerService.getOfferById(offerId);
        }

        @DeleteMapping("/{offerId}")
        private void delete(@PathVariable String offerId) throws Exception {
             offerService.delete(offerId);
        }
}
