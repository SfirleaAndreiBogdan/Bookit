package com.bookit.demo.dto;

import com.bookit.demo.model.Offer;
import com.bookit.demo.model.Room;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OfferDetails {

    private String id;

    private BigDecimal price;

    private int nights;

    private String description;

    private Date startDate;

    private Date endDate;

    private Room roomDetails;
}
