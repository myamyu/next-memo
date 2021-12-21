import {MetaFunction} from 'remix';

export const meta: MetaFunction = () => {
  return {
    title: 'めもとっぷ',
  };
};

export default function Index() {
  return (
    <div>
      <h1>めもとっぷ</h1>
    </div>
  );
}
