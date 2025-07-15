package com.bookit.demo.service.client;

import com.bookit.demo.dto.*;
import com.bookit.demo.enums.ReservationStatus;
import com.bookit.demo.enums.ReviewStatus;
import com.bookit.demo.model.*;
import com.bookit.demo.repository.*;
import com.bookit.demo.service.coupon.CouponService;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Slf4j
@Service
public class ClientServiceImpl implements ClientService{

    // == fields ==

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CouponService couponService;

    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private OfferRepository offerRepository;

    // == public methods ==
    public List<RoomDto> getAllBookings(){
        return roomRepository.findAll()
                .stream()
                .map(Room::getDto).collect(Collectors.toList());
    }

    public List<RoomDto> getBookingByName(String name){
        return roomRepository.findAllByName(name).stream()
                .map(Room::getDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(String userId) {
        Optional<User> user = userRepository.findById(new ObjectId(userId));
        return user.map(User::getuserDto).orElse(null);
    }

    public boolean bookService(ReservationDto reservationDto){
        ObjectId userId = new ObjectId(reservationDto.getUserId());

        var reservations = getReservationByRoomId(reservationDto.getRoomId());

        boolean isOverlap = reservations.stream().anyMatch(existing ->
                !reservationDto.getEndDate().before(existing.getStartDate()) &&
                        !reservationDto.getStartDate().after(existing.getEndDate())
        );


        Optional<Room> optionalBookings = roomRepository.findById(reservationDto.getRoomId());
        Optional<User> optionalUser = userRepository.findById(userId);


        if (optionalBookings.isPresent() && optionalUser.isPresent() && !isOverlap){
            Reservation reservation = new Reservation();
            reservationDto.setBookingName(optionalBookings.get().getName());
            reservationDto.setClientName(optionalUser.get().getFirstName()
                                        + " " + optionalUser.get().getLastName());

            reservation.setStartDate(reservationDto.getStartDate());
            reservation.setEndDate(reservationDto.getEndDate());
            reservation.setReservationStatus(ReservationStatus.PENDING);
            reservation.setUserId(new ObjectId(optionalUser.get().getId()));
            reservation.setRoomId(new ObjectId(optionalBookings.get().getId()));
            reservation.setCompanyId(new ObjectId(optionalBookings.get().getCompany().getId()));
            reservation.setReviewStatus(ReviewStatus.FALSE);
            reservation.setPrice(reservationDto.getPrice());
            reservation.setOfferId(reservationDto.getOfferId());

            if (reservationDto.getCouponDetails() != null) {
                Optional<Coupon> optionalCoupon = couponService.findOrThrow(reservationDto.getCouponDetails().getId());

                if (optionalCoupon.isPresent()) {
                    Coupon coupon = optionalCoupon.get();
                    coupon.setUsed(true);
                    couponRepository.save(coupon);
                }
                reservation.setCouponDetails(reservationDto.getCouponDetails());
            }
            reservationRepository.save(reservation);
            return true;
        }
        return false;
    }

    public bookingDetailsForClientDto getDetailsById(String roomId){
        RoomDetails roomDetails = roomRepository.findByIdWithFacilities(roomId);
        bookingDetailsForClientDto bdc = new bookingDetailsForClientDto();
        if (roomDetails != null){
            bdc.setRoomDetails(roomDetails);

            List<Review> reviewList = reviewRepository.findByRoomId(roomId);

            bdc.setReviewDto(reviewList.stream()
                    .map(review -> {
                        User user = userRepository.findById(new ObjectId(review.getUserId())).orElse(null);

                        ReviewDto reviewDto = new ReviewDto();

                        reviewDto.setReview(review.getReview());
                        reviewDto.setReviewDate(review.getReviewDate());
                        reviewDto.setRating(review.getRating());
                        reviewDto.setUserId(review.getUserId());
                        reviewDto.setRoomId(review.getRoomId());

                        reviewDto.setClientName(user.getFirstName() + " " + user.getLastName());
                        reviewDto.setBookingName(roomDetails.getName());

                        return reviewDto;
                    }).collect(Collectors.toList()));
        }
        return bdc;
    }
    public List<ReservationDetails> getBookingsByUserId(String userId){
        ObjectId user = new ObjectId(userId);
        return reservationRepository.findByUserId(user)
                .stream()
                .map(reservation -> {
                    Room booking = roomRepository.findById(reservation.getRoomId().toString()).orElse(null);
                    var offer = offerRepository.findById(reservation.getOfferId());
                    ReservationDetails dto = new ReservationDetails();
                    dto.setId(reservation.getId().toString());
                    dto.setStartDate(reservation.getStartDate());
                    dto.setEndDate(reservation.getEndDate());
                    dto.setReservationStatus(reservation.getReservationStatus());
                    dto.setReviewStatus(reservation.getReviewStatus());
                    dto.setRoomId(reservation.getRoomId().toString());
                    dto.setUserId(reservation.getUserId().toString());
                    dto.setCompanyId(reservation.getCompanyId().toString());
                    dto.setBookingName(booking.getName());
                    dto.setCounty(booking.getCounty());
                    dto.setCity(booking.getCity());
                    dto.setPrice(booking.getPrice());
                    offer.ifPresent(dto::setOfferDetails);
                    dto.setCouponDetails(reservation.getCouponDetails());
                    return dto;
                }).collect(Collectors.toList());
    }
    @Override
    public boolean updateUser(UserDto userDto) {
        Optional<User> userOpt = userRepository.findById(new ObjectId(userDto.getId()));

        if (userOpt.isPresent()) {
            User user = userOpt.get();

                user.setFirstName(userDto.getFirstName());

                user.setLastName(userDto.getLastName());

                user.setEmail(userDto.getEmail());

                user.setPhone(userDto.getPhone());

                user.setCounty(userDto.getCounty());

                user.setCity(userDto.getCity());

            userRepository.save(user);

            return true;
        }
        return false;
    }

    public Boolean giveReview(ReviewDto reviewDto) {

        Optional<User> optionalUser = userRepository.findById(new ObjectId(reviewDto.getUserId()));

        if (optionalUser.isPresent()) {
            Review review = new Review();
            review.setReviewDate(new Date());
            review.setReview(reviewDto.getReview());
            review.setRating(reviewDto.getRating());
            review.setClientName(optionalUser.get().getFirstName() + " " + optionalUser.get().getLastName());
            review.setUserId(optionalUser.get().getId());

            if (reviewDto.getReservationId() != null && !reviewDto.getReservationId().isEmpty()) {
                Optional<Reservation> optionalReservation = reservationRepository.findById(new ObjectId(reviewDto.getReservationId()));

                Reservation booking = optionalReservation.get();
                booking.setReviewStatus(ReviewStatus.TRUE);
                reservationRepository.save(booking);

                review.setReservationId(reviewDto.getReservationId());
                review.setRoomId(booking.getRoomId().toString());
            }

            reviewRepository.save(review);

            return true;
        }

        return false;
    }

    public List<ReviewDto> getAllReviewSite(String userId, String bookingId, String reservationId){
        return reviewRepository.findByUserIdAndRoomIdAndReservationId(userId,bookingId,reservationId);
    }

    public List<ReservationDetails> getReservationByRoomId(String roomId){
        return reservationRepository.findByBookingId(new ObjectId(roomId));
    }
}
