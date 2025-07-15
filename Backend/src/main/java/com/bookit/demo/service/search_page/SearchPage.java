package com.bookit.demo.service.search_page;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;

import java.util.List;
import java.util.Map;

public interface SearchPage {
     List<RoomDetails> getBookingsBySearchCriteria(Map<String ,String> params);
}
