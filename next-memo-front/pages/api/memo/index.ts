import type { NextApiRequest, NextApiResponse } from 'next'

type Handler = (req: NextApiRequest, res: NextApiResponse) => void;
const methods:{[key: string]:Handler} = {
  'get': (req: NextApiRequest, res: NextApiResponse<Memo[]>) => {
    res.status(200)
      .json([
        {id: 0, title: 'めもめも', description: 'あいうえお\nかきくけこ'},
        {id: 1, title: 'めもめも2', description: 'あいうえお\nかきくけこ'},
        {id: 2, title: 'めもめも3', description: 'あいうえお\nかきくけこ'},
      ]);
  },
  'post': (req: NextApiRequest, res: NextApiResponse<Memo>) => {
    res.status(200)
      .json(
        {id: 0, title: 'めもめも', description: 'あいうえお\nかきくけこ'},
      );
  },
}

export default function handler(req: NextApiRequest, res:NextApiResponse<Memo[]|Memo|void>) {
  const method = methods[(req.method || '').toLowerCase()];
  if (!method) {
    res.status(404).json();
    return;
  }

  method(req, res);
}
