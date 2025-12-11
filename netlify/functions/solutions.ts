import { db } from '../../db';
import { solutions } from '../../db/schema';
import { desc, eq } from 'drizzle-orm';

export default async (req: Request) => {
  const method = req.method;

  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  if (method === 'GET') {
    try {
      const allSolutions = await db.select().from(solutions).orderBy(desc(solutions.data_submissao));
      return new Response(JSON.stringify(allSolutions), {
        status: 200,
        headers
      });
    } catch (error) {
      console.error('Error fetching solutions:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch solutions', details: String(error) }), {
        status: 500,
        headers
      });
    }
  }

  if (method === 'POST') {
    try {
      let body;
      try {
        body = await req.json();
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
      }
      
      if (!body.nome_da_solucao || !body.turma) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers
        });
      }

      const result = await db.insert(solutions).values({
        nome_da_solucao: body.nome_da_solucao,
        turma: body.turma,
        participantes: body.participantes,
        cenarios_relacionados: body.cenarios_relacionados,
        descricao_refinada: body.descricao_refinada,
        imagem: body.imagem,
        link_solucao: body.link_solucao,
        data_submissao: new Date()
      }).returning();

      return new Response(JSON.stringify(result[0]), {
        status: 201,
        headers
      });
    } catch (error) {
      console.error('Error saving solution:', error);
      return new Response(JSON.stringify({ error: 'Failed to save solution', details: String(error) }), {
        status: 500,
        headers
      });
    }
  }

  if (method === 'PUT') {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'Solution ID is required' }), {
          status: 400,
          headers
        });
      }

      let body;
      try {
        body = await req.json();
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
      }

      const result = await db.update(solutions)
        .set({
          nome_da_solucao: body.nome_da_solucao,
          participantes: body.participantes,
          cenarios_relacionados: body.cenarios_relacionados,
          descricao_refinada: body.descricao_refinada,
          imagem: body.imagem,
          link_solucao: body.link_solucao,
        })
        .where(eq(solutions.id, id))
        .returning();

      if (result.length === 0) {
        return new Response(JSON.stringify({ error: 'Solution not found' }), {
          status: 404,
          headers
        });
      }

      return new Response(JSON.stringify(result[0]), {
        status: 200,
        headers
      });
    } catch (error) {
      console.error('Error updating solution:', error);
      return new Response(JSON.stringify({ error: 'Failed to update solution', details: String(error) }), {
        status: 500,
        headers
      });
    }
  }

  if (method === 'DELETE') {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(JSON.stringify({ error: 'Solution ID is required' }), {
          status: 400,
          headers
        });
      }

      const result = await db.delete(solutions)
        .where(eq(solutions.id, id))
        .returning();

      if (result.length === 0) {
        return new Response(JSON.stringify({ error: 'Solution not found' }), {
          status: 404,
          headers
        });
      }

      return new Response(JSON.stringify({ message: 'Solution deleted successfully' }), {
        status: 200,
        headers
      });
    } catch (error) {
      console.error('Error deleting solution:', error);
      return new Response(JSON.stringify({ error: 'Failed to delete solution', details: String(error) }), {
        status: 500,
        headers
      });
    }
  }

  return new Response('Method Not Allowed', { status: 405, headers });
};