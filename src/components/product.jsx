import React from "react";
import {
  Button,
  Table,
  InputNumber,
  Typography
} from "antd";
import { products } from "../data/products";

const { Text } = Typography;

export default class Product extends React.Component {
  state = {
    cart: []
  };

  handleChange = product => quantity => {
    if (quantity < 1) return;

    const { key, price } = product;
    const addedProduct = this.state.cart.find(item => item.key === key);

    if (!addedProduct) {
      // push to cart
      this.setState({ cart: [...this.state.cart, { key, price, quantity }] });
    } else {
      // update quantity in cart
      this.state.cart.map(item => {
        return this.setState(prevState => ({
          cart: prevState.cart.map(item =>
            item.key === key ? Object.assign(item, { quantity }) : item
          )
        }));
      });
    }
  };

  handleAddToCart = () => {
    const itemQuantity = this.state.cart.reduce(
      (prev, cur) => prev + cur.quantity,
      0
    );
    this.props.handleProduct(itemQuantity, this.state.cart);
  };

  render() {
    return (
      <Table
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 100,
            render: text => <Text strong>{text}</Text>
          },
          {
            title: "Currency",
            dataIndex: "currency",
            key: "currency",
            width: 100,
            render: text => <Text>{text}</Text>
          },
          {
            title: "Price Per Unit",
            dataIndex: "price",
            width: 100,
            render: text => <Text>{text}</Text>
          },
          {
            title: "Quantity",
            key: "quantity",
            width: 100,
            render: (text, record) => (
              <InputNumber min={0} onChange={this.handleChange(record)} />
            )
          },
          {
            title: (
              <Button type="primary" ghost onClick={this.handleAddToCart}>
                Add to cart
              </Button>
            ),
            key: "addToCart",
            width: 100
          }
        ]}
        dataSource={products}
      />
    );
  }
}
