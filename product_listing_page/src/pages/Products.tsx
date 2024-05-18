import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { ProductsList } from "../components/ProductsList";
import { useFetch } from "../hooks/useFetch";

export function Products() {
  // const [data, setData] = useState([]);
  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://jsainsburyplc.github.io/front-end-test/products.json"
  //     );
  //     setData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);

  const { data, loading, error } = useFetch(
    "https://jsainsburyplc.github.io/front-end-test/products.json"
  );
  if (loading) {
    return (
      <Spinner animation="border" role="status" aria-hidden="true">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner>
    );
  }
  if (error) {
    return <Alert variant="danger">Error fetching data: {error.message}</Alert>;
  }
  return (
    <>
      <h1>View all products</h1>
      {/* <Button onClick={getData}>Get Data</Button> */}
      <Row lg={4} md={3} sm={2} xs={1} className="g-3">
        {data.map((product) => (
          <Col key={product.productId}>
            <ProductsList {...product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
