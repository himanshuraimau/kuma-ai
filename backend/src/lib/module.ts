export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ModuleRoute {
  method: HttpMethod;
  path: string;
  summary: string;
}

export interface FeatureModule {
  key: string;
  title: string;
  description: string;
  routes: ModuleRoute[];
}

export function createFeatureModule(module: FeatureModule) {
  return module;
}