import { db } from '../../db';
import { solutions } from '../../db/schema';
import { desc } from 'drizzle-orm';

export default async (req: Request) => {
  const method = req.method;

  if (method === 'GET') {
    try {
      // Fetch all solutions ordered by newest first
      const allSolutions = await db.select().from(solutions).orderBy(desc(solutions.data_submissao));
      
      return new Response(JSON.stringify(allSolutions), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (error) {
      console.error('Error fetching solutions:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch solutions' }), {
        status: 500,
      });
    }
  }

  if (method === 'POST') {
    try {
      const body = await req.json();
      
      // Basic validation
      if (!body.nome_da_solucao || !body.turma) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
        });
      }

      // Insert into DB
      const result = await db.insert(solutions).values({
        nome_da_solucao: body.nome_da_solucao,
        turma: body.turma,
        participantes: body.participantes,
        cenarios_relacionados: body.cenarios_relacionados,
        descricao_refinada: body.descricao_refinada,
        imagem: body.imagem,
        data_submissao: new Date() // Ensure server-side timestamp
      }).returning();

      return new Response(JSON.stringify(result[0]), {
        headers: { 'Content-Type': 'application/json' },
        status: 201,
      });
    } catch (error) {
      console.error('Error saving solution:', error);
      return new Response(JSON.stringify({ error: 'Failed to save solution' }), {
        status: 500,
      });
    }
  }

  return new Response('Method Not Allowed', { status: 405 });
};