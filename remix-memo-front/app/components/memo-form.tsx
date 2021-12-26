import {Form, Link} from 'remix';
import {ValidationErrors} from '~/memo.server';

type Params = {
  memo?: Memo;
  errors?: ValidationErrors;
};

export default function MemoForm({memo, errors}: Params) {
  return (
    <Form method="post">
      <input type="hidden" name="id" defaultValue={memo ? memo.id : ''} />
      <label>タイトル:</label>
      <br />
      <input type="text" name="title" defaultValue={memo ? memo.title : ''} />
      {errors?.title && <p>{errors.title}</p>}
      <br />
      <label>内容:</label>
      <br />
      <textarea
        name="description"
        defaultValue={memo ? memo.description : ''}
      />
      {errors?.description && <p>{errors.description}</p>}
      <br />
      <button type="submit">保存</button>
      <Link to="/">戻る</Link>
    </Form>
  );
}
