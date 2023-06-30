



export class TaskQueue {

    private currentTask: {type: string, payload: any};
    
    private taskQueue: Array<string>

    public setCurrentTask(action: {type: string, payload: any}) {
        this.currentTask = action;
    }
    public getCurrentTask(): {type: string, payload: any} {
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
