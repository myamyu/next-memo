import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import LfToBr from './lf-to-br';

const fetcher = (url: string) => {
  return fetch(url)
    .then((res: Response) => {
      return res.json();
    });
};

const Memos = () => {
  const {data, error} = useSWR('/api/memo/', fetcher)
  if (error) return <div>えらーだ!!!</div>
  if (!data) return <div>ロード中…</div>
  const memos = data as Memo[];

  return (
    <ul>
      {
        memos.map((memo) => {
          return (
            <li key={memo.id}>
              <h3>{memo.title}</h3>
              <p><LfToBr text={memo.description} /></p>
              <div>
                <Link href={`/memo/${memo.id}/edit`}><a>編集</a></Link>
              </div>
            </li>
          );
        })
      }
    </ul>
  )
};

export {
  Memos,
};
