import { createFeatureModule } from "../../lib/module";
import { describeFilesFeature } from "./files.service";

export const filesModule = createFeatureModule({
  key: "files",
  title: "Files",
  description: describeFilesFeature(),
  routes: [
    {
      method: "POST",
      path: "/files",
      summary: "Upload and index files",
    },
  ],
});

export type { UploadedFileRef } from "./files.types";
export { createUploadedFileRef, describeFilesFeature } from "./files.service";