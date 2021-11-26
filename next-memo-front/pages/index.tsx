import type { NextPage } from 'next'
import Head from 'next/head'
import {Memos} from '../components/memos';

const Home: NextPage = () => {
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
        <Memos />
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default Home
