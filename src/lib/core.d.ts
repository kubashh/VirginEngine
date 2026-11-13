import type { BuildOptions, BuildOutput } from "../../../core/build/build";

export declare const virginEngineVersion: string;

export { BuildOptions };

export declare function build(options: BuildOptions): Promise<string>;
