import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { assetValidationSchema } from 'validationSchema/assets';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.asset
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getAssetById();
    case 'PUT':
      return updateAssetById();
    case 'DELETE':
      return deleteAssetById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAssetById() {
    const data = await prisma.asset.findFirst(convertQueryToPrismaUtil(req.query, 'asset'));
    return res.status(200).json(data);
  }

  async function updateAssetById() {
    await assetValidationSchema.validate(req.body);
    const data = await prisma.asset.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteAssetById() {
    const data = await prisma.asset.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
