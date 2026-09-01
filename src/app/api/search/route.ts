import { searchPrompts } from '@/lib/prompts';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  
  if (!query || query.length < 2) return Response.json([]);
  
  const results = await searchPrompts(query);
  return Response.json(results);
}
