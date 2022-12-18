import { NextApiRequest, NextApiResponse } from 'next';
import { Pilots } from './classes/Pilots.class';

export default async function violatorsPilotes(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const violatorsPilotes = Pilots.init();
    const { pilots, atr_snapshotTimestamp } = await violatorsPilotes.bootstrap();
    res.status(200).json({ pilots, atr_snapshotTimestamp });
  }
}
