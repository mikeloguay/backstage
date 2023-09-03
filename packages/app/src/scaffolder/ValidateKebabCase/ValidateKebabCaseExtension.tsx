import React from 'react';
import { FieldValidation } from '@rjsf/core';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, Input, FormHelperText } from '@material-ui/core';
import { z } from 'zod';
import { makeFieldSchemaFromZod } from '@backstage/plugin-scaffolder';

const ValidateKebabCaseFieldSchema = makeFieldSchemaFromZod(
    z.string(),
  );
  
export const ValidateKebabCaseSchema = ValidateKebabCaseFieldSchema.schema;
type ValidateKebabCaseSchemaProps = typeof ValidateKebabCaseFieldSchema.type;

/*
 This is the actual component that will get rendered in the form
*/
export const ValidateKebabCase = ({
  onChange,
  rawErrors,
  required,
  formData,
}: ValidateKebabCaseSchemaProps) => {
  return (
    <FormControl
      margin="normal"
      required={required}
      error={rawErrors?.length > 0 && !formData}
    >
      <InputLabel htmlFor="validateName">Name</InputLabel>
      <Input
        id="validateName"
        aria-describedby="entityName"
        onChange={e => onChange(e.target?.value)}
      />
      <FormHelperText id="entityName">
        Use only letters, numbers, hyphens and underscores
      </FormHelperText>
    </FormControl>
  );
};

/*
 This is a validation function that will run when the form is submitted.
  You will get the value from the `onChange` handler before as the value here to make sure that the types are aligned\
*/

export const validateKebabCaseValidation = (
  value: string,
  validation: FieldValidation,
) => {
  const kebabCase = /^[a-z0-9-_]+$/g.test(value);

  if (kebabCase === false) {
    validation.addError(
      `Only use letters, numbers, hyphen ("-") and underscore ("_").`,
    );
  }
};