import type { BuildOptions, BuildOutput } from "../../core/build/build";

export declare const virginEngineVersion: string;

export declare function build(options: BuildOptions): Promise<BuildOutput>;
