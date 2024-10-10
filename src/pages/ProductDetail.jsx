import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";

const Img = styled.img`
  width: 300px;
  border-radius: 12px;
`;

const ProductDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 22px;
  padding: 10px;
`;

const ProductTitle = styled.h1`
  font-weight: 600;
`;

const ProuctPrice = styled.span`
  font-size: 18px;
`;

const ProductChoice = styled.div``;

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const getProductDetail = async () => {
    const url = `http://localhost:3000/products/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setProduct(data);
    console.log(data);
  };

  const forattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(product && product?.price);

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Container>
      {product ? (
        <Row>
          <Col>
            <Img src={product.img} />
          </Col>
          <Col>
            <ProductDesc>
              <ProductTitle>{product.title}</ProductTitle>
              <ProuctPrice>{forattedPrice}</ProuctPrice>
              <ProductChoice>
                {product?.choice ? "Conscious choice" : ""}
              </ProductChoice>
            </ProductDesc>
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                사이즈 선택
              </Dropdown.Toggle>

              <Dropdown.Menu variant="outline-dark" id="dropdown-basic">
                {product?.size.map((item, index) => (
                  <Dropdown.Item key={index} href={`#/${index}`}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="warning">장바구니</Button>
            <Button variant="danger">상품결제</Button>
          </Col>
        </Row>
      ) : (
        <div>Lodaing</div>
      )}
    </Container>
  );
};

export default ProductDetail;
