import type { NextApiRequest, NextApiResponse } from 'next'

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
const methods:{[key: string]:Handler} = {
  'get': async (req: NextApiRequest, res: NextApiResponse<Memo[]>) => {
    await (
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 800);
      })
    );
    res.status(200)
      .json([
        {id: 0, title: 'めもめも', description: 'あいうえお\nかきくけこ'},
        {id: 1, title: 'めもめも2', description: 'あいうえお\nかきくけこ'},
        {id: 2, title: 'めもめも3', description: 'あいうえお\nかきくけこ'},
        {id: 3, title: 'めもめも3', description: 'あいうえお,かきくけこ'},
      ]);
  },
  'post': async (req: NextApiRequest, res: NextApiResponse<Memo>) => {
    res.status(200)
      .json(
        {id: 0, title: 'めもめも', description: 'あいうえお\nかきくけこ'},
      );
  },
}

export default async function handler(req: NextApiRequest, res:NextApiResponse<Memo[]|Memo|void>) {
  const method = methods[(req.method || '').toLowerCase()];
  if (!method) {
    res.status(404).json();
    return;
  }

  await method(req, res);
}
