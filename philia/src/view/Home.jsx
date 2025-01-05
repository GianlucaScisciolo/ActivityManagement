import Header from "./component/Header";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardItem from "./component/CardItem";

function Home() {
  return (
    <>
      <Header />

      <div className="main-content"></div>
      
      {/* <Row className='custom-row'>
        {Array.from({ length: 1 }, (_, i) => (
          <Col className='custom-col'>
            <CardItem tipoItem={"lavoro cliente"} />
          </Col>
        ))}
      </Row> */}
    </>
  );
}

export default Home;








