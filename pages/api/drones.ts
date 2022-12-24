import { NextApiRequest, NextApiResponse } from 'next';
import { Pilots } from "./classes/Pilots.class";

export default async function violatorsPilots(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const violatorsPilots = Pilots.init();
    const { pilots, atr_snapshotTimestamp } = await violatorsPilots.bootstrap();
    res.status(200).json({ pilots, atr_snapshotTimestamp });
  }
}
