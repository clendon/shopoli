import React from 'react';
import styled from "styled-components";

const RelatedStyle = styled.div`
  background-color: LightGray;
  margin-left: auto;
  margin-right: auto;
`;

const Related = () => {

  return (
    <>
      <RelatedStyle>
        <h1>Related Items</h1>
      </RelatedStyle>
    </>
  );
}

export default Related;