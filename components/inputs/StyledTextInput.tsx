import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import Colors from "../../config/Colors";
import { InputProps } from "./types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "../texts/SmallText";

const InputWrapper = styled.View`
  width: 100%;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${Colors.secondary};
  padding-right: 10px;
`;

const InputField = styled.TextInput`
  background-color: ${Colors.primary};
  height: 60px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${Colors.secondary};
  margin-vertical: 3px;
  margin-bottom: 10px;
  padding: 15px;
  padding-left: 65px;
  padding-right: 55px;
  font-size: 16px;
  color: ${Colors.black};
`;

const StyledTextInput: FunctionComponent<InputProps> = ({
  icon,
  label,
  ...props
}) => {
  return (
    <InputWrapper>
      <LeftIcon>
        <MaterialCommunityIcons name={icon} size={30} color={Colors.accent} />
      </LeftIcon>
      <SmallText style={{ padding: "1%" }}>{label}</SmallText>
      <InputField
        placeholderTextColor={Colors.gray}
        style={[{ backgroundColor: Colors.light }, props.style]}
      />
    </InputWrapper>
  );
};

export default StyledTextInput;
