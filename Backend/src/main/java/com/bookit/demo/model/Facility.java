package com.bookit.demo.model;

import com.bookit.demo.enums.FacilityType;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "facilities")
public class Facility {
    private String id;
    private String name;
    private String description;
    private FacilityType facilityType;
    private String icon;
}
