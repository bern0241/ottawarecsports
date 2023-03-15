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
	SelectField,
	Text,
	TextAreaField,
	TextField,
	useTheme,
} from '@aws-amplify/ui-react';
import { getOverrideProps } from '@aws-amplify/ui-react/internal';
import { Teams } from '../models';
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
}) {
	const labelElement = <Text>{label}</Text>;
	const { tokens } = useTheme();
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
						color={tokens.colors.brand.primary[80]}
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
export default function TeamsUpdateForm(props) {
	const {
		id: idProp,
		teams,
		onSuccess,
		onError,
		onSubmit,
		onValidate,
		onChange,
		overrides,
		...rest
	} = props;
	const initialValues = {
		name: [],
		founded: '',
		home_colour: '',
		away_colour: '',
		division: undefined,
		team_captain: [],
		games_played: '',
	};
	const [name, setName] = React.useState(initialValues.name);
	const [founded, setFounded] = React.useState(initialValues.founded);
	const [home_colour, setHome_colour] = React.useState(
		initialValues.home_colour
	);
	const [away_colour, setAway_colour] = React.useState(
		initialValues.away_colour
	);
	const [division, setDivision] = React.useState(initialValues.division);
	const [team_captain, setTeam_captain] = React.useState(
		initialValues.team_captain
	);
	const [games_played, setGames_played] = React.useState(
		initialValues.games_played
	);
	const [errors, setErrors] = React.useState({});
	const resetStateValues = () => {
		const cleanValues = teamsRecord
			? { ...initialValues, ...teamsRecord }
			: initialValues;
		setName(cleanValues.name ?? []);
		setCurrentNameValue('');
		setFounded(cleanValues.founded);
		setHome_colour(cleanValues.home_colour);
		setAway_colour(cleanValues.away_colour);
		setDivision(cleanValues.division);
		setTeam_captain(cleanValues.team_captain ?? []);
		setCurrentTeam_captainValue('');
		setGames_played(cleanValues.games_played);
		setErrors({});
	};
	const [teamsRecord, setTeamsRecord] = React.useState(teams);
	React.useEffect(() => {
		const queryData = async () => {
			const record = idProp ? await DataStore.query(Teams, idProp) : teams;
			setTeamsRecord(record);
		};
		queryData();
	}, [idProp, teams]);
	React.useEffect(resetStateValues, [teamsRecord]);
	const [currentNameValue, setCurrentNameValue] = React.useState('');
	const nameRef = React.createRef();
	const [currentTeam_captainValue, setCurrentTeam_captainValue] =
		React.useState('');
	const team_captainRef = React.createRef();
	const validations = {
		name: [{ type: 'JSON' }],
		founded: [],
		home_colour: [],
		away_colour: [],
		division: [],
		team_captain: [{ type: 'JSON' }],
		games_played: [],
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
					name,
					founded,
					home_colour,
					away_colour,
					division,
					team_captain,
					games_played,
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
						Teams.copyOf(teamsRecord, (updated) => {
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
			{...getOverrideProps(overrides, 'TeamsUpdateForm')}
			{...rest}
		>
			<ArrayField
				onChange={async (items) => {
					let values = items;
					if (onChange) {
						const modelFields = {
							name: values,
							founded,
							home_colour,
							away_colour,
							division,
							team_captain,
							games_played,
						};
						const result = onChange(modelFields);
						values = result?.name ?? values;
					}
					setName(values);
					setCurrentNameValue('');
				}}
				currentFieldValue={currentNameValue}
				label={'Name'}
				items={name}
				hasError={errors.name?.hasError}
				setFieldValue={setCurrentNameValue}
				inputFieldRef={nameRef}
				defaultFieldValue={''}
			>
				<TextAreaField
					label="Name"
					isRequired={false}
					isReadOnly={false}
					value={currentNameValue}
					onChange={(e) => {
						let { value } = e.target;
						if (errors.name?.hasError) {
							runValidationTasks('name', value);
						}
						setCurrentNameValue(value);
					}}
					onBlur={() => runValidationTasks('name', currentNameValue)}
					errorMessage={errors.name?.errorMessage}
					hasError={errors.name?.hasError}
					ref={nameRef}
					labelHidden={true}
					{...getOverrideProps(overrides, 'name')}
				></TextAreaField>
			</ArrayField>
			<TextField
				label="Founded"
				isRequired={false}
				isReadOnly={false}
				type="datetime-local"
				value={founded && convertToLocal(convertTimeStampToDate(founded))}
				onChange={(e) => {
					let value =
						e.target.value === '' ? '' : Number(new Date(e.target.value));
					if (onChange) {
						const modelFields = {
							name,
							founded: value,
							home_colour,
							away_colour,
							division,
							team_captain,
							games_played,
						};
						const result = onChange(modelFields);
						value = result?.founded ?? value;
					}
					if (errors.founded?.hasError) {
						runValidationTasks('founded', value);
					}
					setFounded(value);
				}}
				onBlur={() => runValidationTasks('founded', founded)}
				errorMessage={errors.founded?.errorMessage}
				hasError={errors.founded?.hasError}
				{...getOverrideProps(overrides, 'founded')}
			></TextField>
			<TextField
				label="Home colour"
				isRequired={false}
				isReadOnly={false}
				value={home_colour}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							founded,
							home_colour: value,
							away_colour,
							division,
							team_captain,
							games_played,
						};
						const result = onChange(modelFields);
						value = result?.home_colour ?? value;
					}
					if (errors.home_colour?.hasError) {
						runValidationTasks('home_colour', value);
					}
					setHome_colour(value);
				}}
				onBlur={() => runValidationTasks('home_colour', home_colour)}
				errorMessage={errors.home_colour?.errorMessage}
				hasError={errors.home_colour?.hasError}
				{...getOverrideProps(overrides, 'home_colour')}
			></TextField>
			<TextField
				label="Away colour"
				isRequired={false}
				isReadOnly={false}
				value={away_colour}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							founded,
							home_colour,
							away_colour: value,
							division,
							team_captain,
							games_played,
						};
						const result = onChange(modelFields);
						value = result?.away_colour ?? value;
					}
					if (errors.away_colour?.hasError) {
						runValidationTasks('away_colour', value);
					}
					setAway_colour(value);
				}}
				onBlur={() => runValidationTasks('away_colour', away_colour)}
				errorMessage={errors.away_colour?.errorMessage}
				hasError={errors.away_colour?.hasError}
				{...getOverrideProps(overrides, 'away_colour')}
			></TextField>
			<SelectField
				label="Division"
				placeholder="Please select an option"
				isDisabled={false}
				value={division}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							founded,
							home_colour,
							away_colour,
							division: value,
							team_captain,
							games_played,
						};
						const result = onChange(modelFields);
						value = result?.division ?? value;
					}
					if (errors.division?.hasError) {
						runValidationTasks('division', value);
					}
					setDivision(value);
				}}
				onBlur={() => runValidationTasks('division', division)}
				errorMessage={errors.division?.errorMessage}
				hasError={errors.division?.hasError}
				{...getOverrideProps(overrides, 'division')}
			>
				<option
					children="D"
					value="D"
					{...getOverrideProps(overrides, 'divisionoption0')}
				></option>
				<option
					children="C"
					value="C"
					{...getOverrideProps(overrides, 'divisionoption1')}
				></option>
				<option
					children="B"
					value="B"
					{...getOverrideProps(overrides, 'divisionoption2')}
				></option>
				<option
					children="A"
					value="A"
					{...getOverrideProps(overrides, 'divisionoption3')}
				></option>
				<option
					children="Aa"
					value="AA"
					{...getOverrideProps(overrides, 'divisionoption4')}
				></option>
				<option
					children="Aaa"
					value="AAA"
					{...getOverrideProps(overrides, 'divisionoption5')}
				></option>
			</SelectField>
			<ArrayField
				onChange={async (items) => {
					let values = items;
					if (onChange) {
						const modelFields = {
							name,
							founded,
							home_colour,
							away_colour,
							division,
							team_captain: values,
							games_played,
						};
						const result = onChange(modelFields);
						values = result?.team_captain ?? values;
					}
					setTeam_captain(values);
					setCurrentTeam_captainValue('');
				}}
				currentFieldValue={currentTeam_captainValue}
				label={'Team captain'}
				items={team_captain}
				hasError={errors.team_captain?.hasError}
				setFieldValue={setCurrentTeam_captainValue}
				inputFieldRef={team_captainRef}
				defaultFieldValue={''}
			>
				<TextAreaField
					label="Team captain"
					isRequired={false}
					isReadOnly={false}
					value={currentTeam_captainValue}
					onChange={(e) => {
						let { value } = e.target;
						if (errors.team_captain?.hasError) {
							runValidationTasks('team_captain', value);
						}
						setCurrentTeam_captainValue(value);
					}}
					onBlur={() =>
						runValidationTasks('team_captain', currentTeam_captainValue)
					}
					errorMessage={errors.team_captain?.errorMessage}
					hasError={errors.team_captain?.hasError}
					ref={team_captainRef}
					labelHidden={true}
					{...getOverrideProps(overrides, 'team_captain')}
				></TextAreaField>
			</ArrayField>
			<TextField
				label="Games played"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={games_played}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value))
						? e.target.value
						: parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							name,
							founded,
							home_colour,
							away_colour,
							division,
							team_captain,
							games_played: value,
						};
						const result = onChange(modelFields);
						value = result?.games_played ?? value;
					}
					if (errors.games_played?.hasError) {
						runValidationTasks('games_played', value);
					}
					setGames_played(value);
				}}
				onBlur={() => runValidationTasks('games_played', games_played)}
				errorMessage={errors.games_played?.errorMessage}
				hasError={errors.games_played?.hasError}
				{...getOverrideProps(overrides, 'games_played')}
			></TextField>
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
					isDisabled={!(idProp || teams)}
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
							!(idProp || teams) ||
							Object.values(errors).some((e) => e?.hasError)
						}
						{...getOverrideProps(overrides, 'SubmitButton')}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
