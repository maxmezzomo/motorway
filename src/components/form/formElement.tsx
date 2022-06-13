import { HTMLProps } from "react";

type Props = {
  readonly labelHtmlFor: string;
  readonly label: string;
  readonly description?: string;
  readonly errors: readonly string[] | undefined;
};

const FormElement = ({
  labelHtmlFor: name,
  label,
  description,
  errors = [],
  style,
  children,
  ...props
}: Props & HTMLProps<HTMLDivElement>) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        // padding: "2em",
        margin: 15,
        ...style,
      }}
      {...props}
    >
      <label htmlFor={name} style={{ margin: 5 }}>
        {label}
      </label>
      {children}
      <div style={{ color: "#dd0000", padding: 6 }}>
        {errors && errors.map((e) => e)}
      </div>
    </div>
  );
};

export default FormElement;
