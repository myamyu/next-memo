import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => {
  return fetch(url)
    .then((res: Response) => {
      return res.json();
    });
};

// 改行を<br>に
const LfToBr = (text:string) => text
  .split('\n')
  .map((s, i) => <React.Fragment key={i}>{i === 0 ? '' : <br />}{s}</React.Fragment>);

const Memos = () => {
  const {data, error} = useSWR('/api/memo/', fetcher)
  if (error) return <div>えらーだ！！！</div>
  if (!data) return <div>ロード中…</div>
  const memos = data as Memo[];

  return (
    <ul>
      {
        memos.map((memo) => {
          return (
            <li key={memo.id}>
              <h3>{memo.title}</h3>
              <p>{LfToBr(memo.description)}</p>
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
