import type { NextApiRequest, NextApiResponse } from 'next'
const endpoint = process.env.MEMO_API_ENDPOINT || 'http://localhost:3001/memos';

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const methods:{[key: string]:Handler} = {
  'get': async (req: NextApiRequest, res: NextApiResponse<Memo[]|null>) => {
    const apiRes = await fetch(`${endpoint}/`);
    if (!apiRes.ok) {
      res.status(500).send(null);
      return;
    }

    const apiResData = await apiRes.json();
    res.status(200).json(apiResData as Memo[]);
  },
  'post': async (req: NextApiRequest, res: NextApiResponse<Memo|null>) => {
    const apiRes = await fetch(`${endpoint}/`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    if (!apiRes.ok) {
      res.status(500).send(null);
      return;
    }
    const apiResData = await apiRes.json();
    res.status(200).json(apiResData as Memo);
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
