import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cleanupValidationSchema } from 'validationSchema/cleanups';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cleanup
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCleanupById();
    case 'PUT':
      return updateCleanupById();
    case 'DELETE':
      return deleteCleanupById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCleanupById() {
    const data = await prisma.cleanup.findFirst(convertQueryToPrismaUtil(req.query, 'cleanup'));
    return res.status(200).json(data);
  }

  async function updateCleanupById() {
    await cleanupValidationSchema.validate(req.body);
    const data = await prisma.cleanup.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCleanupById() {
    const data = await prisma.cleanup.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
