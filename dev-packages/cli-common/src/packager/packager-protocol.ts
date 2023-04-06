export interface InstallOptions {
    ignoreScripts?: boolean;
    frozenLockfile?: boolean;
    nonInteractive?: boolean;
    networkConcurrency?: string;
    stdio?: string;
    ignoreOptional?: boolean;
    ignoreWorkspace?: boolean;
    noLockfile?: boolean;
    filter?: string;
}

export interface PruneOptions {
    ignoreScripts?: boolean;
    frozenLockfile?: boolean;
    nonInteractive?: boolean;
    stdio?: string;
    filter?: string;
}

export interface AddOptions {
    exact?: boolean;
    global?: boolean;
    stdio?: string;
    dev?: boolean;
}

export interface Packager {
    readonly lockfileName: string;
    readonly copyPackageSectionNames: string[];
    readonly mustCopyModules: boolean;

    getProdDependencies(depth: number, cwd?: string): Promise<any>;

    readLockfile(lockfilePath: string): Promise<any>;

    writeLockfile(lockfilePath: string, content: string): Promise<void>;

    rebaseLockfile(pathToPackageRoot: string, lockfile: any): void;

    install(opts?: InstallOptions, cwd?: string): Promise<any>;

    add(packages: string[], opts?: AddOptions, cwd?: string): Promise<any>;

    prune(opts?: PruneOptions, cwd?: string): Promise<any> | void;

    runScripts(scriptNames: string[], cwd?: string): Promise<any[]>;
}
