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
export declare type LeagueCreateFormInputValues = {
    name?: string;
    sport?: string;
    date_founded?: string;
    cost_per_individual?: number;
    cost_per_team?: number;
    coordinators?: string[];
    description?: string;
    number_of_periods?: number;
    time_per_period?: number;
};
export declare type LeagueCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    sport?: ValidationFunction<string>;
    date_founded?: ValidationFunction<string>;
    cost_per_individual?: ValidationFunction<number>;
    cost_per_team?: ValidationFunction<number>;
    coordinators?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    number_of_periods?: ValidationFunction<number>;
    time_per_period?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LeagueCreateFormOverridesProps = {
    LeagueCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    sport?: PrimitiveOverrideProps<TextFieldProps>;
    date_founded?: PrimitiveOverrideProps<TextFieldProps>;
    cost_per_individual?: PrimitiveOverrideProps<TextFieldProps>;
    cost_per_team?: PrimitiveOverrideProps<TextFieldProps>;
    coordinators?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    number_of_periods?: PrimitiveOverrideProps<TextFieldProps>;
    time_per_period?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LeagueCreateFormProps = React.PropsWithChildren<{
    overrides?: LeagueCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LeagueCreateFormInputValues) => LeagueCreateFormInputValues;
    onSuccess?: (fields: LeagueCreateFormInputValues) => void;
    onError?: (fields: LeagueCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LeagueCreateFormInputValues) => LeagueCreateFormInputValues;
    onValidate?: LeagueCreateFormValidationValues;
} & React.CSSProperties>;
export default function LeagueCreateForm(props: LeagueCreateFormProps): React.ReactElement;
