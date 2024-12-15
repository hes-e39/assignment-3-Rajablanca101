import React from 'react';
import styled from 'styled-components';

import DocumentComponent from '../components/documentation/DocumentComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
      </div>
    </Container>
  );
};

export default Documentation;
