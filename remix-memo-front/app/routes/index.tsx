import {Link} from 'remix';
import {useLoaderData, json} from 'remix';
import type {MetaFunction, LoaderFunction} from 'remix';
import LfToBr from '~/components/lf-to-br';
import {getAll, APIError} from '~/memo.server';

export const meta: MetaFunction = () => {
  return {
    title: 'めもとっぷ',
  };
};

export const loader: LoaderFunction = async () => {
  try {
    const memos = await getAll();
    return memos;
  } catch (err) {
    throw json({message: 'API Error'}, (err as APIError).status || 500);
  }
};

export default function Index() {
  const memos: Memo[] = useLoaderData() || [];
  return (
    <div>
      <h1>めもとっぷ</h1>
      <div>
        <Link to="/add">追加</Link>
      </div>
      <ul>
        {memos.map(memo => (
          <li key={memo.id}>
            <h3>{memo.title}</h3>
            <p>
              <LfToBr text={memo.description} />
            </p>
            <div>
              <Link to={`/${memo.id}/edit`}>編集</Link>{' '}
              <Link to={`/${memo.id}/delete`}>削除</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
