import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import Select from "react-select";
import { StyledForm } from "./form.styles";

type DepartmentType = {
  value: string;
  label: string;
};

type FormValues = {
  name: string;
  username: string;
  password: string;
  department: DepartmentType[];
  gender: string;
};

const departments = [
  { value: "Science", label: "Science" },
  { value: "Biology", label: "Biology" },
  { value: "History", label: "History" },
  { value: "Mathematics", label: "Mathematics" },
];

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "John Doe",
      username: "johndoe",
    },
  });

  const [data, setData] = useState<FormValues>({
    name: "",
    username: "",
    password: "",
    department: [{ value: "", label: "" }],
    gender: "",
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    setData(data);

    reset({
      name: "",
      username: "",
      password: "",
      department: [],
      gender: "female",
    });
  };

  return (
    <StyledForm>
      <Typography className="heading">React Hook Form</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="form-container">
          <TextField
            className="input-field"
            label="Name"
            {...register("name", {
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters",
              },
              maxLength: {
                value: 10,
                message: "Name should be at most 10 characters",
              },
            })}
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
          <TextField
            className="input-field"
            label="Username"
            {...register("username", {
              required: "Username is required",
              maxLength: {
                value: 10,
                message: "Username should be at most 10 characters",
              },
            })}
          />
          {errors.username && (
            <p className="error-msg">{errors.username.message}</p>
          )}
          <TextField
            className="input-field"
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password should be at-least 8 characters.",
              },
            })}
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}

          <Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                className="input-field"
                {...field}
                isMulti
                options={departments}
              />
            )}
          />

          <section className="input-field">
            <label>Select Gender</label>
            <Controller
              name="gender"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              )}
              control={control}
              rules={{ required: "Gender is required" }}
            />
          </section>
          {errors.gender && (
            <p className="error-msg">{errors.gender.message}</p>
          )}

          <Button
            type="submit"
            className="submit"
            variant="contained"
            size="large"
          >
            Submit
          </Button>

          <Typography className="normal-text">
            Data: {JSON.stringify(data)}
          </Typography>
        </Box>
      </form>
    </StyledForm>
  );
};

export default Form;
