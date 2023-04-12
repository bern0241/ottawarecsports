/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type PlayerNoteCreateFormInputValues = {
    player_id?: string;
    date?: string;
    description?: string;
    author_id?: string;
};
export declare type PlayerNoteCreateFormValidationValues = {
    player_id?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    author_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlayerNoteCreateFormOverridesProps = {
    PlayerNoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    player_id?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    author_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlayerNoteCreateFormProps = React.PropsWithChildren<{
    overrides?: PlayerNoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PlayerNoteCreateFormInputValues) => PlayerNoteCreateFormInputValues;
    onSuccess?: (fields: PlayerNoteCreateFormInputValues) => void;
    onError?: (fields: PlayerNoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlayerNoteCreateFormInputValues) => PlayerNoteCreateFormInputValues;
    onValidate?: PlayerNoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function PlayerNoteCreateForm(props: PlayerNoteCreateFormProps): React.ReactElement;
