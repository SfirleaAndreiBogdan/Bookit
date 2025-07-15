package com.bookit.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "counties_cities")
@NoArgsConstructor
@AllArgsConstructor
public class CountryAndCities {
    @Id
    private String id;
    private String county;
    private List<String> city;
}
