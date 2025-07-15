package com.bookit.demo.service.offer;

import com.bookit.demo.dto.OfferDetails;
import com.bookit.demo.dto.OfferDto;
import com.bookit.demo.model.Offer;
import com.bookit.demo.repository.OfferRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class OfferService {

    private final OfferRepository offerRepository;

    public Offer add(OfferDto offerDto){
        Offer offerToSave = Offer
                                .builder()
                                .description(offerDto.getDescription())
                                .price(offerDto.getPrice())
                                .endDate(offerDto.getEndDate())
                                .startDate(offerDto.getStartDate())
                                .nights(offerDto.getNights())
                                .roomId(offerDto.getRoomId())
                                .userId(offerDto.getUserId())
                                .build();

        return offerRepository.save(offerToSave);
    }

    public List<OfferDetails> getOffers(){
        return offerRepository.findAllOffersWithRoomDetails();
    }

    public List<OfferDetails> getOffersByUserId(String userId){
        return offerRepository.findByUserId(userId);
    }

    public OfferDetails getOfferById(String offerId) throws Exception {
        Optional<Offer> offer = offerRepository.findById(offerId);
        if (offer.isPresent()) {
            return OfferDetails
                    .builder()
                    .description(offer.get().getDescription())
                    .startDate(offer.get().getStartDate())
                    .endDate(offer.get().getEndDate())
                    .price(offer.get().getPrice())
                    .nights(offer.get().getNights())
                    .build();
        }

        throw new Exception("Offer not found.");
    }

    public Offer update(OfferDto offerDto) throws Exception {
        Optional<Offer> data = offerRepository.findById(offerDto.getId());

        if (data.isPresent()){
            Offer offer = data.get();

            offer.setDescription(offerDto.getDescription());
            offer.setPrice(offerDto.getPrice());
            offer.setNights(offerDto.getNights());
            offer.setStartDate(offerDto.getStartDate());
            offer.setEndDate(offerDto.getEndDate());

            return offerRepository.save(offer);
        }
        throw new Exception("Offer not found.");
    }
    public void delete(String offerId) throws Exception {
        Optional<Offer> offer = Optional.of(offerRepository.findById(offerId).orElseThrow());

        offer.ifPresent(offerRepository::delete);
    }
}
