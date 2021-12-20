import Head from 'next/head';
import { useRouter } from 'next/router';
import MemoForm from '../components/memo-form';

export default function Add() {
  const router = useRouter();
  const onSubmit = async (memo:Memo) => {
    const res = await fetch('/api/memo', {
      method: 'post',
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

  return (
    <div>
      <Head>
        <title>メモを追加</title>
      </Head>
      <h1>メモを追加</h1>
      <MemoForm onSubmit={onSubmit} />
    </div>
  );
};
