/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import {
	GridProps,
	SelectFieldProps,
	TextFieldProps,
} from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { Leagues } from '../models';
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type LeaguesUpdateFormInputValues = {
	name?: string;
	sport?: string;
	date_founded?: number;
	gender?: string;
	cost_per_individual?: number;
	cost_per_team?: number;
	coordinator?: string[];
};
export declare type LeaguesUpdateFormValidationValues = {
	name?: ValidationFunction<string>;
	sport?: ValidationFunction<string>;
	date_founded?: ValidationFunction<number>;
	gender?: ValidationFunction<string>;
	cost_per_individual?: ValidationFunction<number>;
	cost_per_team?: ValidationFunction<number>;
	coordinator?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type LeaguesUpdateFormOverridesProps = {
	LeaguesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	name?: PrimitiveOverrideProps<TextFieldProps>;
	sport?: PrimitiveOverrideProps<TextFieldProps>;
	date_founded?: PrimitiveOverrideProps<TextFieldProps>;
	gender?: PrimitiveOverrideProps<SelectFieldProps>;
	cost_per_individual?: PrimitiveOverrideProps<TextFieldProps>;
	cost_per_team?: PrimitiveOverrideProps<TextFieldProps>;
	coordinator?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LeaguesUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: LeaguesUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		leagues?: Leagues;
		onSubmit?: (
			fields: LeaguesUpdateFormInputValues
		) => LeaguesUpdateFormInputValues;
		onSuccess?: (fields: LeaguesUpdateFormInputValues) => void;
		onError?: (
			fields: LeaguesUpdateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: LeaguesUpdateFormInputValues
		) => LeaguesUpdateFormInputValues;
		onValidate?: LeaguesUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function LeaguesUpdateForm(
	props: LeaguesUpdateFormProps
): React.ReactElement;
