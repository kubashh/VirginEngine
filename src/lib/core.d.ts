export declare function build(options: {
  author: string;
  description: string;
  gameName: string;
  performanceInfo: boolean;
  pathToMainScene: string;
  fullScreen: boolean;
  production?: boolean;
  hydrate?: string;
  separateJs?: boolean;
  log?: boolean;
  files: TObj<any>;
}): Promise<{ "index.html"?: string; "script.js"?: string }>;
