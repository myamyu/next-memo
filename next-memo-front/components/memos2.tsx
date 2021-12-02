import React from "react";
// 改行を<br>に
const LfToBr = (text:string) => text
  .split('\n')
  .map((s, i) => <React.Fragment key={i}>{i === 0 ? '' : <br />}{s}</React.Fragment>);

type Props = {
  memos:Memo[],
}

export default function Memos({memos}:Props) {
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
}
