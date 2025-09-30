import clsx from "clsx";
import styles from "./button.module.scss";

type ButtonProps = React.JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "danger" | "success";
};

export const Button = (props: ButtonProps) => {
  const { variant = "primary", children, className, ...rest } = props;

  return (
    <button
      className={clsx(styles.button, styles[`button--${variant}`], className)}
      {...rest}
    >
      {children}
    </button>
  );
};
