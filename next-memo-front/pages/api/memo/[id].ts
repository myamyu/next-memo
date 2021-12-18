import type { NextApiRequest, NextApiResponse } from 'next'
const endpoint = process.env.MEMO_API_ENDPOINT || 'http://localhost:3001/memos';

type Handler = (req: NextApiRequest, res: NextApiResponse) => void 
const methods:{[key:string]:Handler} = {
  'get': async (req: NextApiRequest, res: NextApiResponse<Memo>) => {
    const apiRes = await fetch(`${endpoint}/${req.query['id']}`);
    if (!apiRes.ok) {
      console.error(`API Error ${apiRes.status}`);
      res.status(apiRes.status || 500).end();
      return;
    }

    const apiResData = await apiRes.json();
    res.status(200).json(apiResData as Memo);
  },
  'put': async (req: NextApiRequest, res: NextApiResponse<void>) => {
    const apiRes = await fetch(`${endpoint}/${req.query['id']}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!apiRes.ok) {
      console.error(`API Error ${apiRes.status}`);
      res.status(apiRes.status || 500).send();
      return;
    }
    res.status(200).send();
  },
  'delete': async (req: NextApiRequest, res: NextApiResponse<void>) => {
    const apiRes = await fetch(`${endpoint}/${req.query['id']}`, {
      method: 'delete',
    });

    if (!apiRes.ok) {
      console.error(`API Error ${apiRes.status}`);
      res.status(apiRes.status || 500).send();
      return;
    }
    res.status(200).send();
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  const method = methods[(req.method || '').toLowerCase()];
  if (!method) {
    res.status(404).json();
    return;
  }

  await method(req, res);
}
