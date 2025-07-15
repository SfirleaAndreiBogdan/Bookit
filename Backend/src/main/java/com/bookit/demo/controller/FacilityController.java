package com.bookit.demo.controller;

import com.bookit.demo.dto.FacilityDto;
import com.bookit.demo.model.Facility;
import com.bookit.demo.service.facility.FacilityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/facility")
public class FacilityController {

    private final FacilityService facilityService;

    @GetMapping
    public List<Facility> getFacilities(){
        return facilityService.getFacilities();
    }

    @PostMapping
    public Facility save(@RequestBody FacilityDto facilityDto){
        return facilityService.save(facilityDto);
    }

    @GetMapping("/room")
    public List<FacilityDto> getFacilitiesByRoomId(@RequestParam List<String> ids){
        return facilityService.getFacilitiesByRoomId(ids);
    }
}
