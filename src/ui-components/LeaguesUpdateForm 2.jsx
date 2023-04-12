/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
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
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Leagues } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
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
      currentFieldValue !== "" &&
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
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
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
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
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
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function LeaguesUpdateForm(props) {
  const {
    id: idProp,
    leagues,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    sport: "",
    date_founded: "",
    gender: undefined,
    cost_per_individual: "",
    cost_per_team: "",
    coordinator: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [sport, setSport] = React.useState(initialValues.sport);
  const [date_founded, setDate_founded] = React.useState(
    initialValues.date_founded
  );
  const [gender, setGender] = React.useState(initialValues.gender);
  const [cost_per_individual, setCost_per_individual] = React.useState(
    initialValues.cost_per_individual
  );
  const [cost_per_team, setCost_per_team] = React.useState(
    initialValues.cost_per_team
  );
  const [coordinator, setCoordinator] = React.useState(
    initialValues.coordinator
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = leaguesRecord
      ? { ...initialValues, ...leaguesRecord }
      : initialValues;
    setName(cleanValues.name);
    setSport(cleanValues.sport);
    setDate_founded(cleanValues.date_founded);
    setGender(cleanValues.gender);
    setCost_per_individual(cleanValues.cost_per_individual);
    setCost_per_team(cleanValues.cost_per_team);
    setCoordinator(cleanValues.coordinator ?? []);
    setCurrentCoordinatorValue("");
    setErrors({});
  };
  const [leaguesRecord, setLeaguesRecord] = React.useState(leagues);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Leagues, idProp) : leagues;
      setLeaguesRecord(record);
    };
    queryData();
  }, [idProp, leagues]);
  React.useEffect(resetStateValues, [leaguesRecord]);
  const [currentCoordinatorValue, setCurrentCoordinatorValue] =
    React.useState("");
  const coordinatorRef = React.createRef();
  const validations = {
    name: [],
    sport: [],
    date_founded: [],
    gender: [],
    cost_per_individual: [],
    cost_per_team: [],
    coordinator: [],
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
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
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
          sport,
          date_founded,
          gender,
          cost_per_individual,
          cost_per_team,
          coordinator,
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
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Leagues.copyOf(leaguesRecord, (updated) => {
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
      {...getOverrideProps(overrides, "LeaguesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              sport,
              date_founded,
              gender,
              cost_per_individual,
              cost_per_team,
              coordinator,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Sport"
        isRequired={false}
        isReadOnly={false}
        value={sport}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              sport: value,
              date_founded,
              gender,
              cost_per_individual,
              cost_per_team,
              coordinator,
            };
            const result = onChange(modelFields);
            value = result?.sport ?? value;
          }
          if (errors.sport?.hasError) {
            runValidationTasks("sport", value);
          }
          setSport(value);
        }}
        onBlur={() => runValidationTasks("sport", sport)}
        errorMessage={errors.sport?.errorMessage}
        hasError={errors.sport?.hasError}
        {...getOverrideProps(overrides, "sport")}
      ></TextField>
      <TextField
        label="Date founded"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={
          date_founded && convertToLocal(convertTimeStampToDate(date_founded))
        }
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : Number(new Date(e.target.value));
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded: value,
              gender,
              cost_per_individual,
              cost_per_team,
              coordinator,
            };
            const result = onChange(modelFields);
            value = result?.date_founded ?? value;
          }
          if (errors.date_founded?.hasError) {
            runValidationTasks("date_founded", value);
          }
          setDate_founded(value);
        }}
        onBlur={() => runValidationTasks("date_founded", date_founded)}
        errorMessage={errors.date_founded?.errorMessage}
        hasError={errors.date_founded?.hasError}
        {...getOverrideProps(overrides, "date_founded")}
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
              name,
              sport,
              date_founded,
              gender: value,
              cost_per_individual,
              cost_per_team,
              coordinator,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      >
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "genderoption0")}
        ></option>
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "genderoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Cost per individual"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cost_per_individual}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded,
              gender,
              cost_per_individual: value,
              cost_per_team,
              coordinator,
            };
            const result = onChange(modelFields);
            value = result?.cost_per_individual ?? value;
          }
          if (errors.cost_per_individual?.hasError) {
            runValidationTasks("cost_per_individual", value);
          }
          setCost_per_individual(value);
        }}
        onBlur={() =>
          runValidationTasks("cost_per_individual", cost_per_individual)
        }
        errorMessage={errors.cost_per_individual?.errorMessage}
        hasError={errors.cost_per_individual?.hasError}
        {...getOverrideProps(overrides, "cost_per_individual")}
      ></TextField>
      <TextField
        label="Cost per team"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={cost_per_team}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded,
              gender,
              cost_per_individual,
              cost_per_team: value,
              coordinator,
            };
            const result = onChange(modelFields);
            value = result?.cost_per_team ?? value;
          }
          if (errors.cost_per_team?.hasError) {
            runValidationTasks("cost_per_team", value);
          }
          setCost_per_team(value);
        }}
        onBlur={() => runValidationTasks("cost_per_team", cost_per_team)}
        errorMessage={errors.cost_per_team?.errorMessage}
        hasError={errors.cost_per_team?.hasError}
        {...getOverrideProps(overrides, "cost_per_team")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded,
              gender,
              cost_per_individual,
              cost_per_team,
              coordinator: values,
            };
            const result = onChange(modelFields);
            values = result?.coordinator ?? values;
          }
          setCoordinator(values);
          setCurrentCoordinatorValue("");
        }}
        currentFieldValue={currentCoordinatorValue}
        label={"Coordinator"}
        items={coordinator}
        hasError={errors.coordinator?.hasError}
        setFieldValue={setCurrentCoordinatorValue}
        inputFieldRef={coordinatorRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Coordinator"
          isRequired={false}
          isReadOnly={false}
          value={currentCoordinatorValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.coordinator?.hasError) {
              runValidationTasks("coordinator", value);
            }
            setCurrentCoordinatorValue(value);
          }}
          onBlur={() =>
            runValidationTasks("coordinator", currentCoordinatorValue)
          }
          errorMessage={errors.coordinator?.errorMessage}
          hasError={errors.coordinator?.hasError}
          ref={coordinatorRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "coordinator")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || leagues)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || leagues) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
