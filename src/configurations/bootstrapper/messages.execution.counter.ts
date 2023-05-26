class MessagesExecutionCounterClass {
    private messageCounter = 0;

    public messageReceived(): void {
        this.messageCounter++;
    }

    public messageRequested(): void {
        this.messageCounter++;
    }

    public messageProcessed(): void {
        this.messageCounter--;
    }

    public isFullyProcessed(): boolean {
        return this.messageCounter === 0;
    }
}

export const MessagesExecutionCounter = new MessagesExecutionCounterClass();
