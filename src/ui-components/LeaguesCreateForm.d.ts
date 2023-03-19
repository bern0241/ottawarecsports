/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LeaguesCreateFormInputValues = {
    name?: string;
    sport?: string;
    date_founded?: number;
    gender?: string;
    cost_per_individual?: number;
    cost_per_team?: number;
    coordinator?: string[];
};
export declare type LeaguesCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    sport?: ValidationFunction<string>;
    date_founded?: ValidationFunction<number>;
    gender?: ValidationFunction<string>;
    cost_per_individual?: ValidationFunction<number>;
    cost_per_team?: ValidationFunction<number>;
    coordinator?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LeaguesCreateFormOverridesProps = {
    LeaguesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    date_founded?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    cost_per_individual?: PrimitiveOverrideProps<TextFieldProps>;
    cost_per_team?: PrimitiveOverrideProps<TextFieldProps>;
    coordinator?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LeaguesCreateFormProps = React.PropsWithChildren<{
    overrides?: LeaguesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LeaguesCreateFormInputValues) => LeaguesCreateFormInputValues;
    onSuccess?: (fields: LeaguesCreateFormInputValues) => void;
    onError?: (fields: LeaguesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LeaguesCreateFormInputValues) => LeaguesCreateFormInputValues;
    onValidate?: LeaguesCreateFormValidationValues;
} & React.CSSProperties>;
export default function LeaguesCreateForm(props: LeaguesCreateFormProps): React.ReactElement;
