import React from 'react';

type Props = {
  text: string;
};

// 改行を<br>に
export default function LfToBr({text}: Props) {
  return (
    <>
      {text.split('\n').map((s, i) => (
        <React.Fragment key={i}>
          {i === 0 ? '' : <br />}
          {s}
        </React.Fragment>
      ))}
    </>
  );
}
