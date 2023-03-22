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
import { Users } from '../models';
export declare type ValidationResponse = {
	hasError: boolean;
	errorMessage?: string;
};
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type UsersUpdateFormInputValues = {
	first_name?: string;
	last_name?: string;
	email?: string;
	gender?: string;
	date_of_birth?: number;
	profile_picture?: string;
	username?: string;
};
export declare type UsersUpdateFormValidationValues = {
	first_name?: ValidationFunction<string>;
	last_name?: ValidationFunction<string>;
	email?: ValidationFunction<string>;
	gender?: ValidationFunction<string>;
	date_of_birth?: ValidationFunction<number>;
	profile_picture?: ValidationFunction<string>;
	username?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type UsersUpdateFormOverridesProps = {
	UsersUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	first_name?: PrimitiveOverrideProps<TextFieldProps>;
	last_name?: PrimitiveOverrideProps<TextFieldProps>;
	email?: PrimitiveOverrideProps<TextFieldProps>;
	gender?: PrimitiveOverrideProps<SelectFieldProps>;
	date_of_birth?: PrimitiveOverrideProps<TextFieldProps>;
	profile_picture?: PrimitiveOverrideProps<TextFieldProps>;
	username?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UsersUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: UsersUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		users?: Users;
		onSubmit?: (
			fields: UsersUpdateFormInputValues
		) => UsersUpdateFormInputValues;
		onSuccess?: (fields: UsersUpdateFormInputValues) => void;
		onError?: (
			fields: UsersUpdateFormInputValues,
			errorMessage: string
		) => void;
		onChange?: (
			fields: UsersUpdateFormInputValues
		) => UsersUpdateFormInputValues;
		onValidate?: UsersUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function UsersUpdateForm(
	props: UsersUpdateFormProps
): React.ReactElement;
