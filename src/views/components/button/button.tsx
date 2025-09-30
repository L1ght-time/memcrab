import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonProps = React.JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "danger" | "success";
  Icon?: React.JSX.ElementType;
};

export const Button = (props: ButtonProps) => {
  const { variant = "primary", Icon, children, className, ...rest } = props;

  return (
    <button
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        { [styles.withIcon]: Icon },
        className
      )}
      {...rest}
    >
      {Icon && <Icon />}
      <span>{children}</span>
    </button>
  );
};
