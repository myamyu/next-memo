import type { NextApiRequest, NextApiResponse } from 'next'

type Handler = (req: NextApiRequest, res: NextApiResponse) => void 
const methods:{[key:string]:Handler} = {
  'put': (req: NextApiRequest, res: NextApiResponse<void>) => {

  },
  'delete': (req: NextApiRequest, res: NextApiResponse<void>) => {

  },
}
export default function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  const method = methods[(req.method || '').toLowerCase()];
  if (!method) {
    res.status(404).json();
    return;
  }

  method(req, res);
}
