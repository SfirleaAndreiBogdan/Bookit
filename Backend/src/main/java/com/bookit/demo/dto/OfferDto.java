package com.bookit.demo.dto;

import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OfferDto implements Serializable {

    private String id;

    private BigDecimal price;

    private int nights;

    private String description;

    private String roomId;

    private String userId;

    private Date startDate;

    private Date endDate;

}
