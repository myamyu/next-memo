import {useLoaderData, LoaderFunction, json, redirect} from 'remix';
import {deleteMemo, APIError} from '~/memo.server';

export const loader: LoaderFunction = async ({params}) => {
  const id = params['id'];
  if (!(id && /\d+/.test(id))) {
    throw json({message: 'Illegal ID'}, 404);
  }

  try {
    await deleteMemo(+id);
    return redirect('/');
  } catch (err) {
    throw json({message: 'API Error'}, (err as APIError).status || 500);
  }
};

export default function Delete() {
  useLoaderData();
  return <></>;
}
