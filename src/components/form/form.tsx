import useForm from "../../hooks/useForm";
import validators from "../../lib/validators";
import ColorPicker from "../color/picker";
import RangeSlider from "../slider/rangeSlider";
import IconClose from "../svg/close";
import FormElement from "./formElement";

type Props = {
  onClose: () => void;
};

const Form = ({ onClose }: Props) => {
  const { fields, values, errors, isValid } = useForm({
    name: {
      label: "name",
      validate: (value: string) => (!value ? ["Please enter a name"] : []),
    },
    email: { label: "Email Address", validate: validators.email },
    salary: {
      label: "salary",
      validate: ([min, max]: [number, number]) =>
        max >= min ? [] : ["Please enter a valid range number range."],
    },
    birth: {
      label: "Birth",
      validate: validators.date,
    },
    color: {
      label: "Color",
      validate: (v: string) =>
        typeof v === "string" ? [] : ["Please enter a color"],
    },
  });

  const name = (
    <FormElement
      label={fields.name.label}
      errors={errors?.name || []}
      labelHtmlFor="name"
    >
      <input
        id="name"
        value={values?.name || ""}
        onChange={(e) => fields.name.setValue(e.currentTarget.value)}
        onBlur={() => fields.name.setValue(values?.name || "")}
      />
    </FormElement>
  );

  const email = (
    <FormElement
      label={fields.email.label}
      errors={errors?.email || []}
      labelHtmlFor="email"
    >
      <input
        id="email"
        value={values?.email}
        onChange={(e) => fields.email.setValue(e.currentTarget.value)}
        onBlur={() => fields.email.setValue(values?.email || "")}
      />
    </FormElement>
  );

  const salary = (
    <FormElement
      label={fields.salary.label}
      errors={errors?.salary || []}
      labelHtmlFor="salary"
    >
      <RangeSlider
        label="salary"
        value={values?.salary || [80000, 140000]}
        minValue={20000}
        maxValue={200000}
        format={{ style: "currency", currency: "GBP" }}
        onChange={(v) => fields.salary.setValue(v as [number, number])}
      />
    </FormElement>
  );

  const birth = (
    <FormElement
      label={fields.birth.label}
      errors={errors?.birth}
      labelHtmlFor="input"
    >
      <input
        type="date"
        value={values?.birth}
        onBlur={() => fields.birth.setValue(values?.birth || "")}
        onChange={(e) => fields.birth.setValue(e.currentTarget.value)}
      />
    </FormElement>
  );

  const color = (
    <FormElement
      label={fields.color.label}
      errors={errors?.color}
      labelHtmlFor="color"
    >
      <ColorPicker
        value={values?.color || "hsl(0, 100%, 50%)"}
        onChange={(value) => fields.color.setValue(value)}
      />
    </FormElement>
  );
  return (
    <div style={{ display: "flex" }}>
      <div style={{ cursor: "pointer" }} onClick={() => onClose()}>
        <IconClose fill="#ccc" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexDirection: "column",
          color: "#ccc",

          justifyContent: "space-around",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-around", flex: 1 }}
        >
          {name}
          {email}
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-around", flex: 1 }}
        >
          {birth}
          {salary}
        </div>
        {color}
        {
          <button
            disabled={!isValid}
            onClick={() => alert(JSON.stringify(values))}
          >
            Submit
          </button>
        }
      </form>
    </div>
  );
};

export default Form;
