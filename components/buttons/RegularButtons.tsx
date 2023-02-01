import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import Colors from "../../config/Colors";
import { ButtonProps } from "./types";
import RegularText from "../texts/RegularText";

const ButtonView = styled.TouchableOpacity`
  width: 100%;
  height: 60%;
  padding: "15px";
  padding-top: "10px";
  background-color: ${Colors.primary};
  justify-container: center;
  border-radius: 15px;
  align-item: center;
`;

const RegularButtons: FunctionComponent<ButtonProps> = (props) => {
  return (
    <ButtonView style={props.style} onPress={props.onPress}>
      <RegularText>{props.children}</RegularText>
    </ButtonView>
  );
};

export default RegularButtons;
