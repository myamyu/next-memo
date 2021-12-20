import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MemoForm from '../../../components/memo-form';

export default function Edit() {
  const router = useRouter();
  const {id} = router.query;
  const [memo, setMemo] = useState<Memo|null>(null);

  const onSubmit = async (memo:Memo) => {
    const res = await fetch(`/api/memo/${id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(memo),
    });

    if (!res.ok) {
      // TODO エラー処理入れる
      return;
    }
    router.push('/');
  };

  useEffect(() => {
    let unmounted = false;

    (async () => {
      if (unmounted) return;
      const apiRes = await fetch(`/api/memo/${id}`);
      if (!apiRes.ok) {
        // TODO エラー処理なんか考える
        return;
      }
      setMemo(await apiRes.json() as Memo);
    })();

    return () => {
      unmounted = true;
    }
  });

  return (
    <div>
      <Head>
        <title>メモを編集</title>
      </Head>
      <h1>メモを編集</h1>
      {!memo ? <p>ロード中</p> : <MemoForm memo={memo} onSubmit={onSubmit} /> }
    </div>
  );
};
