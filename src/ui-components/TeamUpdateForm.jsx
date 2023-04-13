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
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Team } from "../models";
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
          <Button
            size="small"
            variation="link"
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
export default function TeamUpdateForm(props) {
  const {
    id: idProp,
    team,
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
    founded: "",
    home_colour: "",
    away_colour: "",
    team_history: [],
    team_picture: "",
    captains: [],
    sport: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [founded, setFounded] = React.useState(initialValues.founded);
  const [home_colour, setHome_colour] = React.useState(
    initialValues.home_colour
  );
  const [away_colour, setAway_colour] = React.useState(
    initialValues.away_colour
  );
  const [team_history, setTeam_history] = React.useState(
    initialValues.team_history
  );
  const [team_picture, setTeam_picture] = React.useState(
    initialValues.team_picture
  );
  const [captains, setCaptains] = React.useState(initialValues.captains);
  const [sport, setSport] = React.useState(initialValues.sport);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = teamRecord
      ? { ...initialValues, ...teamRecord }
      : initialValues;
    setName(cleanValues.name);
    setFounded(cleanValues.founded);
    setHome_colour(cleanValues.home_colour);
    setAway_colour(cleanValues.away_colour);
    setTeam_history(cleanValues.team_history ?? []);
    setCurrentTeam_historyValue("");
    setTeam_picture(cleanValues.team_picture);
    setCaptains(cleanValues.captains ?? []);
    setCurrentCaptainsValue("");
    setSport(cleanValues.sport);
    setErrors({});
  };
  const [teamRecord, setTeamRecord] = React.useState(team);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Team, idProp) : team;
      setTeamRecord(record);
    };
    queryData();
  }, [idProp, team]);
  React.useEffect(resetStateValues, [teamRecord]);
  const [currentTeam_historyValue, setCurrentTeam_historyValue] =
    React.useState("");
  const team_historyRef = React.createRef();
  const [currentCaptainsValue, setCurrentCaptainsValue] = React.useState("");
  const captainsRef = React.createRef();
  const validations = {
    name: [],
    founded: [],
    home_colour: [],
    away_colour: [],
    team_history: [{ type: "JSON" }],
    team_picture: [],
    captains: [],
    sport: [],
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
          name,
          founded,
          home_colour,
          away_colour,
          team_history,
          team_picture,
          captains,
          sport,
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
            Team.copyOf(teamRecord, (updated) => {
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
      {...getOverrideProps(overrides, "TeamUpdateForm")}
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
              founded,
              home_colour,
              away_colour,
              team_history,
              team_picture,
              captains,
              sport,
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
        label="Founded"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={founded && convertToLocal(new Date(founded))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              name,
              founded: value,
              home_colour,
              away_colour,
              team_history,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.founded ?? value;
          }
          if (errors.founded?.hasError) {
            runValidationTasks("founded", value);
          }
          setFounded(value);
        }}
        onBlur={() => runValidationTasks("founded", founded)}
        errorMessage={errors.founded?.errorMessage}
        hasError={errors.founded?.hasError}
        {...getOverrideProps(overrides, "founded")}
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
              team_history,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.home_colour ?? value;
          }
          if (errors.home_colour?.hasError) {
            runValidationTasks("home_colour", value);
          }
          setHome_colour(value);
        }}
        onBlur={() => runValidationTasks("home_colour", home_colour)}
        errorMessage={errors.home_colour?.errorMessage}
        hasError={errors.home_colour?.hasError}
        {...getOverrideProps(overrides, "home_colour")}
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
              team_history,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.away_colour ?? value;
          }
          if (errors.away_colour?.hasError) {
            runValidationTasks("away_colour", value);
          }
          setAway_colour(value);
        }}
        onBlur={() => runValidationTasks("away_colour", away_colour)}
        errorMessage={errors.away_colour?.errorMessage}
        hasError={errors.away_colour?.hasError}
        {...getOverrideProps(overrides, "away_colour")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour,
              team_history: values,
              team_picture,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            values = result?.team_history ?? values;
          }
          setTeam_history(values);
          setCurrentTeam_historyValue("");
        }}
        currentFieldValue={currentTeam_historyValue}
        label={"Team history"}
        items={team_history}
        hasError={errors?.team_history?.hasError}
        errorMessage={errors?.team_history?.errorMessage}
        setFieldValue={setCurrentTeam_historyValue}
        inputFieldRef={team_historyRef}
        defaultFieldValue={""}
      >
        <TextAreaField
          label="Team history"
          isRequired={false}
          isReadOnly={false}
          value={currentTeam_historyValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.team_history?.hasError) {
              runValidationTasks("team_history", value);
            }
            setCurrentTeam_historyValue(value);
          }}
          onBlur={() =>
            runValidationTasks("team_history", currentTeam_historyValue)
          }
          errorMessage={errors.team_history?.errorMessage}
          hasError={errors.team_history?.hasError}
          ref={team_historyRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "team_history")}
        ></TextAreaField>
      </ArrayField>
      <TextField
        label="Team picture"
        isRequired={false}
        isReadOnly={false}
        value={team_picture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour,
              team_history,
              team_picture: value,
              captains,
              sport,
            };
            const result = onChange(modelFields);
            value = result?.team_picture ?? value;
          }
          if (errors.team_picture?.hasError) {
            runValidationTasks("team_picture", value);
          }
          setTeam_picture(value);
        }}
        onBlur={() => runValidationTasks("team_picture", team_picture)}
        errorMessage={errors.team_picture?.errorMessage}
        hasError={errors.team_picture?.hasError}
        {...getOverrideProps(overrides, "team_picture")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              founded,
              home_colour,
              away_colour,
              team_history,
              team_picture,
              captains: values,
              sport,
            };
            const result = onChange(modelFields);
            values = result?.captains ?? values;
          }
          setCaptains(values);
          setCurrentCaptainsValue("");
        }}
        currentFieldValue={currentCaptainsValue}
        label={"Captains"}
        items={captains}
        hasError={errors?.captains?.hasError}
        errorMessage={errors?.captains?.errorMessage}
        setFieldValue={setCurrentCaptainsValue}
        inputFieldRef={captainsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Captains"
          isRequired={false}
          isReadOnly={false}
          value={currentCaptainsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.captains?.hasError) {
              runValidationTasks("captains", value);
            }
            setCurrentCaptainsValue(value);
          }}
          onBlur={() => runValidationTasks("captains", currentCaptainsValue)}
          errorMessage={errors.captains?.errorMessage}
          hasError={errors.captains?.hasError}
          ref={captainsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "captains")}
        ></TextField>
      </ArrayField>
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
              founded,
              home_colour,
              away_colour,
              team_history,
              team_picture,
              captains,
              sport: value,
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
          isDisabled={!(idProp || team)}
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
              !(idProp || team) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
