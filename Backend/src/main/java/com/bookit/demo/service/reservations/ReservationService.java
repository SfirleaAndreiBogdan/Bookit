package com.bookit.demo.service.reservations;

import com.bookit.demo.dto.ReservationDto;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

public interface ReservationService {
    List<Date[]> findAllReservationsDateByRoomId(String roomId);

    List<ReservationDto> findByCompanyId(String companyId);

    void deleteReservation(String reservationId) throws Exception;
}
