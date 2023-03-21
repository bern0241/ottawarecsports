/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeamsCreateFormInputValues = {
	name?: string;
	founded?: number;
	home_colour?: string;
	away_colour?: string;
	team_picture?: string;
};
export declare type TeamsCreateFormValidationValues = {
	name?: ValidationFunction<string>;
	founded?: ValidationFunction<number>;
	home_colour?: ValidationFunction<string>;
	away_colour?: ValidationFunction<string>;
	team_picture?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type TeamsCreateFormOverridesProps = {
	TeamsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
	name?: PrimitiveOverrideProps<TextFieldProps>;
	founded?: PrimitiveOverrideProps<TextFieldProps>;
	home_colour?: PrimitiveOverrideProps<TextFieldProps>;
	away_colour?: PrimitiveOverrideProps<TextFieldProps>;
	team_picture?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamsCreateFormProps = React.PropsWithChildren<
	{
		overrides?: TeamsCreateFormOverridesProps | undefined | null;
	} & {
		clearOnSuccess?: boolean;
		onSubmit?: (
			fields: TeamsCreateFormInputValues
		) => TeamsCreateFormInputValues;
		onSuccess?: (fields: TeamsCreateFormInputValues) => void;
		onError?: (
			fields: TeamsCreateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: TeamsCreateFormInputValues
		) => TeamsCreateFormInputValues;
		onValidate?: TeamsCreateFormValidationValues;
	} & React.CSSProperties
>;
export default function TeamsCreateForm(
	props: TeamsCreateFormProps
): React.ReactElement;
export declare type TeamsCreateFormProps = React.PropsWithChildren<
	{
		overrides?: TeamsCreateFormOverridesProps | undefined | null;
	} & {
		clearOnSuccess?: boolean;
		onSubmit?: (
			fields: TeamsCreateFormInputValues
		) => TeamsCreateFormInputValues;
		onSuccess?: (fields: TeamsCreateFormInputValues) => void;
		onError?: (
			fields: TeamsCreateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: TeamsCreateFormInputValues
		) => TeamsCreateFormInputValues;
		onValidate?: TeamsCreateFormValidationValues;
	} & React.CSSProperties
>;
export default function TeamsCreateForm(
	props: TeamsCreateFormProps
): React.ReactElement;
