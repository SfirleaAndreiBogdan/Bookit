package com.bookit.demo.dto;


import com.bookit.demo.enums.FacilityType;
import lombok.Data;

@Data
public class FacilityDto {

    private String name;
    private String description;
    private FacilityType facilityType;
    private String icon;
}
