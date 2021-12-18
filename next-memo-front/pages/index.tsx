import Head from 'next/head';
import Link from 'next/link';
import {Memos} from '../components/memos';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Next Memo</title>
      </Head>
      <header>
        <h1>Next Memo</h1>
        <p>Next.jsを試したかったので作ったメモアプリ。</p>
      </header>
      <main>
        <div>
          <Link href="/add"><a>追加</a></Link>
        </div>
        <Memos />
      </main>
    </div>
  )
}

export default Home
