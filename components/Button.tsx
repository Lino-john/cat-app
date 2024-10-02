import Colors from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonType = "primary" | "secondary";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  textColor?: string;
  disabled?: boolean; // Add the disabled prop
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = "primary",
  textColor = "#fff",
  disabled = false, // Default value for disabled is false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled, // Apply disabled style
      ]}
      onPress={disabled ? undefined : onPress} // Prevent onPress when disabled
      activeOpacity={disabled ? 1 : 0.7} // Change active opacity when disabled
    >
      <Text
        style={[
          styles.buttonText,
          { color: disabled ? Colors.gray : textColor },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  primary: {
    backgroundColor: Colors.green,
  },
  secondary: {
    backgroundColor: Colors.blue,
  },
  disabled: {
    backgroundColor: Colors.lightGray, // Add a light gray background for disabled state
  },
  buttonText: {
    fontSize: 18,
    textTransform: "none",
  },
});

export default Button;
