import Head from 'next/head'
import Memos from '../components/memos2';
import { InferGetServerSidePropsType } from 'next'

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/memo/');
  const data = await res.json();
  const memos = data as Memo[];

  return {props: {memos}};
};

const Home = ({memos}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        <Memos memos={memos} />
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default Home
