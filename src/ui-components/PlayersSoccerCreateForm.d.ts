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
export declare type PlayersSoccerCreateFormInputValues = {
	user?: string;
	position?: string;
	goals?: number;
	assists?: number;
	yellow_cards?: number;
	red_cards?: number;
	roles?: string[];
};
export declare type PlayersSoccerCreateFormValidationValues = {
	user?: ValidationFunction<string>;
	position?: ValidationFunction<string>;
	goals?: ValidationFunction<number>;
	assists?: ValidationFunction<number>;
	yellow_cards?: ValidationFunction<number>;
	red_cards?: ValidationFunction<number>;
	roles?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type PlayersSoccerCreateFormOverridesProps = {
	PlayersSoccerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
	user?: PrimitiveOverrideProps<TextFieldProps>;
	position?: PrimitiveOverrideProps<TextFieldProps>;
	goals?: PrimitiveOverrideProps<TextFieldProps>;
	assists?: PrimitiveOverrideProps<TextFieldProps>;
	yellow_cards?: PrimitiveOverrideProps<TextFieldProps>;
	red_cards?: PrimitiveOverrideProps<TextFieldProps>;
	roles?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlayersSoccerCreateFormProps = React.PropsWithChildren<
	{
		overrides?: PlayersSoccerCreateFormOverridesProps | undefined | null;
	} & {
		clearOnSuccess?: boolean;
		onSubmit?: (
			fields: PlayersSoccerCreateFormInputValues
		) => PlayersSoccerCreateFormInputValues;
		onSuccess?: (fields: PlayersSoccerCreateFormInputValues) => void;
		onError?: (
			fields: PlayersSoccerCreateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: PlayersSoccerCreateFormInputValues
		) => PlayersSoccerCreateFormInputValues;
		onValidate?: PlayersSoccerCreateFormValidationValues;
	} & React.CSSProperties
>;
export default function PlayersSoccerCreateForm(
	props: PlayersSoccerCreateFormProps
): React.ReactElement;
