/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import {
	Button,
	Flex,
	Grid,
	SelectField,
	TextField,
} from '@aws-amplify/ui-react';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import { Users } from '../models';
import { fetchByPath, validateField } from './utils';
import { DataStore } from 'aws-amplify';
export default function UsersCreateForm(props) {
	const {
		clearOnSuccess = true,
		onSuccess,
		onError,
		onSubmit,
		onValidate,
		onChange,
		overrides,
		...rest
	} = props;
	const initialValues = {
		first_name: '',
		last_name: '',
		email: '',
		gender: undefined,
		date_of_birth: '',
		profile_picture: '',
		username: '',
	};
	const [first_name, setFirst_name] = React.useState(initialValues.first_name);
	const [last_name, setLast_name] = React.useState(initialValues.last_name);
	const [email, setEmail] = React.useState(initialValues.email);
	const [gender, setGender] = React.useState(initialValues.gender);
	const [date_of_birth, setDate_of_birth] = React.useState(
		initialValues.date_of_birth
	);
	const [profile_picture, setProfile_picture] = React.useState(
		initialValues.profile_picture
	);
	const [username, setUsername] = React.useState(initialValues.username);
	const [errors, setErrors] = React.useState({});
	const resetStateValues = () => {
		setFirst_name(initialValues.first_name);
		setLast_name(initialValues.last_name);
		setEmail(initialValues.email);
		setGender(initialValues.gender);
		setDate_of_birth(initialValues.date_of_birth);
		setProfile_picture(initialValues.profile_picture);
		setUsername(initialValues.username);
		setErrors({});
	};
	const validations = {
		first_name: [],
		last_name: [],
		email: [{ type: 'Email' }],
		gender: [],
		date_of_birth: [],
		profile_picture: [],
		username: [],
	};
	const runValidationTasks = async (
		fieldName,
		currentValue,
		getDisplayValue
	) => {
		const value = getDisplayValue
			? getDisplayValue(currentValue)
			: currentValue;
		let validationResponse = validateField(value, validations[fieldName]);
		const customValidator = fetchByPath(onValidate, fieldName);
		if (customValidator) {
			validationResponse = await customValidator(value, validationResponse);
		}
		setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
		return validationResponse;
	};
	const convertTimeStampToDate = (ts) => {
		if (Math.abs(Date.now() - ts) < Math.abs(Date.now() - ts * 1000)) {
			return new Date(ts);
		}
		return new Date(ts * 1000);
	};
	const convertToLocal = (date) => {
		const df = new Intl.DateTimeFormat('default', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			calendar: 'iso8601',
			numberingSystem: 'latn',
			hour12: false,
		});
		const parts = df.formatToParts(date).reduce((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});
		return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
	};
	return (
		<Grid
			as="form"
			rowGap="15px"
			columnGap="15px"
			padding="20px"
			onSubmit={async (event) => {
				event.preventDefault();
				let modelFields = {
					first_name,
					last_name,
					email,
					gender,
					date_of_birth,
					profile_picture,
					username,
				};
				const validationResponses = await Promise.all(
					Object.keys(validations).reduce((promises, fieldName) => {
						if (Array.isArray(modelFields[fieldName])) {
							promises.push(
								...modelFields[fieldName].map((item) =>
									runValidationTasks(fieldName, item)
								)
							);
							return promises;
						}
						promises.push(
							runValidationTasks(fieldName, modelFields[fieldName])
						);
						return promises;
					}, [])
				);
				if (validationResponses.some((r) => r.hasError)) {
					return;
				}
				if (onSubmit) {
					modelFields = onSubmit(modelFields);
				}
				try {
					Object.entries(modelFields).forEach(([key, value]) => {
						if (typeof value === 'string' && value.trim() === '') {
							modelFields[key] = undefined;
						}
					});
					await DataStore.save(new Users(modelFields));
					if (onSuccess) {
						onSuccess(modelFields);
					}
					if (clearOnSuccess) {
						resetStateValues();
					}
				} catch (err) {
					if (onError) {
						onError(modelFields, err.message);
					}
				}
			}}
			{...getOverrideProps(overrides, 'UsersCreateForm')}
			{...rest}
		>
			<TextField
				label="First name"
				isRequired={false}
				isReadOnly={false}
				value={first_name}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							first_name: value,
							last_name,
							email,
							gender,
							date_of_birth,
							profile_picture,
							username,
						};
						const result = onChange(modelFields);
						value = result?.first_name ?? value;
					}
					if (errors.first_name?.hasError) {
						runValidationTasks('first_name', value);
					}
					setFirst_name(value);
				}}
				onBlur={() => runValidationTasks('first_name', first_name)}
				errorMessage={errors.first_name?.errorMessage}
				hasError={errors.first_name?.hasError}
				{...getOverrideProps(overrides, 'first_name')}
			></TextField>
			<TextField
				label="Last name"
				isRequired={false}
				isReadOnly={false}
				value={last_name}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							first_name,
							last_name: value,
							email,
							gender,
							date_of_birth,
							profile_picture,
							username,
						};
						const result = onChange(modelFields);
						value = result?.last_name ?? value;
					}
					if (errors.last_name?.hasError) {
						runValidationTasks('last_name', value);
					}
					setLast_name(value);
				}}
				onBlur={() => runValidationTasks('last_name', last_name)}
				errorMessage={errors.last_name?.errorMessage}
				hasError={errors.last_name?.hasError}
				{...getOverrideProps(overrides, 'last_name')}
			></TextField>
			<TextField
				label="Email"
				isRequired={false}
				isReadOnly={false}
				value={email}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							first_name,
							last_name,
							email: value,
							gender,
							date_of_birth,
							profile_picture,
							username,
						};
						const result = onChange(modelFields);
						value = result?.email ?? value;
					}
					if (errors.email?.hasError) {
						runValidationTasks('email', value);
					}
					setEmail(value);
				}}
				onBlur={() => runValidationTasks('email', email)}
				errorMessage={errors.email?.errorMessage}
				hasError={errors.email?.hasError}
				{...getOverrideProps(overrides, 'email')}
			></TextField>
			<SelectField
				label="Gender"
				placeholder="Please select an option"
				isDisabled={false}
				value={gender}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							first_name,
							last_name,
							email,
							gender: value,
							date_of_birth,
							profile_picture,
							username,
						};
						const result = onChange(modelFields);
						value = result?.gender ?? value;
					}
					if (errors.gender?.hasError) {
						runValidationTasks('gender', value);
					}
					setGender(value);
				}}
				onBlur={() => runValidationTasks('gender', gender)}
				errorMessage={errors.gender?.errorMessage}
				hasError={errors.gender?.hasError}
				{...getOverrideProps(overrides, 'gender')}
			>
				<option
					children="Male"
					value="MALE"
					{...getOverrideProps(overrides, 'genderoption0')}
				></option>
				<option
					children="Female"
					value="FEMALE"
					{...getOverrideProps(overrides, 'genderoption1')}
				></option>
			</SelectField>
			<TextField
				label="Date of birth"
				isRequired={false}
				isReadOnly={false}
				type="datetime-local"
				value={
					date_of_birth && convertToLocal(convertTimeStampToDate(date_of_birth))
				}
				onChange={(e) => {
					let value =
						e.target.value === '' ? '' : Number(new Date(e.target.value));
					if (onChange) {
						const modelFields = {
							first_name,
							last_name,
							email,
							gender,
							date_of_birth: value,
							profile_picture,
							username,
						};
						const result = onChange(modelFields);
						value = result?.date_of_birth ?? value;
					}
					if (errors.date_of_birth?.hasError) {
						runValidationTasks('date_of_birth', value);
					}
					setDate_of_birth(value);
				}}
				onBlur={() => runValidationTasks('date_of_birth', date_of_birth)}
				errorMessage={errors.date_of_birth?.errorMessage}
				hasError={errors.date_of_birth?.hasError}
				{...getOverrideProps(overrides, 'date_of_birth')}
			></TextField>
			<TextField
				label="Profile picture"
				isRequired={false}
				isReadOnly={false}
				value={profile_picture}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							first_name,
							last_name,
							email,
							gender,
							date_of_birth,
							profile_picture: value,
							username,
						};
						const result = onChange(modelFields);
						value = result?.profile_picture ?? value;
					}
					if (errors.profile_picture?.hasError) {
						runValidationTasks('profile_picture', value);
					}
					setProfile_picture(value);
				}}
				onBlur={() => runValidationTasks('profile_picture', profile_picture)}
				errorMessage={errors.profile_picture?.errorMessage}
				hasError={errors.profile_picture?.hasError}
				{...getOverrideProps(overrides, 'profile_picture')}
			></TextField>
			<TextField
				label="Username"
				isRequired={false}
				isReadOnly={false}
				value={username}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							first_name,
							last_name,
							email,
							gender,
							date_of_birth,
							profile_picture,
							username: value,
						};
						const result = onChange(modelFields);
						value = result?.username ?? value;
					}
					if (errors.username?.hasError) {
						runValidationTasks('username', value);
					}
					setUsername(value);
				}}
				onBlur={() => runValidationTasks('username', username)}
				errorMessage={errors.username?.errorMessage}
				hasError={errors.username?.hasError}
				{...getOverrideProps(overrides, 'username')}
			></TextField>
			<Flex
				justifyContent="space-between"
				{...getOverrideProps(overrides, 'CTAFlex')}
			>
				<Button
					children="Clear"
					type="reset"
					onClick={(event) => {
						event.preventDefault();
						resetStateValues();
					}}
					{...getOverrideProps(overrides, 'ClearButton')}
				></Button>
				<Flex
					gap="15px"
					{...getOverrideProps(overrides, 'RightAlignCTASubFlex')}
				>
					<Button
						children="Submit"
						type="submit"
						variation="primary"
						isDisabled={Object.values(errors).some((e) => e?.hasError)}
						{...getOverrideProps(overrides, 'SubmitButton')}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
