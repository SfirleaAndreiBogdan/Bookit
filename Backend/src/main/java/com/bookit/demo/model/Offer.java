package com.bookit.demo.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document(collection = "offers")
public class Offer {

    private String id;

    private BigDecimal price;

    private int nights;

    private String description;

    private String roomId;

    private String userId;

    private Date startDate;

    private Date endDate;
}
