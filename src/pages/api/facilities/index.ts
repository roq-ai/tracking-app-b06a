import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { facilityValidationSchema } from 'validationSchema/facilities';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFacilities();
    case 'POST':
      return createFacility();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFacilities() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.facility
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'facility'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createFacility() {
    await facilityValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.asset?.length > 0) {
      const create_asset = body.asset;
      body.asset = {
        create: create_asset,
      };
    } else {
      delete body.asset;
    }
    if (body?.cleanup?.length > 0) {
      const create_cleanup = body.cleanup;
      body.cleanup = {
        create: create_cleanup,
      };
    } else {
      delete body.cleanup;
    }
    const data = await prisma.facility.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
