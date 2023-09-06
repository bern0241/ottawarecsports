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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getLeague } from "../graphql/queries";
import { updateLeague } from "../graphql/mutations";
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
  runValidationTasks,
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
    const { hasError } = runValidationTasks();
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
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function LeagueUpdateForm(props) {
  const {
    id: idProp,
    league: leagueModelProp,
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
    cost_per_individual: "",
    cost_per_team: "",
    coordinators: [],
    description: "",
    number_of_periods: "",
    time_per_period: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [sport, setSport] = React.useState(initialValues.sport);
  const [date_founded, setDate_founded] = React.useState(
    initialValues.date_founded
  );
  const [cost_per_individual, setCost_per_individual] = React.useState(
    initialValues.cost_per_individual
  );
  const [cost_per_team, setCost_per_team] = React.useState(
    initialValues.cost_per_team
  );
  const [coordinators, setCoordinators] = React.useState(
    initialValues.coordinators
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [number_of_periods, setNumber_of_periods] = React.useState(
    initialValues.number_of_periods
  );
  const [time_per_period, setTime_per_period] = React.useState(
    initialValues.time_per_period
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = leagueRecord
      ? { ...initialValues, ...leagueRecord }
      : initialValues;
    setName(cleanValues.name);
    setSport(cleanValues.sport);
    setDate_founded(cleanValues.date_founded);
    setCost_per_individual(cleanValues.cost_per_individual);
    setCost_per_team(cleanValues.cost_per_team);
    setCoordinators(cleanValues.coordinators ?? []);
    setCurrentCoordinatorsValue("");
    setDescription(cleanValues.description);
    setNumber_of_periods(cleanValues.number_of_periods);
    setTime_per_period(cleanValues.time_per_period);
    setErrors({});
  };
  const [leagueRecord, setLeagueRecord] = React.useState(leagueModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getLeague,
              variables: { id: idProp },
            })
          )?.data?.getLeague
        : leagueModelProp;
      setLeagueRecord(record);
    };
    queryData();
  }, [idProp, leagueModelProp]);
  React.useEffect(resetStateValues, [leagueRecord]);
  const [currentCoordinatorsValue, setCurrentCoordinatorsValue] =
    React.useState("");
  const coordinatorsRef = React.createRef();
  const validations = {
    name: [],
    sport: [],
    date_founded: [],
    cost_per_individual: [],
    cost_per_team: [],
    coordinators: [],
    description: [],
    number_of_periods: [],
    time_per_period: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
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
          name: name ?? null,
          sport: sport ?? null,
          date_founded: date_founded ?? null,
          cost_per_individual: cost_per_individual ?? null,
          cost_per_team: cost_per_team ?? null,
          coordinators: coordinators ?? null,
          description: description ?? null,
          number_of_periods: number_of_periods ?? null,
          time_per_period: time_per_period ?? null,
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
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateLeague,
            variables: {
              input: {
                id: leagueRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LeagueUpdateForm")}
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
              cost_per_individual,
              cost_per_team,
              coordinators,
              description,
              number_of_periods,
              time_per_period,
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
              cost_per_individual,
              cost_per_team,
              coordinators,
              description,
              number_of_periods,
              time_per_period,
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
        value={date_founded && convertToLocal(new Date(date_founded))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded: value,
              cost_per_individual,
              cost_per_team,
              coordinators,
              description,
              number_of_periods,
              time_per_period,
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
              cost_per_individual: value,
              cost_per_team,
              coordinators,
              description,
              number_of_periods,
              time_per_period,
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
              cost_per_individual,
              cost_per_team: value,
              coordinators,
              description,
              number_of_periods,
              time_per_period,
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
              cost_per_individual,
              cost_per_team,
              coordinators: values,
              description,
              number_of_periods,
              time_per_period,
            };
            const result = onChange(modelFields);
            values = result?.coordinators ?? values;
          }
          setCoordinators(values);
          setCurrentCoordinatorsValue("");
        }}
        currentFieldValue={currentCoordinatorsValue}
        label={"Coordinators"}
        items={coordinators}
        hasError={errors?.coordinators?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("coordinators", currentCoordinatorsValue)
        }
        errorMessage={errors?.coordinators?.errorMessage}
        setFieldValue={setCurrentCoordinatorsValue}
        inputFieldRef={coordinatorsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Coordinators"
          isRequired={false}
          isReadOnly={false}
          value={currentCoordinatorsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.coordinators?.hasError) {
              runValidationTasks("coordinators", value);
            }
            setCurrentCoordinatorsValue(value);
          }}
          onBlur={() =>
            runValidationTasks("coordinators", currentCoordinatorsValue)
          }
          errorMessage={errors.coordinators?.errorMessage}
          hasError={errors.coordinators?.hasError}
          ref={coordinatorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "coordinators")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded,
              cost_per_individual,
              cost_per_team,
              coordinators,
              description: value,
              number_of_periods,
              time_per_period,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Number of periods"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={number_of_periods}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded,
              cost_per_individual,
              cost_per_team,
              coordinators,
              description,
              number_of_periods: value,
              time_per_period,
            };
            const result = onChange(modelFields);
            value = result?.number_of_periods ?? value;
          }
          if (errors.number_of_periods?.hasError) {
            runValidationTasks("number_of_periods", value);
          }
          setNumber_of_periods(value);
        }}
        onBlur={() =>
          runValidationTasks("number_of_periods", number_of_periods)
        }
        errorMessage={errors.number_of_periods?.errorMessage}
        hasError={errors.number_of_periods?.hasError}
        {...getOverrideProps(overrides, "number_of_periods")}
      ></TextField>
      <TextField
        label="Time per period"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={time_per_period}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              sport,
              date_founded,
              cost_per_individual,
              cost_per_team,
              coordinators,
              description,
              number_of_periods,
              time_per_period: value,
            };
            const result = onChange(modelFields);
            value = result?.time_per_period ?? value;
          }
          if (errors.time_per_period?.hasError) {
            runValidationTasks("time_per_period", value);
          }
          setTime_per_period(value);
        }}
        onBlur={() => runValidationTasks("time_per_period", time_per_period)}
        errorMessage={errors.time_per_period?.errorMessage}
        hasError={errors.time_per_period?.hasError}
        {...getOverrideProps(overrides, "time_per_period")}
      ></TextField>
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
          isDisabled={!(idProp || leagueModelProp)}
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
              !(idProp || leagueModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
