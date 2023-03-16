/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { PlayersSoccer } from '../models';
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type PlayersSoccerUpdateFormInputValues = {
	user?: string;
	position?: string;
	goals?: number;
	assists?: number;
	yellow_cards?: number;
	red_cards?: number;
	roles?: string[];
};
export declare type PlayersSoccerUpdateFormValidationValues = {
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
export declare type PlayersSoccerUpdateFormOverridesProps = {
	PlayersSoccerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	user?: PrimitiveOverrideProps<TextFieldProps>;
	position?: PrimitiveOverrideProps<TextFieldProps>;
	goals?: PrimitiveOverrideProps<TextFieldProps>;
	assists?: PrimitiveOverrideProps<TextFieldProps>;
	yellow_cards?: PrimitiveOverrideProps<TextFieldProps>;
	red_cards?: PrimitiveOverrideProps<TextFieldProps>;
	roles?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PlayersSoccerUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: PlayersSoccerUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		playersSoccer?: PlayersSoccer;
		onSubmit?: (
			fields: PlayersSoccerUpdateFormInputValues
		) => PlayersSoccerUpdateFormInputValues;
		onSuccess?: (fields: PlayersSoccerUpdateFormInputValues) => void;
		onError?: (
			fields: PlayersSoccerUpdateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: PlayersSoccerUpdateFormInputValues
		) => PlayersSoccerUpdateFormInputValues;
		onValidate?: PlayersSoccerUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function PlayersSoccerUpdateForm(
	props: PlayersSoccerUpdateFormProps
): React.ReactElement;