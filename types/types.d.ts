export  type InputValidationElement =
| HTMLInputElement
| HTMLSelectElement
| HTMLTextAreaElement;

export type ReviewItemContent = {
    title: string,
    value: string
}
//TODO: refactor (use StringMap or NumberMap instead)
export type ReviewContent = Array<Array<ReviewItemContent>>;
export type StringMap<T> = {[key:string]: T};
