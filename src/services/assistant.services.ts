// assistantService.ts
import OpenAI from "openai";

export class AssistantService {
  private client: OpenAI;
  private assistantId: string;

  // Instrucciones por si es Academia, Curso, Leccion, Material
  private systemInstructionsAcademia: string;
  private systemInstructionsCurso: string;
  private systemInstructionsLeccion: string;
  private systemInstructionsMaterial: string;

  constructor(apiKey: string, assistantId: string, systemInstructionsAcademia?: string, systemInstructionsCurso?: string, systemInstructionsLeccion?: string, systemInstructionsMaterial?: string) {
    this.client = new OpenAI({ apiKey });
    this.assistantId = assistantId;
    this.systemInstructionsAcademia = systemInstructionsAcademia || "";
    this.systemInstructionsCurso = systemInstructionsCurso || "";
    this.systemInstructionsLeccion = systemInstructionsLeccion || "";
    this.systemInstructionsMaterial = systemInstructionsMaterial || "";
  }

  // ... (los métodos createThread, validateThread, getMessages y cancelRun no cambian) ...

  async createThread(): Promise<string> {
    const thread = await this.client.beta.threads.create();
    return thread.id;
  }

  async validateThread(threadId: string): Promise<boolean> {
    try {
      await this.client.beta.threads.retrieve(threadId);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Envía un mensaje y recibe la respuesta del asistente vía streaming.
   * @param threadId - El ID del thread actual o null para crear uno nuevo.
   * @param message - El mensaje del usuario.
   * @param onToken - Callback que se ejecuta con cada fragmento de texto generado.
   * @param onRun - Callback opcional que se ejecuta cuando el 'run' se crea, proveyendo el runId.
   * @returns Un objeto con el ID del thread y la respuesta completa al finalizar.
   */
  async streamResponse(
    threadId: string | null,
    message: string,
    onToken: (token: string) => void,
    onRun?: (runId: string) => void,
    sizeResponse: number = 20
  ): Promise<{ threadId: string; fullResponse: string }> {

    let currentThreadId = threadId;

    if (!currentThreadId || !(await this.validateThread(currentThreadId))) {
      currentThreadId = await this.createThread();
    }

    if (this.systemInstructionsAcademia) {
      await this.client.beta.threads.messages.create(currentThreadId, {
        role: "assistant",
        content: `Contexto de Academia: ${this.systemInstructionsAcademia}`,
      });
    }

    if (this.systemInstructionsCurso) {
      await this.client.beta.threads.messages.create(currentThreadId, {
        role: "assistant",
        content: `Contexto de Curso: ${this.systemInstructionsCurso}`,
      });
    }

    if (this.systemInstructionsLeccion) {
      await this.client.beta.threads.messages.create(currentThreadId, {
        role: "assistant",
        content: `Contexto de Lección: ${this.systemInstructionsLeccion}`,
      });
    }

    if (this.systemInstructionsMaterial) {
      await this.client.beta.threads.messages.create(currentThreadId, {
        role: "assistant",
        content: `Contexto del Material: ${this.systemInstructionsMaterial}`,
      });
    }

    await this.client.beta.threads.messages.create(currentThreadId, {
      role: "user",
      content: message,
    });

    const stream = this.client.beta.threads.runs.stream(currentThreadId, {
      assistant_id: this.assistantId,
    });

    return new Promise((resolve, reject) => {
      let fullResponse = "";

      stream.on('event', (event) => {
        // Evento cuando se crea el 'run': útil para cancelaciones
        if (event.event === 'thread.run.created' && onRun) {
          onRun(event.data.id);
        }

        // Evento que contiene el texto generado (delta)
        if (event.event === 'thread.message.delta' && event.data.delta.content) {
          for (const content of event.data.delta.content) {
            if (content.type === 'text' && content.text) {
              const token = content.text.value;
              fullResponse += token;
              // Llamar al callback con únicamente el texto
              onToken(token as any);
            }
          }
        }
      });

      stream.on('end', () => {
        resolve({ threadId: currentThreadId!, fullResponse });
      });

      stream.on('error', (error) => {
        console.error("Error en el stream:", error);
        reject(error);
      });

      // Manejo de tool_calls para evitar que el asistente se quede 'colgado'
      stream.on('requires_action' as any, async (event: any) => {
        await this.client.beta.threads.runs.submitToolOutputs(
          event.data.thread_id,
          event.data.id,
          { tool_outputs: [] } as any
        );
      });
    });
  }

  async getMessages(threadId: string, limit: number = 20): Promise<OpenAI.Beta.Threads.Messages.Message[]> {
    const messages = await this.client.beta.threads.messages.list(threadId, {
      order: "asc",
      limit,
    });
    return messages.data;
  }

  async cancelRun(threadId: string, runId: string): Promise<void> {
    try {
      await this.client.beta.threads.runs.cancel(threadId, runId as any);
    } catch (error) {
    }
  }
}