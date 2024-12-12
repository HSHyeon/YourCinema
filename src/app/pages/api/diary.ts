import { NextApiRequest, NextApiResponse } from 'next';

type Diary = {
  id: number;
  content: string;
};


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST: 일기 추가
  if (req.method === 'POST') {
    const { content } = req.body;
    const newDiary: Diary = { id: Date.now(), content };
    diaries.push(newDiary);
    return res.status(200).json(newDiary);
  }

  // GET: 일기 목록 가져오기
  if (req.method === 'GET') {
    return res.status(200).json(diaries);
  }

  // Method Not Allowed
  return res.status(405).end();
}
