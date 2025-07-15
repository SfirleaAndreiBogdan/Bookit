package com.bookit.demo.controller;

import com.bookit.demo.dto.RoomDetails;
import com.bookit.demo.dto.RoomDto;
import com.bookit.demo.service.search_page.SearchPage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class SearchPageController {

    // == public repository fields ==

    @Autowired
    private SearchPage searchPage;
    // == Mapping Methods ==
    @GetMapping("/search-page")
    public ResponseEntity<List<RoomDetails>> getBookingsBySearchCriterias(@RequestParam Map<String,String> Params){

        List<RoomDetails> bookingsGet = searchPage.getBookingsBySearchCriteria(Params);
        return ResponseEntity.ok(bookingsGet);
    }
}
