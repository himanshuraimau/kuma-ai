import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "@/lib/api/session";

const f = createUploadthing();

export const uploadRouter = {
  chatAttachment: f({
    image: {
      maxFileCount: 6,
      maxFileSize: "8MB",
    },
    pdf: {
      maxFileCount: 4,
      maxFileSize: "16MB",
    },
    text: {
      maxFileCount: 4,
      maxFileSize: "2MB",
    },
  })
    .middleware(async () => {
      const session = await getServerSession();

      if (!session) {
        throw new Error("Unauthorized");
      }

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        key: file.key,
        mediaType: file.type,
        name: file.name,
        size: file.size,
        uploadedBy: metadata.userId,
        ufsUrl: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
