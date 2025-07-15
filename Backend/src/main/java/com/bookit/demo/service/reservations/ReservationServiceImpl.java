package com.bookit.demo.service.reservations;

import com.bookit.demo.dto.ReservationDto;
import com.bookit.demo.enums.ReservationStatus;
import com.bookit.demo.model.Reservation;
import com.bookit.demo.repository.ReservationRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService{

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public List<Date[]> findAllReservationsDateByRoomId(String roomId) {
        return reservationRepository.findAll()
                .stream()
                .filter(reservation -> reservation.getRoomId().equals(roomId))
                .map(reservation -> new Date[] {
                        reservation.getStartDate(), reservation.getEndDate()
                })
                .collect(Collectors.toList());
    }


    @Override
    public List<ReservationDto> findByCompanyId(String companyId) {
        return reservationRepository.findByCompanyId(new ObjectId(companyId))
                .stream()
                .map(Reservation::reservationDto).collect(Collectors.toList());
    }

    @Override
    public void deleteReservation(String reservationId) throws Exception {
        var reservation = reservationRepository.findById(new ObjectId(reservationId));

        if (reservation.isPresent()){
            reservation.get().setReservationStatus(ReservationStatus.CANCELED);
            reservationRepository.save(reservation.get());
        }else {
            throw new Exception("Reservation not found.");
        }
    }
}
