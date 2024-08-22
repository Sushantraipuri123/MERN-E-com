import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CategoriesBlock.css'
function CategoriesBlock() {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/product/${category}`);
  };

  return (
    <div className="my-4 container-fluid">
      <h5 className="text-center text-muted mt-4">Follow the most popular trends</h5>
      <h2 className='Urbanish mt-3 mb-5 text-center'>Explore top categories</h2>
      <Row>
        <Col  className="mb-4">
          <Card className=" category-card text-center" onClick={() => handleCardClick('Accessories')}>
            <Card.Body>
              <Card.Title>Accessories</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className="category-card text-center" onClick={() => handleCardClick('mens-shoes')}>
            <Card.Body>
              <Card.Title>Mens Shoes</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className="category-card text-center" onClick={() => handleCardClick('mens-upperwares')}>
            <Card.Body>
              <Card.Title>Mens Upperwares</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className="category-card text-center" onClick={() => handleCardClick('mens-lowerwares')}>
            <Card.Body>
              <Card.Title>Mens Lowerwares</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

<div className="my-4 ">
  <hr />
</div>
      <Row className='mt-2'>
        <Col  className="mb-4">
          <Card className=" h-100 category-card text-center" onClick={() => handleCardClick('jewellery')}>
            <Card.Body>
              <Card.Title>Jewellery</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className=" h-100 category-card text-center" onClick={() => handleCardClick('womens-shoes')}>
            <Card.Body>
              <Card.Title>Womens Shoes</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className="h-100 category-card text-center" onClick={() => handleCardClick('womens-upperwares')}>
            <Card.Body>
              <Card.Title>Womens Upperwares</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card className=" h-100 category-card text-center" onClick={() => handleCardClick('womens-lowerwares')}>
            <Card.Body>
              <Card.Title>Womens Lowerwares</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CategoriesBlock;
