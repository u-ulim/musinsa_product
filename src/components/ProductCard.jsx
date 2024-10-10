import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 300px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  const forattedPrice = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(item && item?.price);

  const showDetail = () => {
    navigate(`products/${item && item.id}`);
  };

  return (
    <Wrapper onClick={showDetail}>
      {/* <Img src=`{${item && item?.img}` /> */}
      <Img src={item && item.img} />
      <div>Conscious Choice</div>
      <div>{item && item?.title}</div>
      <div>{forattedPrice}</div>
      <div>{item && item?.new === true ? "신제품" : "이벤트상품"}</div>
    </Wrapper>
  );
};

export default ProductCard;
