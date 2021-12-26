const endpoint = process.env.MEMO_API_ENDPOINT || 'http://localhost:3001/memos';

export type ValidationErrors = {
  [key: string]: string;
};

export class APIError extends Error {
  constructor(public status: number) {
    super('API Error');
  }
}

type MemoDto = {
  id?: FormDataEntryValue | null;
  title: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
};

function validation({title, description}: MemoDto): ValidationErrors {
  const errors: ValidationErrors = {};

  if (typeof title !== 'string' || title.length === 0) {
    errors['title'] = 'タイトルが入力されてないよ';
  }

  if (typeof description !== 'string' || description.length === 0) {
    errors['description'] = '内容が無いようだよ';
  }

  return errors;
}

export async function getAll(): Promise<Memo[]> {
  const apiRes = await fetch(`${endpoint}/`);
  if (!apiRes.ok) {
    throw new APIError(apiRes.status);
  }

  const apiResData = await apiRes.json();
  console.info('response', apiResData);
  return apiResData as Memo[];
}

export async function get(id: number): Promise<Memo> {
  const apiRes = await fetch(`${endpoint}/${id}`);
  if (!apiRes.ok) {
    throw new APIError(apiRes.status);
  }

  const apiResData = await apiRes.json();
  console.info('response', apiResData);
  return apiResData as Memo;
}

export async function add(formData: FormData): Promise<ValidationErrors> {
  const [title, description] = [
    formData.get('title'),
    formData.get('description'),
  ];

  // validation
  const errors = validation({title, description});
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // メモ追加
  const apiRes = await fetch(`${endpoint}/`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({title, description}),
  });
  if (!apiRes.ok) {
    throw new APIError(apiRes.status);
  }

  await apiRes.json();
  return errors;
}

export async function edit(formData: FormData): Promise<ValidationErrors> {
  const [id, title, description] = [
    formData.get('id'),
    formData.get('title'),
    formData.get('description'),
  ];

  // validation
  const errors = validation({title, description});
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // メモ更新
  const apiRes = await fetch(`${endpoint}/${id}`, {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({title, description}),
  });
  if (!apiRes.ok) {
    throw new APIError(apiRes.status);
  }

  return errors;
}

export async function deleteMemo(id: number): Promise<void> {
  const apiRes = await fetch(`${endpoint}/${id}`, {
    method: 'delete',
  });

  if (!apiRes.ok) {
    throw new APIError(apiRes.status);
  }
}
