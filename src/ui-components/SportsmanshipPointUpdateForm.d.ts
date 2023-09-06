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
export declare type SportsmanshipPointUpdateFormInputValues = {
    points?: number;
};
export declare type SportsmanshipPointUpdateFormValidationValues = {
    points?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SportsmanshipPointUpdateFormOverridesProps = {
    SportsmanshipPointUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    points?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SportsmanshipPointUpdateFormProps = React.PropsWithChildren<{
    overrides?: SportsmanshipPointUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sportsmanshipPoint?: any;
    onSubmit?: (fields: SportsmanshipPointUpdateFormInputValues) => SportsmanshipPointUpdateFormInputValues;
    onSuccess?: (fields: SportsmanshipPointUpdateFormInputValues) => void;
    onError?: (fields: SportsmanshipPointUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SportsmanshipPointUpdateFormInputValues) => SportsmanshipPointUpdateFormInputValues;
    onValidate?: SportsmanshipPointUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SportsmanshipPointUpdateForm(props: SportsmanshipPointUpdateFormProps): React.ReactElement;
