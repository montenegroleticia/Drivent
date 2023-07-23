import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getBookingService(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function postBookingService(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw {
      name: 'ForbiddenError',
      message: 'Not authorized to access',
    };
  }
  const booking = await bookingRepository.findAllBookings(userId);
  if (!booking) throw notFoundError();

  const room = await bookingRepository.findRoom(roomId);
  if (!room) throw notFoundError();

  if (booking.length <= room.capacity) {
    throw {
      name: 'ForbiddenError',
      message: 'Not authorized to access',
    };
  }

  const createBooking = await bookingRepository.createBooking(userId, roomId);
  return createBooking;
}

async function putBookingService(bookingId: number, roomId: number, userId: number) {
  const booking = await bookingRepository.findAllBookings(userId);
  if (!booking) throw notFoundError();

  const bookingUser = await bookingRepository.findBooking(userId);
  if (!bookingUser) {
    throw {
      name: 'ForbiddenError',
      message: 'Not authorized to access',
    };
  }

  const room = await bookingRepository.findRoom(roomId);
  if (!room) throw notFoundError();

  if (booking.length <= room.capacity) {
    throw {
      name: 'ForbiddenError',
      message: 'Not authorized to access',
    };
  }

  const updatebooking = await bookingRepository.updateBooking(bookingId, roomId);
  return updatebooking;
}

const bookingService = { getBookingService, postBookingService, putBookingService };

export default bookingService;
