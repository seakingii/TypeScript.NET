﻿/// <reference path="System.d.ts" />
declare module System.Threading {
    class CancellationToken {
        public canBeCancelled: boolean;
        public isCancellationRequested: boolean;
        public throwIfCancelltionRequested: boolean;
        static none : CancellationToken;
    }
}
declare module System.Threading.Tasks {
    interface ITask<TResult> extends IDisposable, IEquatable<ITask<TResult>> {
        asyncState: Object;
        creationOptions: TaskCreationOptions;
        exception: Error;
        id: number;
        isCancelled: boolean;
        isCompleted: boolean;
        isFaulted: boolean;
        result: TResult;
        status: TaskStatus;
        runSynchronously(scheduler?: TaskScheduler): void;
        start(scheduler?: TaskScheduler): void;
        wait(): void;
        wait(token: CancellationToken): void;
        wait(milliseconds: number, token: CancellationToken): void;
        wait(time: TimeSpan, token?: CancellationToken): void;
    }
    enum TaskStatus {
        Created = 0,
        WaitingForActivation = 1,
        WaitingToRun = 2,
        Running = 3,
        Blocked = 4,
        WaitingForChildrenToComplete = 5,
        RanToCompletion = 6,
        Canceled = 7,
        Faulted = 8,
    }
    enum TaskCreationOptions {
        None = 0,
        PreferFairness = 1,
        LongRunning = 2,
        AttachedToParent = 4,
        DenyChildAttach = 8,
        HideScheduler = 16,
    }
    enum TaskContinuationOptions {
        None = 0,
        PreferFairness = 1,
        LongRunning = 2,
        AttachedToParent = 4,
        DenyChildAttach = 8,
        HideScheduler = 16,
        LazyCancellation = 32,
        NotOnRanToCompletion = 65536,
        NotOnFaulted = 131072,
        NotOnCanceled = 262144,
        OnlyOnRanToCompletion,
        OnlyOnFaulted,
        OnlyOnCanceled,
        ExecuteSynchronously = 524288,
    }
}
declare module System.Threading.Tasks {
    interface ITaskScheduler {
        id: number;
        maximumConcurrencyLevel: number;
        getScheduledTasks(): Collections.IEnumerable<ITask<any>>;
        queueTask(task: ITask<any>): void;
        tryDequeue(task: ITask<any>): boolean;
        tryExecuteTask(task: ITask<any>): boolean;
        tryExecuteTaskInline(task: ITask<any>): boolean;
    }
    class TaskScheduler {
        static current : ITaskScheduler;
        static default : ITaskScheduler;
        static fromCurrentSynchronizationContext(): ITaskScheduler;
    }
}