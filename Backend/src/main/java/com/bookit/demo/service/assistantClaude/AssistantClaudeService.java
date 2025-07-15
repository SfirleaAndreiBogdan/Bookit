package com.bookit.demo.service.assistantClaude;

import com.bookit.demo.dto.ReservationDetails;
import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.enums.UserRoles;
import com.bookit.demo.model.Room;
import com.bookit.demo.model.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AssistantClaudeService {

    @Value("${anthropic.api.url}")
    private String apiUrl;

    @Value("${anthropic.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String sendMessage(String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = new HashMap<>();
        body.put("model", "claude-3-opus-20240229");
        body.put("max_tokens", 1024);
        body.put("messages", List.of(Map.of("role", "user", "content", message)));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

        return response.getBody();
    }

    public String sendMessageWithData(String message, List<Room> bookings, List<Review> reviews, List<ReservationDetails> reservationDtoList, UserRoles roles) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", "2023-06-01");
        headers.setContentType(MediaType.APPLICATION_JSON);
        String systemPrompt;

        if (roles.isClient() || roles.isAnonim()) {
            systemPrompt = buildSystemPrompt(bookings, reviews, reservationDtoList);
        }else {
            systemPrompt = buildSystemPromptCompany(bookings, reviews);
        }

        Map<String, Object> body = new HashMap<>();
        body.put("model", "claude-3-opus-20240229");
        body.put("max_tokens", 1024);
        body.put("system", systemPrompt);

        body.put("messages", List.of(
                Map.of("role", "user", "content", message)
        ));


        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

        return response.getBody();
    }

    private String buildSystemPromptCompany(List<Room> bookings, List<Review> reviews) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are a smart financial consultant assisting a company in analyzing the performance of its rental rooms. ");
        prompt.append("Your job is to provide clear and professional financial advice based on the available data, including room bookings and customer reviews. ");
        prompt.append("Always answer in English. Be concise, analytical, and data-driven in your responses.\n\n");

        if (bookings != null && !bookings.isEmpty()) {
            prompt.append("=== Room Financial Data ===\n");
            bookings.forEach(room -> {
                prompt.append("Name: ").append(room.getName()).append(" | ");
                prompt.append("Location: ").append(room.getCity()).append(", ").append(room.getCounty()).append(" | ");
                prompt.append("Price per night: ").append(room.getPrice()).append(" RON\n");
            });
        }

        if (reviews != null && !reviews.isEmpty()) {
            prompt.append("\n=== Customer Reviews ===\n");
            reviews.forEach(review -> {
                prompt.append("Rating: ").append(review.getRating()).append("/5 | ");
                prompt.append("Comment: \"").append(review.getReview()).append("\"\n");
            });
        }

        prompt.append("\n=== Analysis Guidelines ===\n");
        prompt.append("1. Evaluate price trends and performance per location.\n");
        prompt.append("2. Consider average ratings and identify rooms with high or low customer satisfaction.\n");
        prompt.append("3. Recommend improvements for underperforming rooms or pricing strategies.\n");
        prompt.append("4. Make comparisons across cities/counties where applicable.\n");

        prompt.append("\n=== Data Privacy Notice ===\n");
        prompt.append("Note: You do not have access to personal customer data beyond the reviews and booking info provided. ");
        prompt.append("Avoid speculation on individual user behavior or personal data.\n");

        prompt.append("\n=== Optimization Suggestions ===\n");
        prompt.append("When appropriate, suggest strategies such as dynamic pricing, targeted promotions for underbooked rooms, improving customer service, or enhancing online room descriptions.\n");

        prompt.append("\n=== Reporting and Next Steps ===\n");
        prompt.append("Encourage using these insights for monthly or quarterly performance reviews, budget adjustments, and marketing campaigns.\n");

        prompt.append("\n=== Example response ===\n");
        prompt.append("User: 'How do rooms in Iași compare to those in Cluj?'\n");
        prompt.append("Assistant: 'Rooms in Iași have an average price of 180 RON/night and an average rating of 4.6/5. ");
        prompt.append("In comparison, rooms in Cluj average 220 RON/night with a 4.2/5 rating. ");
        prompt.append("We recommend evaluating the service quality in Cluj or adjusting pricing to remain competitive.'");

        prompt.append("\n=== Additional Example Response ===\n");
        prompt.append("User: 'What can we do to improve bookings for the room \"Deluxe Suite\"?'\n");
        prompt.append("Assistant: 'The room \"Deluxe Suite\" has a lower booking rate compared to similar rooms in the area and an average rating of 3.8/5. ");
        prompt.append("Consider revising the room description for clarity, adjusting the price slightly, and encouraging guests to leave positive reviews to boost visibility.'");

        return prompt.toString();
    }


    private String buildSystemPrompt(List<Room> bookings, List<Review> reviews, List<ReservationDetails> reservationDtos) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a helpful assistant for BookIt, a hotel booking platform. ");
        prompt.append("Your role is to help users with questions about rooms in ANY city or county. ");
        prompt.append("Always check the exact location from the provided data before answering. ");
        prompt.append("Answer in Romanian by default, using the local city/county names as provided in the data.\n\n");

        if (bookings != null && !bookings.isEmpty()) {
            prompt.append("=== Rooms Database ===\n");
            bookings.forEach(room -> {
                prompt.append("ID: ").append(room.getId()).append(" | ");
                prompt.append("Name: ").append(room.getName()).append(" | ");
                prompt.append("Location: ").append(room.getCity()).append(", ").append(room.getCounty()).append(" | ");
                prompt.append("Price: ").append(room.getPrice()).append(" RON | ");
            });
        }

        if (reviews != null && !reviews.isEmpty()) {
            prompt.append("\n=== Reviews Database ===\n");
            reviews.forEach(review -> {
                prompt.append("Rating: ").append(review.getRating()).append("/5 | ");
                prompt.append("Review: \"").append(review.getReview()).append("\"\n");
            });
        } else {
            prompt.append("\n=== Reviews Handling ===\n");
            prompt.append("Currently, there are no reviews available for the selected room(s). This might mean the room is newly listed. You can inform the user accordingly.\n");
        }

        if (reservationDtos != null && !reservationDtos.isEmpty()) {
            prompt.append("\n=== Reservations Database ===\n");
            reservationDtos.forEach(reservation -> {
                prompt.append("Reservation ID: ").append(reservation.getId()).append(" | ");
                prompt.append("Room ID: ").append(reservation.getRoomId()).append(" | ");
                prompt.append("Client: ").append(reservation.getClientName()).append(" | ");
                prompt.append("Check-in: ").append(reservation.getStartDate()).append(" | ");
                prompt.append("Check-out: ").append(reservation.getEndDate()).append("\n");
            });
        }

        prompt.append("\n=== Location Handling Guide ===\n");
        prompt.append("1. When asked about a city (e.g. 'Cluj', 'Iași'), check both city AND county fields\n");
        prompt.append("2. Some cities may exist in multiple counties (e.g. 'Pascani' in both Iași și Bacău)\n");
        prompt.append("3. Always respond with full location format: 'City, County'\n");
        prompt.append("4. For misspelled city names, suggest similar existing cities\n\n");

        prompt.append("\n=== Cancellation Guide ===\n");
        prompt.append("If the user asks about canceling a booking, kindly inform them that they can manage and cancel their bookings by going to the 'My Bookings' section.\n");

        prompt.append("\n=== User Guidance ===\n");
        prompt.append("Always respond politely and clearly. ");
        prompt.append("If you don't have enough information, ask the user for clarification. ");
        prompt.append("Offer suggestions if the user question is vague or incomplete. ");
        prompt.append("Confirm with the user when information about location or dates is ambiguous.\n");

        prompt.append("\n=== Business / Owner Guide ===\n");
        prompt.append("If the user asks about increasing revenues, managing properties, or viewing reports, kindly inform them that you do not have access to personal or financial information. ");
        prompt.append("Suggest they consult the platform’s dedicated business section or contact support for detailed assistance.\n");

        prompt.append("\n=== Language Handling ===\n");
        prompt.append("Answer in Romanian by default, but if the user requests another language (e.g. English), respond accordingly.\n");

        prompt.append("\n=== Handling Ambiguous or Incorrect Inputs ===\n");
        prompt.append("If the user misspells a city or location, suggest similar city names. ");
        prompt.append("If a question is ambiguous, ask for clarification.\n");

        prompt.append("\n=== Example Interactions ===\n");
        prompt.append("User: 'How can I cancel a booking?'\n");
        prompt.append("Assistant: 'To cancel a booking, please go to the \"My Bookings\" section in your account and select the booking you want to cancel.'\n\n");

        prompt.append("User: 'What rooms are available in Cluj in August?'\n");
        prompt.append("Assistant: 'The following rooms are available in Cluj, Cluj:\n");
        prompt.append("- Deluxe Room, 150 RON/night\n");
        prompt.append("- Standard Room, 100 RON/night\n");
        prompt.append("Would you like to see reviews for these rooms as well?'\n\n");

        prompt.append("User: 'How can I increase my earnings on the platform?'\n");
        prompt.append("Assistant: 'To increase your earnings, you can optimize your prices, improve your room descriptions, and respond promptly to reviews. You can also promote your rooms during peak periods.'\n\n");

        prompt.append("User: 'What rooms are there in Pascani?'\n");
        prompt.append("Assistant: 'I found rooms in:\n");
        prompt.append("- Pașcani, Iași (2 rooms available)\n");
        prompt.append("- Pașcani, Bacău (1 room available)\n");
        prompt.append("Which of these locations are you interested in?'\n");

        prompt.append("User: 'Is the Deluxe room available from July 10th to July 15th?'\n");
        prompt.append("Assistant: 'The Deluxe room is already booked for the period from July 10th to July 15th. Would you like me to suggest another period or a different room in the same area?'\n\n");

        prompt.append("User: 'Is the Deluxe room available from July 10th to July 15th?'\n");
        prompt.append("Assistant: 'Yes, the Deluxe room is available from July 10th to July 15th. It is located in Cluj, Cluj, and costs 150 RON per night. Would you like to book it or see reviews for this room?'\n");

        return prompt.toString();
    }


}