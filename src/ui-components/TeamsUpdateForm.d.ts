/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from 'react';
import {
	GridProps,
	SelectFieldProps,
	TextAreaFieldProps,
	TextFieldProps,
} from '@aws-amplify/ui-react';
import { EscapeHatchProps } from '@aws-amplify/ui-react/internal';
import { Teams } from '../models';
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeamsUpdateFormInputValues = {
	name?: string[];
	founded?: number;
	home_colour?: string;
	away_colour?: string;
	division?: string;
	team_captain?: string[];
	games_played?: number;
};
export declare type TeamsUpdateFormValidationValues = {
	name?: ValidationFunction<string>;
	founded?: ValidationFunction<number>;
	home_colour?: ValidationFunction<string>;
	away_colour?: ValidationFunction<string>;
	division?: ValidationFunction<string>;
	team_captain?: ValidationFunction<string>;
	games_played?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type TeamsUpdateFormOverridesProps = {
	TeamsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	name?: PrimitiveOverrideProps<TextAreaFieldProps>;
	founded?: PrimitiveOverrideProps<TextFieldProps>;
	home_colour?: PrimitiveOverrideProps<TextFieldProps>;
	away_colour?: PrimitiveOverrideProps<TextFieldProps>;
	division?: PrimitiveOverrideProps<SelectFieldProps>;
	team_captain?: PrimitiveOverrideProps<TextAreaFieldProps>;
	games_played?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamsUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: TeamsUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		teams?: Teams;
		onSubmit?: (
			fields: TeamsUpdateFormInputValues
		) => TeamsUpdateFormInputValues;
		onSuccess?: (fields: TeamsUpdateFormInputValues) => void;
		onError?: (
			fields: TeamsUpdateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: TeamsUpdateFormInputValues
		) => TeamsUpdateFormInputValues;
		onValidate?: TeamsUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function TeamsUpdateForm(
	props: TeamsUpdateFormProps
): React.ReactElement;