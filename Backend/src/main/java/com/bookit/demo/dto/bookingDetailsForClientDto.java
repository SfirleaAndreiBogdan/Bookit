package com.bookit.demo.dto;

import lombok.Data;

import java.util.List;

@Data
public class bookingDetailsForClientDto {

    private RoomDetails roomDetails;

    private List<ReviewDto> reviewDto;
}
