import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import LfToBr from './lf-to-br';
import { useRouter } from 'next/router';

const fetcher = (url: string) => {
  return fetch(url)
    .then((res: Response) => {
      return res.json();
    });
};

export default function Memos() {
  const router = useRouter();
  const {data, error, mutate} = useSWR<Memo[]>('/api/memo', fetcher)
  if (error) return <div>えらーだ!!!</div>
  if (!data) return <div>ロード中…</div>

  const deleteMemo = async (id?: number) => {
    if (typeof id === 'undefined') return;

    const res = await fetch(`/api/memo/${id}`, {
      method: 'delete',
    });

    if (!res.ok) {
      // TODO エラー処理入れる
      return;
    }
    await mutate();
  };

  return (
    <ul>
      {
        data.map((memo) => {
          return (
            <li key={memo.id}>
              <h3>{memo.title}</h3>
              <p><LfToBr text={memo.description} /></p>
              <div>
                <Link href={`/memo/${memo.id}/edit`}><a>編集</a></Link>
                <button onClick={() => deleteMemo(memo.id)}>削除</button>
              </div>
            </li>
          );
        })
      }
    </ul>
  )
};
