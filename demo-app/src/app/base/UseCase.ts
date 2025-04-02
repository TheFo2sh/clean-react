export abstract class UseCase<Tnput,TExecutionResult, TState> {


    abstract apply(currentState: TState,result: TExecutionResult): TState;
    abstract execute(input: Tnput): Promise<TExecutionResult>;

}