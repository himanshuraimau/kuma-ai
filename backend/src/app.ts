import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { env } from "./config/env";
import { auth } from "./lib/auth";
import { requireAuth } from "./lib/require-auth";
import { featureModules } from "./modules";
import {
  createThread,
  deleteMessage,
  editMessage,
  listThreadMessages,
  listThreads,
  regenerateMessage,
  streamAssistantResponse,
} from "./modules/chat";

export function createApp() {
  const app = express();
  const toSingleParam = (value: string | string[] | undefined): string | undefined =>
    Array.isArray(value) ? value[0] : value;

  app.use(
    cors({
      origin: [env.frontendUrl],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  );

  app.all("/api/auth/{*any}", toNodeHandler(auth));

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "kuma-backend" });
  });

  app.get("/", (_req, res) => {
    res.json({
      app: "Kuma AI Backend",
      modules: featureModules,
    });
  });

  app.get("/api/me", requireAuth, (_req, res) => {
    res.json({ user: res.locals.session.user });
  });

  const registerChatRoutes = (prefix: string) => {
    app.get(`${prefix}/threads`, requireAuth, async (_req, res) => {
      const userId = res.locals.session.user.id as string;
      const threads = await listThreads(userId);
      res.json({ threads });
    });

    app.post(`${prefix}/threads`, requireAuth, async (req, res) => {
      const userId = res.locals.session.user.id as string;
      const title = typeof req.body?.title === "string" ? req.body.title : undefined;

      const thread = await createThread(userId, title);
      res.status(201).json({ thread });
    });

    app.get(`${prefix}/threads/:threadId/messages`, requireAuth, async (req, res) => {
      const userId = res.locals.session.user.id as string;
      const threadId = toSingleParam(req.params.threadId);

      if (!threadId) {
        res.status(400).json({ error: "Thread id is required." });
        return;
      }

      const thread = await listThreadMessages(threadId, userId);

      if (!thread) {
        res.status(404).json({ error: "Thread not found." });
        return;
      }

      res.json({ thread, messages: thread.messages });
    });

    app.post(`${prefix}/stream`, requireAuth, async (req, res) => {
      const userId = res.locals.session.user.id as string;
      const message = typeof req.body?.message === "string" ? req.body.message : undefined;
      const threadId = typeof req.body?.threadId === "string" ? req.body.threadId : undefined;
      const trigger =
        req.body?.trigger === "submit-message" ||
        req.body?.trigger === "regenerate-message"
          ? req.body.trigger
          : undefined;
      const messageId = typeof req.body?.messageId === "string" ? req.body.messageId : undefined;
      const parts = Array.isArray(req.body?.parts) ? req.body.parts : undefined;

      await streamAssistantResponse(
        { message, messageId, parts, threadId, trigger },
        userId,
        res,
      );
    });

    app.patch(`${prefix}/threads/:threadId/messages/:messageId`, requireAuth, async (req, res) => {
      const userId = res.locals.session.user.id as string;
      const threadId = toSingleParam(req.params.threadId);
      const messageId = toSingleParam(req.params.messageId);
      const message = typeof req.body?.message === "string" ? req.body.message : undefined;
      const parts = Array.isArray(req.body?.parts) ? req.body.parts : undefined;

      if (!threadId || !messageId) {
        res.status(400).json({ error: "Thread id and message id are required." });
        return;
      }

      try {
        const messages = await editMessage(
          {
            threadId,
            messageId,
            message,
            parts,
          },
          userId,
        );

        res.json({ messages });
      } catch (error) {
        res.status(400).json({
          error: error instanceof Error ? error.message : "Failed to edit message.",
        });
      }
    });

    app.delete(`${prefix}/threads/:threadId/messages/:messageId`, requireAuth, async (req, res) => {
      const userId = res.locals.session.user.id as string;
      const threadId = toSingleParam(req.params.threadId);
      const messageId = toSingleParam(req.params.messageId);

      if (!threadId || !messageId) {
        res.status(400).json({ error: "Thread id and message id are required." });
        return;
      }

      try {
        const messages = await deleteMessage(
          {
            threadId,
            messageId,
          },
          userId,
        );

        res.json({ messages });
      } catch (error) {
        res.status(400).json({
          error: error instanceof Error ? error.message : "Failed to delete message.",
        });
      }
    });

    app.post(
      `${prefix}/threads/:threadId/messages/:messageId/regenerate`,
      requireAuth,
      async (req, res) => {
        const userId = res.locals.session.user.id as string;
        const threadId = toSingleParam(req.params.threadId);
        const messageId = toSingleParam(req.params.messageId);

        if (!threadId || !messageId) {
          res.status(400).json({ error: "Thread id and message id are required." });
          return;
        }

        try {
          const messages = await regenerateMessage(
            {
              threadId,
              messageId,
            },
            userId,
          );

          res.json({ messages });
        } catch (error) {
          res.status(400).json({
            error:
              error instanceof Error ? error.message : "Failed to regenerate message.",
          });
        }
      },
    );

    app.post(`${prefix}/threads/:threadId/regenerate`, requireAuth, async (req, res) => {
      const userId = res.locals.session.user.id as string;
      const threadId = toSingleParam(req.params.threadId);

      if (!threadId) {
        res.status(400).json({ error: "Thread id is required." });
        return;
      }

      try {
        const messages = await regenerateMessage(
          {
            threadId,
            messageId: typeof req.body?.messageId === "string" ? req.body.messageId : undefined,
          },
          userId,
        );

        res.json({ messages });
      } catch (error) {
        res.status(400).json({
          error: error instanceof Error ? error.message : "Failed to regenerate message.",
        });
      }
    });
  };

  registerChatRoutes("/api/chat");
  registerChatRoutes("/chat");

  return app;
}