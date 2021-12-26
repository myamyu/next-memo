import {
  MetaFunction,
  ActionFunction,
  json,
  redirect,
  useActionData,
} from 'remix';
import MemoForm from '~/components/memo-form';
import {add, APIError} from '~/memo.server';

export const meta: MetaFunction = () => {
  return {
    titile: 'メモを追加',
  };
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  try {
    const errors = await add(formData);
    if (Object.keys(errors).length > 0) {
      return json(errors);
    }
    return redirect('/');
  } catch (err) {
    return json({message: 'API Error'}, (err as APIError).status || 500);
  }
};

export default function Add() {
  const errors = useActionData();

  return (
    <>
      <h1>メモを追加</h1>
      <MemoForm errors={errors} />
    </>
  );
}
