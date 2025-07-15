    package com.bookit.demo.dto;

    import com.bookit.demo.enums.UserRoles;
    import com.bookit.demo.model.Room;
    import com.bookit.demo.model.Review;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import org.jetbrains.annotations.NotNull;

    import java.util.List;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public class ClaudeRequest {

        @NotNull
        private String message;

        @NotNull
        private List<Room> bookings;

        @NotNull
        private List<Review> reviews;

        private List<ReservationDetails> reservationDtoList;

        @NotNull
        private UserRoles role;
    }
