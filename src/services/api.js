const WORKER_URL = 'https://dark-bush-0db8.alexsimonpl.workers.dev'

export async function askClaude(messages, systemPrompt) {
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, systemPrompt })
  })
  if (!response.ok) throw new Error('Error al conectar con la IA')
  const data = await response.json()
  return data.content[0].text
}

export function buildSystemPrompt(user) {
  return `Eres Alex, entrenador personal certificado y nutricionista deportivo con 15 años de experiencia.
Trabajas exclusivamente con ${user.name}, de ${user.age} años, ${user.weight}kg, ${user.height}cm.
Su objetivo principal es: ${user.goal}. Nivel: ${user.level}.
${user.restrictions ? `Restricciones: ${user.restrictions}` : ''}
Responde siempre en español, de forma motivadora, concisa y profesional.
Nunca des consejos médicos que requieran diagnóstico profesional.`
}