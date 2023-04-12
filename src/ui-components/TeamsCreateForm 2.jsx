/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Teams } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function TeamsCreateForm(props) {
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
    name: "",
    founded: "",
    home_colour: "",
    away_colour: "",
    team_picture: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [founded, setFounded] = React.useState(initialValues.founded);
  const [home_colour, setHome_colour] = React.useState(
    initialValues.home_colour
  );
  const [away_colour, setAway_colour] = React.useState(
    initialValues.away_colour
  );
  const [team_picture, setTeam_picture] = React.useState(
    initialValues.team_picture
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setFounded(initialValues.founded);
    setHome_colour(initialValues.home_colour);
    setAway_colour(initialValues.away_colour);
    setTeam_picture(initialValues.team_picture);
    setErrors({});
  };
  const validations = {
    name: [],
    founded: [],
    home_colour: [],
    away_colour: [],
    team_picture: [],
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
          founded,
          home_colour,
          away_colour,
          team_picture,
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
          await DataStore.save(new Teams(modelFields));
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
      {...getOverrideProps(overrides, "TeamsCreateForm")}
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
              team_picture,
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
        value={founded && convertToLocal(convertTimeStampToDate(founded))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : Number(new Date(e.target.value));
          if (onChange) {
            const modelFields = {
              name,
              founded: value,
              home_colour,
              away_colour,
              team_picture,
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
              team_picture,
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
              team_picture,
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
              team_picture: value,
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
