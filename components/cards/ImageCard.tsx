import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Colors from "../../config/Colors";
import { CardProps } from "./types";

const StyledView = styled.TouchableOpacity`
  background-color: ${Colors.white};
  elevation: 1;
  border-radius: 15px;
  width: 225px;
  margin: 2px;
  padding: 2px;
  max-height: 280px;
  margin-top: 10px;
`;

const ImageCard: FunctionComponent<CardProps> = (props) => {
  return (
    <StyledView style={props.style} onPress={props.onPress}>
      {props.children}
    </StyledView>
  );
};

export default ImageCard;
