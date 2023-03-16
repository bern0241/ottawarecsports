/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from 'react';
import {
	Badge,
	Button,
	Divider,
	Flex,
	Grid,
	Icon,
	ScrollView,
	Text,
	TextField,
	useTheme,
} from '@aws-amplify/ui-react';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import { PlayersSoccer } from '../models';
import { fetchByPath, validateField } from './utils';
import { DataStore } from 'aws-amplify';
function ArrayField({
	items = [],
	onChange,
	label,
	inputFieldRef,
	children,
	hasError,
	setFieldValue,
	currentFieldValue,
	defaultFieldValue,
	lengthLimit,
	getBadgeText,
	errorMessage,
}) {
	const labelElement = <Text>{label}</Text>;
	const {
		tokens: {
			components: {
				fieldmessages: { error: errorStyles },
			},
		},
	} = useTheme();
	const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
	const [isEditing, setIsEditing] = React.useState();
	React.useEffect(() => {
		if (isEditing) {
			inputFieldRef?.current?.focus();
		}
	}, [isEditing]);
	const removeItem = async (removeIndex) => {
		const newItems = items.filter((value, index) => index !== removeIndex);
		await onChange(newItems);
		setSelectedBadgeIndex(undefined);
	};
	const addItem = async () => {
		if (
			currentFieldValue !== undefined &&
			currentFieldValue !== null &&
			currentFieldValue !== '' &&
			!hasError
		) {
			const newItems = [...items];
			if (selectedBadgeIndex !== undefined) {
				newItems[selectedBadgeIndex] = currentFieldValue;
				setSelectedBadgeIndex(undefined);
			} else {
				newItems.push(currentFieldValue);
			}
			await onChange(newItems);
			setIsEditing(false);
		}
	};
	const arraySection = (
		<React.Fragment>
			{!!items?.length && (
				<ScrollView height="inherit" width="inherit" maxHeight={'7rem'}>
					{items.map((value, index) => {
						return (
							<Badge
								key={index}
								style={{
									cursor: 'pointer',
									alignItems: 'center',
									marginRight: 3,
									marginTop: 3,
									backgroundColor:
										index === selectedBadgeIndex ? '#B8CEF9' : '',
								}}
								onClick={() => {
									setSelectedBadgeIndex(index);
									setFieldValue(items[index]);
									setIsEditing(true);
								}}
							>
								{getBadgeText ? getBadgeText(value) : value.toString()}
								<Icon
									style={{
										cursor: 'pointer',
										paddingLeft: 3,
										width: 20,
										height: 20,
									}}
									viewBox={{ width: 20, height: 20 }}
									paths={[
										{
											d: 'M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z',
											stroke: 'black',
										},
									]}
									ariaLabel="button"
									onClick={(event) => {
										event.stopPropagation();
										removeItem(index);
									}}
								/>
							</Badge>
						);
					})}
				</ScrollView>
			)}
			<Divider orientation="horizontal" marginTop={5} />
		</React.Fragment>
	);
	if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
		return (
			<React.Fragment>
				{labelElement}
				{arraySection}
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			{labelElement}
			{isEditing && children}
			{!isEditing ? (
				<>
					<Button
						onClick={() => {
							setIsEditing(true);
						}}
					>
						Add item
					</Button>
					{errorMessage && hasError && (
						<Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
							{errorMessage}
						</Text>
					)}
				</>
			) : (
				<Flex justifyContent="flex-end">
					{(currentFieldValue || isEditing) && (
						<Button
							children="Cancel"
							type="button"
							size="small"
							onClick={() => {
								setFieldValue(defaultFieldValue);
								setIsEditing(false);
								setSelectedBadgeIndex(undefined);
							}}
						></Button>
					)}
					<Button
						size="small"
						variation="link"
						isDisabled={hasError}
						onClick={addItem}
					>
						{selectedBadgeIndex !== undefined ? 'Save' : 'Add'}
					</Button>
				</Flex>
			)}
			{arraySection}
		</React.Fragment>
	);
}
export default function PlayersSoccerUpdateForm(props) {
	const {
		id: idProp,
		playersSoccer,
		onSuccess,
		onError,
		onSubmit,
		onValidate,
		onChange,
		overrides,
		...rest
	} = props;
	const initialValues = {
		user: '',
		position: '',
		goals: '',
		assists: '',
		yellow_cards: '',
		red_cards: '',
		roles: [],
	};
	const [user, setUser] = React.useState(initialValues.user);
	const [position, setPosition] = React.useState(initialValues.position);
	const [goals, setGoals] = React.useState(initialValues.goals);
	const [assists, setAssists] = React.useState(initialValues.assists);
	const [yellow_cards, setYellow_cards] = React.useState(
		initialValues.yellow_cards
	);
	const [red_cards, setRed_cards] = React.useState(initialValues.red_cards);
	const [roles, setRoles] = React.useState(initialValues.roles);
	const [errors, setErrors] = React.useState({});
	const resetStateValues = () => {
		const cleanValues = playersSoccerRecord
			? { ...initialValues, ...playersSoccerRecord }
			: initialValues;
		setUser(cleanValues.user);
		setPosition(cleanValues.position);
		setGoals(cleanValues.goals);
		setAssists(cleanValues.assists);
		setYellow_cards(cleanValues.yellow_cards);
		setRed_cards(cleanValues.red_cards);
		setRoles(cleanValues.roles ?? []);
		setCurrentRolesValue('');
		setErrors({});
	};
	const [playersSoccerRecord, setPlayersSoccerRecord] =
		React.useState(playersSoccer);
	React.useEffect(() => {
		const queryData = async () => {
			const record = idProp
				? await DataStore.query(PlayersSoccer, idProp)
				: playersSoccer;
			setPlayersSoccerRecord(record);
		};
		queryData();
	}, [idProp, playersSoccer]);
	React.useEffect(resetStateValues, [playersSoccerRecord]);
	const [currentRolesValue, setCurrentRolesValue] = React.useState('');
	const rolesRef = React.createRef();
	const validations = {
		user: [],
		position: [],
		goals: [],
		assists: [],
		yellow_cards: [],
		red_cards: [],
		roles: [],
	};
	const runValidationTasks = async (
		fieldName,
		currentValue,
		getDisplayValue
	) => {
		const value =
			currentValue && getDisplayValue
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
	return (
		<Grid
			as="form"
			rowGap="15px"
			columnGap="15px"
			padding="20px"
			onSubmit={async (event) => {
				event.preventDefault();
				let modelFields = {
					user,
					position,
					goals,
					assists,
					yellow_cards,
					red_cards,
					roles,
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
					await DataStore.save(
						PlayersSoccer.copyOf(playersSoccerRecord, (updated) => {
							Object.assign(updated, modelFields);
						})
					);
					if (onSuccess) {
						onSuccess(modelFields);
					}
				} catch (err) {
					if (onError) {
						onError(modelFields, err.message);
					}
				}
			}}
			{...getOverrideProps(overrides, 'PlayersSoccerUpdateForm')}
			{...rest}
		>
			<TextField
				label="User"
				isRequired={false}
				isReadOnly={false}
				value={user}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							user: value,
							position,
							goals,
							assists,
							yellow_cards,
							red_cards,
							roles,
						};
						const result = onChange(modelFields);
						value = result?.user ?? value;
					}
					if (errors.user?.hasError) {
						runValidationTasks('user', value);
					}
					setUser(value);
				}}
				onBlur={() => runValidationTasks('user', user)}
				errorMessage={errors.user?.errorMessage}
				hasError={errors.user?.hasError}
				{...getOverrideProps(overrides, 'user')}
			></TextField>
			<TextField
				label="Position"
				isRequired={false}
				isReadOnly={false}
				value={position}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							user,
							position: value,
							goals,
							assists,
							yellow_cards,
							red_cards,
							roles,
						};
						const result = onChange(modelFields);
						value = result?.position ?? value;
					}
					if (errors.position?.hasError) {
						runValidationTasks('position', value);
					}
					setPosition(value);
				}}
				onBlur={() => runValidationTasks('position', position)}
				errorMessage={errors.position?.errorMessage}
				hasError={errors.position?.hasError}
				{...getOverrideProps(overrides, 'position')}
			></TextField>
			<TextField
				label="Goals"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={goals}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value))
						? e.target.value
						: parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							user,
							position,
							goals: value,
							assists,
							yellow_cards,
							red_cards,
							roles,
						};
						const result = onChange(modelFields);
						value = result?.goals ?? value;
					}
					if (errors.goals?.hasError) {
						runValidationTasks('goals', value);
					}
					setGoals(value);
				}}
				onBlur={() => runValidationTasks('goals', goals)}
				errorMessage={errors.goals?.errorMessage}
				hasError={errors.goals?.hasError}
				{...getOverrideProps(overrides, 'goals')}
			></TextField>
			<TextField
				label="Assists"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={assists}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value))
						? e.target.value
						: parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							user,
							position,
							goals,
							assists: value,
							yellow_cards,
							red_cards,
							roles,
						};
						const result = onChange(modelFields);
						value = result?.assists ?? value;
					}
					if (errors.assists?.hasError) {
						runValidationTasks('assists', value);
					}
					setAssists(value);
				}}
				onBlur={() => runValidationTasks('assists', assists)}
				errorMessage={errors.assists?.errorMessage}
				hasError={errors.assists?.hasError}
				{...getOverrideProps(overrides, 'assists')}
			></TextField>
			<TextField
				label="Yellow cards"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={yellow_cards}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value))
						? e.target.value
						: parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							user,
							position,
							goals,
							assists,
							yellow_cards: value,
							red_cards,
							roles,
						};
						const result = onChange(modelFields);
						value = result?.yellow_cards ?? value;
					}
					if (errors.yellow_cards?.hasError) {
						runValidationTasks('yellow_cards', value);
					}
					setYellow_cards(value);
				}}
				onBlur={() => runValidationTasks('yellow_cards', yellow_cards)}
				errorMessage={errors.yellow_cards?.errorMessage}
				hasError={errors.yellow_cards?.hasError}
				{...getOverrideProps(overrides, 'yellow_cards')}
			></TextField>
			<TextField
				label="Red cards"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={red_cards}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value))
						? e.target.value
						: parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							user,
							position,
							goals,
							assists,
							yellow_cards,
							red_cards: value,
							roles,
						};
						const result = onChange(modelFields);
						value = result?.red_cards ?? value;
					}
					if (errors.red_cards?.hasError) {
						runValidationTasks('red_cards', value);
					}
					setRed_cards(value);
				}}
				onBlur={() => runValidationTasks('red_cards', red_cards)}
				errorMessage={errors.red_cards?.errorMessage}
				hasError={errors.red_cards?.hasError}
				{...getOverrideProps(overrides, 'red_cards')}
			></TextField>
			<ArrayField
				onChange={async (items) => {
					let values = items;
					if (onChange) {
						const modelFields = {
							user,
							position,
							goals,
							assists,
							yellow_cards,
							red_cards,
							roles: values,
						};
						const result = onChange(modelFields);
						values = result?.roles ?? values;
					}
					setRoles(values);
					setCurrentRolesValue('');
				}}
				currentFieldValue={currentRolesValue}
				label={'Roles'}
				items={roles}
				hasError={errors?.roles?.hasError}
				errorMessage={errors?.roles?.errorMessage}
				setFieldValue={setCurrentRolesValue}
				inputFieldRef={rolesRef}
				defaultFieldValue={''}
			>
				<TextField
					label="Roles"
					isRequired={false}
					isReadOnly={false}
					value={currentRolesValue}
					onChange={(e) => {
						let { value } = e.target;
						if (errors.roles?.hasError) {
							runValidationTasks('roles', value);
						}
						setCurrentRolesValue(value);
					}}
					onBlur={() => runValidationTasks('roles', currentRolesValue)}
					errorMessage={errors.roles?.errorMessage}
					hasError={errors.roles?.hasError}
					ref={rolesRef}
					labelHidden={true}
					{...getOverrideProps(overrides, 'roles')}
				></TextField>
			</ArrayField>
			<Flex
				justifyContent="space-between"
				{...getOverrideProps(overrides, 'CTAFlex')}
			>
				<Button
					children="Reset"
					type="reset"
					onClick={(event) => {
						event.preventDefault();
						resetStateValues();
					}}
					isDisabled={!(idProp || playersSoccer)}
					{...getOverrideProps(overrides, 'ResetButton')}
				></Button>
				<Flex
					gap="15px"
					{...getOverrideProps(overrides, 'RightAlignCTASubFlex')}
				>
					<Button
						children="Submit"
						type="submit"
						variation="primary"
						isDisabled={
							!(idProp || playersSoccer) ||
							Object.values(errors).some((e) => e?.hasError)
						}
						{...getOverrideProps(overrides, 'SubmitButton')}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
