import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  memo?: Memo,
  onSubmit?: (memo: Memo) => void,
  onCancel?: () => void,
};

type FormData = {
  title: string,
  description: string,
};

export default function MemoForm({memo, onSubmit, onCancel}: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({mode: 'onChange'});
  const onSubmitHandler = handleSubmit((data) => {
    const res:Memo = {
      id: memo ? memo.id : undefined,
      title: data.title,
      description: data.description,
    };
    if (onSubmit) onSubmit(res);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <label>タイトル:</label><br />
      <input type="text" defaultValue={memo ? memo.title : ''} {...register('title', {required: true})} /><br />
      {errors.title && <p>タイトルは必須だよ</p>}
      <label>内容:</label><br />
      <textarea defaultValue={memo ? memo.description : ''} {...register('description', {required: true})} /><br />
      {errors.description && <p>内容を書いてね</p>}
      <input type="submit" value="保存" />
    </form>
  );
}
