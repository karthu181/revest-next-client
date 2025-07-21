"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid
} from "@mui/material";



interface FormField {
  id: string | number
  name: string;
  fieldType: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  defaultValue?: any;
  listOfValues1?: string[];
}

export default function DynamicForm({formData}: {formData:FormField[]}) {

  const defaultValues = formData.reduce((acc, field) => {
  const value =
    field.fieldType === "RADIO" || field.fieldType === "LIST"
      ? field.listOfValues1?.[Number(field.defaultValue) - 1] ?? ""
      : field.defaultValue ?? "";

  acc[field.name] = value;
  return acc;
}, {} as Record<string, any>);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({defaultValues});

  const onSubmit = (data: any) => {
    console.log(data)
    localStorage.setItem("formData", JSON.stringify(data));
  };

  const getValidationRules = (field:FormField) => {
  const rules: any = {};

  if (field.required) {
    rules.required = `${field.name} is required.`;
  }

  if (field.name.toLowerCase().includes('email')) {
    rules.pattern = {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Please enter a valid email address.'
    };
  }

  if(field.fieldType === "TEXT") {
    if (field.minLength) {
      //when requiereed is not set, minLength can still be set
      rules.minLength = {
        value: field.minLength,
        message: `${field.name} must be at least ${field.minLength} characters long.`,
      };
    }
    if (field.maxLength) {
      rules.maxLength = {
        value: field.maxLength,
        message: `${field.name} must be at most ${field.maxLength} characters long.`,
      };
    }
  }

  return rules;
};


useEffect(() => {
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    reset(JSON.parse(savedData));
  }
}, [reset]);


  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-accent">
       <Paper elevation={10} sx={{ p: 4, borderRadius: 2, mx:3, maxWidth: 600 }}>
        <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" gutterBottom>
        Signup Form
      </Typography>
     <Grid container spacing={2}>
      {formData.map((field:FormField) => {
        const defaultVal =
          field.fieldType === "RADIO" || field.fieldType === "LIST"
            ? field.listOfValues1?.[Number(field.defaultValue) - 1] ?? ""
            : field.defaultValue ?? "";
        return (
          <Grid size={{ xs: 12 }} key={field.name}>
          <FormControl
            key={field.name}
            fullWidth
            margin="normal"
            required={field.required}
            variant="outlined"
            component="fieldset"
            error={Boolean(errors[field.name])}
          >
        
            <Controller
              name={field.name}
              control={control}
              // defaultValue={defaultVal}
              rules={getValidationRules(field)}
              render={({ field: controllerField }) => {
                switch (field.fieldType) {
                  case "TEXT":
                    return (
                      <TextField
                        {...controllerField}
                        fullWidth
                        label={field.name}
                        error={Boolean(errors[field.name])}
                        helperText={errors[field.name]?.message as string}
                      />
                    );

                  case "RADIO":
                    return (
                      <>
                      <FormLabel id={`${field.name}-label`}>{field.name}</FormLabel>
                      <RadioGroup
                        row
                        {...controllerField}
                        onChange={(e) =>
                          controllerField.onChange(e.target.value)
                        }

                      
                      >
                        {field.listOfValues1?.map((option: string) => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        ))}
                      </RadioGroup>
                      </>
                    );

                  case "LIST":
                    return (
                      <>
                       <InputLabel id={`${field.name}-label`}>{field.name}</InputLabel>
                      <Select
                        {...controllerField}
                        labelId={`${field.name}-label`}
                        label={field.name}
                        onChange={(e) =>
                          controllerField.onChange(e.target.value)
                        }
                        displayEmpty
                      >
                        {field.listOfValues1?.map(
                          (option: string, idx: number) => (
                            <MenuItem key={idx} value={option}>
                              {option}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      </>
                    );

                  default:
                    return <></>;
                }
              }}
            />

            {/* {errors[field.name] && (
              <Typography color="error" variant="body2">
                {errors[field.name]?.message as string}
              </Typography>
            )} */}
          </FormControl>
          </Grid>
        );
      })}
      <Grid size={{ xs: 12 }} sx={{justifyContent: "center", display: "flex"}}>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      </Grid>
      </Grid>
      </form>
      </Paper>
    </div>
  );
}
