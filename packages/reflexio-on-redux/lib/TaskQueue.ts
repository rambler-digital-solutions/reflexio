



export class TaskQueue {

    private currentTask: string;
    
    private taskQueue: Array<string>

    public setCurrentTask(task: string) {
        this.currentTask = task;
    }
    public getCurrentTask(): string {
        return this.currentTask;
    }

    public pushTaskToQueue(task: string) {
        this.taskQueue.push(task);
    }

    public popTask(): string | null {
        if(this.taskQueue.length > 0) {
            return this.taskQueue.shift() as string
        }
        else {
            return null
        }
    }
}
