import { useMemo, useState } from "react";

type Field = {
  label: string;
  description?: string;
  placeholder?: string;
};

type FieldSchema<T extends unknown> = Field & {
  validate: (value: T) => readonly string[];
};

type FieldOutput<T extends unknown> = Field & {
  errors: readonly string[];
  setValue: (value: T) => void;
};

type OutputSchema<T extends Record<string, FieldSchema<any>>> = {
  [K in keyof T]: T[K] extends FieldSchema<infer V> ? FieldOutput<V> : never;
};

type Values<T extends Record<string, FieldSchema<any>>> = {
  [K in keyof T]: T[K] extends FieldSchema<infer V> ? V : never;
};

type Errors<T extends Record<string, unknown>> = {
  [K in keyof T]: readonly string[];
};

function useForm<T extends Record<string, FieldSchema<any>>>(fields: T) {
  const [values, setValues] = useState<Values<T>>();
  const [errors, setErrors] = useState<Errors<T>>();

  const output = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(fields).map(
          ([key, { label, description, placeholder, validate }]) => [
            key,
            {
              label,
              description,
              placeholder,
              setValue: (v) => {
                setValues((values) => ({ ...values, [key]: v } as Values<T>));
                setErrors(
                  (errors) => ({ ...errors, [key]: validate(v) } as Errors<T>)
                );
              },
            },
          ]
        )
      ) as OutputSchema<T>,
    [fields]
  );

  const isValid =
    (!errors || Object.values(errors).every((v) => v.length === 0)) &&
    values &&
    Object.keys(fields).every((k) => values[k] !== undefined);

  return {
    fields: output,
    values,
    errors,
    isValid,
  } as const;
}

export default useForm;
