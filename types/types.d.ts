export  type InputValidationElement =
| HTMLInputElement
| HTMLSelectElement
| HTMLTextAreaElement;

export type ReviewItemContent = {
    title: string,
    value: string
}

export type ReviewContent = Array<Array<ReviewItemContent>>;
