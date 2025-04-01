export interface UseCase<Tnput,TExecutionResult, TState> {

    apply(currentState: TState,result: TExecutionResult): TState;
    execute(input: Tnput): Promise<TExecutionResult>;

}