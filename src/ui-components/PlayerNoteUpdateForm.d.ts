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
export declare type PlayerNoteUpdateFormInputValues = {
    player_id?: string;
    date?: string;
    description?: string;
    author_id?: string;
};
export declare type PlayerNoteUpdateFormValidationValues = {
    player_id?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    author_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PlayerNoteUpdateFormOverridesProps = {
    PlayerNoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    player_id?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    author_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlayerNoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: PlayerNoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    playerNote?: any;
    onSubmit?: (fields: PlayerNoteUpdateFormInputValues) => PlayerNoteUpdateFormInputValues;
    onSuccess?: (fields: PlayerNoteUpdateFormInputValues) => void;
    onError?: (fields: PlayerNoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PlayerNoteUpdateFormInputValues) => PlayerNoteUpdateFormInputValues;
    onValidate?: PlayerNoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PlayerNoteUpdateForm(props: PlayerNoteUpdateFormProps): React.ReactElement;
