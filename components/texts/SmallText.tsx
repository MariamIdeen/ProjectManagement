import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import Colors from "../../config/Colors";
import { TextProps } from "./types";

const StyledText = styled.Text`
  font-size: 13px;
  color: ${Colors.black};
  text-align: left;
`;

const SmallText: FunctionComponent<TextProps> = (props) => {
  return <StyledText style={props.style}>{props.children}</StyledText>;
};

export default SmallText;
