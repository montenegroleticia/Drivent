import { prisma } from '@/config';

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function findAllBookings(roomId: number) {
  const bookings = await prisma.booking.findMany({
    where: {
      roomId,
    },
  });

  return bookings;
}

async function findRoom(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
    include: {
      Booking: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
      updatedAt: new Date(),
    },
  });
}

const bookingRepository = { findBooking, findRoom, createBooking, updateBooking, findAllBookings };

export default bookingRepository;
