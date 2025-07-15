package com.bookit.demo.service.facility;

import com.bookit.demo.dto.FacilityDto;
import com.bookit.demo.model.Facility;
import com.bookit.demo.repository.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public List<Facility> getFacilities(){
        return facilityRepository.findAll();
    }

    public Facility save(FacilityDto facilityDto){
        Facility facilityToSave = Facility.builder()
                                    .name(facilityDto.getName())
                                    .facilityType(facilityDto.getFacilityType())
                                    .description(facilityDto.getDescription())
                                    .build();
        return facilityRepository.save(facilityToSave);
    }

    public List<FacilityDto> getFacilitiesByRoomId(List<String> ids){
        return facilityRepository.getFacilitiesByIds(ids);
    }
}
