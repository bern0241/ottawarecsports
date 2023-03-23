/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SportsmanshipPointCreateFormInputValues = {};
export declare type SportsmanshipPointCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SportsmanshipPointCreateFormOverridesProps = {
    SportsmanshipPointCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type SportsmanshipPointCreateFormProps = React.PropsWithChildren<{
    overrides?: SportsmanshipPointCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SportsmanshipPointCreateFormInputValues) => SportsmanshipPointCreateFormInputValues;
    onSuccess?: (fields: SportsmanshipPointCreateFormInputValues) => void;
    onError?: (fields: SportsmanshipPointCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SportsmanshipPointCreateFormInputValues) => SportsmanshipPointCreateFormInputValues;
    onValidate?: SportsmanshipPointCreateFormValidationValues;
} & React.CSSProperties>;
export default function SportsmanshipPointCreateForm(props: SportsmanshipPointCreateFormProps): React.ReactElement;
