import {
  MetaFunction,
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
  useLoaderData,
  useActionData,
} from 'remix';
import MemoForm from '~/components/memo-form';
import {get, edit, APIError} from '~/memo.server';

export const meta: MetaFunction = () => {
  return {
    titile: 'メモを編集',
  };
};

export const loader: LoaderFunction = async ({params}) => {
  const id = params['id'];
  if (!(id && /\d+/.test(id))) {
    throw json({message: 'Illegal ID'}, 404);
  }

  try {
    const memo = await get(+id);
    return memo;
  } catch (err) {
    throw json({message: 'API Error'}, (err as APIError).status || 500);
  }
};

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  try {
    const errors = await edit(formData);
    if (Object.keys(errors).length > 0) {
      return json(errors);
    }
    return redirect('/');
  } catch (err) {
    return json({message: 'API Error'}, (err as APIError).status || 500);
  }
};

export default function Edit() {
  const memo = useLoaderData<Memo>();
  const errors = useActionData();

  return (
    <>
      <h1>メモを編集</h1>
      <MemoForm memo={memo} errors={errors} />
    </>
  );
}
