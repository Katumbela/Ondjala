import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container className="text-center">
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          {/* <img src={notFoundImage} alt="404 Not Found" className="img-fluid" /> */}
          <h2 className="mt-4">Oops! Página não encontrada.</h2>
          <p>A página que você está procurando não foi encontrada.</p>
          <Link to="/pt/">
            <Button variant="primary">Voltar à página inicial</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
