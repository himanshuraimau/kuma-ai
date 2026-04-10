"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  MessageAction,
  MessageActions,
  Message,
  MessageToolbar,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CHAT_API_BASE_URL,
  createChatThread,
  deleteChatMessage,
  getChatThreadMessages,
  listChatThreads,
  regenerateChatMessage,
  updateChatMessage,
} from "@/lib/api/chat";
import { uploadFiles } from "@/lib/uploadthing";
import type { ChatMessagePart, ChatThreadDto } from "@/types/chat";
import { toUiMessages } from "@/types/chat";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import {
  CheckIcon,
  MessageSquareIcon,
  MessageSquarePlusIcon,
  PaperclipIcon,
  PencilIcon,
  SearchIcon,
  SparklesIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ChatWorkspaceProps {
  userEmail: string;
}

function getMessageText(message: UIMessage | undefined): string {
  if (!message) return "";

  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n")
    .trim();
}

function getMessageFiles(message: UIMessage | undefined): FileUIPart[] {
  if (!message) {
    return [];
  }

  return message.parts.filter((part) => part.type === "file");
}

function toPersistableParts(message: UIMessage | undefined): ChatMessagePart[] {
  if (!message) {
    return [];
  }

  return message.parts
    .map((part) => {
      if (part.type === "text") {
        const text = part.text.trim();
        return text ? ({ type: "text", text } as const) : null;
      }

      if (part.type === "file") {
        const url = part.url.trim();
        if (!url) {
          return null;
        }

        return {
          type: "file" as const,
          mediaType: part.mediaType,
          filename: part.filename,
          url,
        };
      }

      return null;
    })
    .filter((part): part is NonNullable<typeof part> => part !== null);
}

async function toFile(filePart: FileUIPart, index: number): Promise<File> {
  const response = await fetch(filePart.url);
  if (!response.ok) {
    throw new Error("Failed to process attachment before upload.");
  }

  const blob = await response.blob();
  const filename = filePart.filename?.trim() || `attachment-${index + 1}`;

  return new File([blob], filename, {
    type: filePart.mediaType || blob.type || "application/octet-stream",
  });
}

function normalizeTitle(title: string): string {
  const trimmed = title.trim();
  return trimmed ? trimmed : "New chat";
}

function ComposerAttachments() {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap gap-2">
      {attachments.files.map((file) => (
        <div
          key={file.id}
          className="flex max-w-full items-center gap-2 rounded-full border border-border/80 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-200"
        >
          <PaperclipIcon className="size-3.5 text-orange-400" />
          <span className="max-w-52 truncate">{file.filename || "Attachment"}</span>
          <button
            type="button"
            onClick={() => attachments.remove(file.id)}
            className="inline-flex size-5 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
            aria-label={`Remove ${file.filename || "attachment"}`}
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function ChatWorkspace({ userEmail }: ChatWorkspaceProps) {
  const [threads, setThreads] = useState<ChatThreadDto[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [threadQuery, setThreadQuery] = useState("");
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
  const [activeActionMessageId, setActiveActionMessageId] = useState<string | null>(
    null,
  );
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingMessageText, setEditingMessageText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const activeThreadRef = useRef<string | null>(null);

  const loadThreads = useCallback(async () => {
    setIsLoadingThreads(true);
    try {
      const data = await listChatThreads();
      setThreads(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load chat threads.",
      );
    } finally {
      setIsLoadingThreads(false);
    }
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${CHAT_API_BASE_URL}/api/chat/stream`,
        credentials: "include",
        prepareSendMessagesRequest: ({ messages, trigger, messageId, ...request }) => {
          const lastMessage = messages[messages.length - 1];

          return {
            ...request,
            body: {
              ...(request.body ?? {}),
              threadId: activeThreadRef.current ?? undefined,
              trigger,
              messageId,
              message: getMessageText(lastMessage),
              parts: toPersistableParts(lastMessage),
            },
          };
        },
      }),
    [],
  );

  const { messages, sendMessage, setMessages, status, stop } = useChat({
    transport,
    onError: (chatError) => {
      setError(chatError.message || "Streaming failed.");
    },
    onFinish: async () => {
      try {
        const latest = await listChatThreads();
        setThreads(latest);
      } catch {
        // Ignore background refresh failures.
      }
    },
  });

  const loadThreadMessages = useCallback(
    async (threadId: string) => {
      setIsLoadingMessages(true);
      setError(null);

      try {
        const { messages: threadMessages } = await getChatThreadMessages(threadId);
        setMessages(toUiMessages(threadMessages));
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load thread messages.",
        );
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [setMessages],
  );

  useEffect(() => {
    void loadThreads();
  }, [loadThreads]);

  const handleSelectThread = useCallback(
    async (threadId: string) => {
      setActiveThreadId(threadId);
      activeThreadRef.current = threadId;
      await loadThreadMessages(threadId);
    },
    [loadThreadMessages],
  );

  useEffect(() => {
    if (isLoadingThreads || activeThreadId || threads.length === 0) {
      return;
    }

    void handleSelectThread(threads[0].id);
  }, [isLoadingThreads, activeThreadId, threads, handleSelectThread]);

  const handleCreateThread = useCallback(async () => {
    setError(null);

    try {
      const thread = await createChatThread();
      setThreads((prev) => [thread, ...prev]);
      setActiveThreadId(thread.id);
      activeThreadRef.current = thread.id;
      setMessages([]);
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Unable to create a new thread.",
      );
    }
  }, [setMessages]);

  const ensureThreadForMessage = useCallback(
    async (message: string) => {
      if (activeThreadRef.current) {
        return activeThreadRef.current;
      }

      const thread = await createChatThread(normalizeTitle(message.slice(0, 80)));
      setThreads((prev) => [thread, ...prev]);
      setActiveThreadId(thread.id);
      activeThreadRef.current = thread.id;
      return thread.id;
    },
    [],
  );

  const filteredThreads = useMemo(() => {
    const query = threadQuery.trim().toLowerCase();
    if (!query) {
      return threads;
    }

    return threads.filter((thread) =>
      normalizeTitle(thread.title).toLowerCase().includes(query),
    );
  }, [threadQuery, threads]);

  const handleSaveEdit = useCallback(
    async (message: UIMessage) => {
      if (!activeThreadId) {
        return;
      }

      const nextText = editingMessageText.trim();
      const fileParts = getMessageFiles(message).map((part) => ({
        type: "file" as const,
        mediaType: part.mediaType,
        filename: part.filename,
        url: part.url,
      }));

      const nextParts: ChatMessagePart[] = [
        ...(nextText ? [{ type: "text", text: nextText } as const] : []),
        ...fileParts,
      ];

      if (nextParts.length === 0) {
        setError("Message text or files are required.");
        return;
      }

      setActiveActionMessageId(message.id);
      setError(null);

      try {
        const updatedMessages = await updateChatMessage(activeThreadId, message.id, {
          message: nextText || undefined,
          parts: nextParts,
        });

        setMessages(toUiMessages(updatedMessages));
        setEditingMessageId(null);
        setEditingMessageText("");
      } catch (actionError) {
        setError(
          actionError instanceof Error ? actionError.message : "Failed to edit message.",
        );
      } finally {
        setActiveActionMessageId(null);
      }
    },
    [activeThreadId, editingMessageText, setMessages],
  );

  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      if (!activeThreadId) {
        return;
      }

      setActiveActionMessageId(messageId);
      setError(null);

      try {
        const updatedMessages = await deleteChatMessage(activeThreadId, messageId);
        setMessages(toUiMessages(updatedMessages));

        if (editingMessageId === messageId) {
          setEditingMessageId(null);
          setEditingMessageText("");
        }
      } catch (actionError) {
        setError(
          actionError instanceof Error ? actionError.message : "Failed to delete message.",
        );
      } finally {
        setActiveActionMessageId(null);
      }
    },
    [activeThreadId, editingMessageId, setMessages],
  );

  const handleRegenerateMessage = useCallback(
    async (messageId?: string) => {
      if (!activeThreadId) {
        return;
      }

      setActiveActionMessageId(messageId ?? "regenerate-last");
      setError(null);

      try {
        const updatedMessages = await regenerateChatMessage(activeThreadId, messageId);
        setMessages(toUiMessages(updatedMessages));
      } catch (actionError) {
        setError(
          actionError instanceof Error
            ? actionError.message
            : "Failed to regenerate response.",
        );
      } finally {
        setActiveActionMessageId(null);
      }
    },
    [activeThreadId, setMessages],
  );

  const handlePromptSubmit = useCallback(
    async ({ text, files }: { text: string; files: FileUIPart[] }) => {
      const content = text.trim();

      if (!content && files.length === 0) {
        return;
      }

      setError(null);

      try {
        await ensureThreadForMessage(content || (files[0]?.filename ?? "New chat"));

        let uploadedFiles: FileUIPart[] = [];
        if (files.length > 0) {
          setIsUploadingAttachments(true);
          const uploadCandidates = await Promise.all(
            files.map((filePart, index) => toFile(filePart, index)),
          );
          const uploaded = await uploadFiles("chatAttachment", {
            files: uploadCandidates,
          });

          uploadedFiles = uploaded.map((file, index) => ({
            type: "file",
            mediaType:
              file.type || uploadCandidates[index]?.type || "application/octet-stream",
            filename: file.name || uploadCandidates[index]?.name,
            url: file.ufsUrl,
          }));
        }

        if (content && uploadedFiles.length > 0) {
          await sendMessage({ text: content, files: uploadedFiles });
          return;
        }

        if (uploadedFiles.length > 0) {
          await sendMessage({ files: uploadedFiles });
          return;
        }

        await sendMessage({ text: content });
      } catch (submitError) {
        setError(
          submitError instanceof Error
            ? submitError.message
            : "Failed to send message.",
        );
      } finally {
        setIsUploadingAttachments(false);
      }
    },
    [ensureThreadForMessage, sendMessage],
  );

  const isBusy = status === "submitted" || status === "streaming" || isUploadingAttachments;

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="gap-1">
          <div className="flex items-center gap-2 px-1 py-1">
            <SidebarTrigger className="size-8" />
            <p className="truncate text-sm font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              Kuma
            </p>
          </div>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleCreateThread}
                tooltip="New Chat"
                isActive={false}
              >
                <MessageSquarePlusIcon className="size-4" />
                <span>New Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Threads</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="mb-2 px-1 group-data-[collapsible=icon]:hidden">
                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-500" />
                  <input
                    value={threadQuery}
                    onChange={(event) => setThreadQuery(event.target.value)}
                    placeholder="Search threads"
                    className="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-950/60 pl-8 pr-3 text-xs text-zinc-200 outline-none transition placeholder:text-zinc-500 focus:border-orange-500/70"
                  />
                </div>
              </div>

              <SidebarMenu>
                {isLoadingThreads ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled>Loading threads...</SidebarMenuButton>
                  </SidebarMenuItem>
                ) : filteredThreads.length === 0 ? (
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled>
                      <MessageSquareIcon className="size-4" />
                      <span>{threadQuery ? "No matching threads" : "No threads yet"}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  filteredThreads.map((thread) => (
                    <SidebarMenuItem key={thread.id}>
                      <SidebarMenuButton
                        isActive={activeThreadId === thread.id}
                        onClick={() => void handleSelectThread(thread.id)}
                        tooltip={normalizeTitle(thread.title)}
                      >
                        <MessageSquareIcon className="size-4" />
                        <span>{normalizeTitle(thread.title)}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <p className="px-2 text-xs text-muted-foreground">{userEmail}</p>
          <SignOutButton className="w-full" />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <SidebarInset className="h-dvh min-h-0">
        <div className="flex items-center justify-between px-2 pt-2 md:hidden">
          <SidebarTrigger />
          <Button
            onClick={handleCreateThread}
            size="icon-sm"
            variant="ghost"
            aria-label="New Chat"
          >
            <MessageSquarePlusIcon className="size-4" />
          </Button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <Conversation>
            <ConversationContent className="mx-auto w-full max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
              {messages.length === 0 ? (
                <ConversationEmptyState
                  title="Start chatting"
                  description="Ask anything to begin your first conversation."
                />
              ) : (
                messages.map((message, index) => {
                  const text = getMessageText(message);
                  const files = getMessageFiles(message);
                  const isEditing = editingMessageId === message.id;

                  if (!text && files.length === 0) {
                    return null;
                  }

                  return (
                    <Message from={message.role} key={message.id ?? index}>
                      <MessageContent>
                        {isEditing ? (
                          <div className="space-y-2">
                            <textarea
                              value={editingMessageText}
                              onChange={(event) => setEditingMessageText(event.target.value)}
                              className="min-h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/70"
                            />
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => void handleSaveEdit(message)}
                                disabled={activeActionMessageId === message.id}
                              >
                                <CheckIcon className="mr-1 size-4" />
                                Save
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingMessageId(null);
                                  setEditingMessageText("");
                                }}
                              >
                                <XIcon className="mr-1 size-4" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : message.role === "assistant" ? (
                          text ? (
                            <MessageResponse
                              isAnimating={
                                status === "streaming" && index === messages.length - 1
                              }
                            >
                              {text}
                            </MessageResponse>
                          ) : null
                        ) : (
                          text ? <p className="whitespace-pre-wrap">{text}</p> : null
                        )}

                        {files.length > 0 ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {files.map((file, fileIndex) => (
                              <a
                                key={`${message.id}-file-${fileIndex}`}
                                href={file.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-orange-500/60 hover:text-orange-200"
                              >
                                <PaperclipIcon className="size-3.5" />
                                <span className="max-w-56 truncate">
                                  {file.filename || "Attachment"}
                                </span>
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </MessageContent>

                      {!isEditing ? (
                        <MessageToolbar>
                          <MessageActions>
                            {message.role === "user" ? (
                              <>
                                <MessageAction
                                  tooltip="Edit message"
                                  onClick={() => {
                                    setEditingMessageId(message.id);
                                    setEditingMessageText(text);
                                  }}
                                >
                                  <PencilIcon className="size-4" />
                                </MessageAction>
                                <MessageAction
                                  tooltip="Delete message"
                                  disabled={activeActionMessageId === message.id}
                                  onClick={() => void handleDeleteMessage(message.id)}
                                >
                                  <Trash2Icon className="size-4" />
                                </MessageAction>
                              </>
                            ) : (
                              <>
                                <MessageAction
                                  tooltip="Regenerate response"
                                  disabled={activeActionMessageId === message.id}
                                  onClick={() => void handleRegenerateMessage(message.id)}
                                >
                                  <SparklesIcon className="size-4" />
                                </MessageAction>
                                <MessageAction
                                  tooltip="Delete message"
                                  disabled={activeActionMessageId === message.id}
                                  onClick={() => void handleDeleteMessage(message.id)}
                                >
                                  <Trash2Icon className="size-4" />
                                </MessageAction>
                              </>
                            )}
                          </MessageActions>
                        </MessageToolbar>
                      ) : null}
                    </Message>
                  );
                })
              )}
            </ConversationContent>

            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border bg-background/95 px-3 py-3 backdrop-blur sm:px-4 sm:py-4">
            <div className="mx-auto w-full max-w-3xl space-y-2">
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              {isLoadingMessages ? (
                <p className="text-sm text-muted-foreground">Loading messages...</p>
              ) : null}
              {isUploadingAttachments ? (
                <p className="text-sm text-orange-300">Uploading attachments...</p>
              ) : null}
              <PromptInput onSubmit={handlePromptSubmit}>
                <PromptInputHeader>
                  <ComposerAttachments />
                </PromptInputHeader>
                <PromptInputBody>
                  <PromptInputTextarea
                    placeholder="Message Kuma..."
                    disabled={isBusy}
                  />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    <PromptInputActionMenu>
                      <PromptInputActionMenuTrigger
                        tooltip="Add files"
                        disabled={isBusy}
                      />
                      <PromptInputActionMenuContent>
                        <PromptInputActionAddAttachments />
                        <PromptInputActionAddScreenshot />
                      </PromptInputActionMenuContent>
                    </PromptInputActionMenu>
                  </PromptInputTools>
                  <PromptInputSubmit
                    status={isUploadingAttachments ? "submitted" : status}
                    onStop={stop}
                    disabled={isBusy && status !== "streaming"}
                  />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
