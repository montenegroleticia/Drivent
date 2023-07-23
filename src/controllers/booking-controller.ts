import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const booking = await bookingService.getBookingService(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (e) {
    if (e.name == 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(e.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const roomId = Number(req.body.roomId);

    const booking = await bookingService.postBookingService(userId, roomId);
    return res.status(httpStatus.OK).send(booking);
  } catch (e) {
    if (e.name == 'ForbiddenError') {
      return res.status(httpStatus.FORBIDDEN).send(e.message);
    }
    if (e.name == 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(e.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const roomId = Number(req.body.roomId);
    const bookingId = Number(req.params.bookingId);

    const booking = await bookingService.putBookingService(userId, roomId, bookingId);
    return res.status(httpStatus.OK).send(booking);
  } catch (e) {
    if (e.name == 'ForbiddenError') {
      return res.status(httpStatus.FORBIDDEN).send(e.message);
    }
    if (e.name == 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(e.message);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
