import type { UploadedFileRef } from "./files.types";

export function describeFilesFeature() {
  return "File ingestion for documents, images, code, and structured data.";
}

export function createUploadedFileRef(name: string, mimeType: string): UploadedFileRef {
  return {
    name,
    mimeType,
  };
}