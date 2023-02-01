import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import Colors from "../../config/Colors";
import { ContainerProps } from "./types";

const StyledView = styled.View`
  flex: 1;
  padding: "5%";
  padding-top: "10%";
  background-color: ${Colors.white};
  justifycontainer: center;
`;

const MainContainer: FunctionComponent<ContainerProps> = (props) => {
  return <StyledView style={props.style}>{props.children}</StyledView>;
};

export default MainContainer;
