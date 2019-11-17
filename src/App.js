import React from "react";
import "./App.css";
import Product from "./components/product";
import { Badge, Button, Icon, Layout, Menu, Typography, Row, Col } from "antd";
import { audiences } from "./data/audiences";
import { calculatePrice, formatPrice } from "./services/checkout";

const { Content, Footer, Header, Sider } = Layout;
const { SubMenu } = Menu;
const { Text, Title } = Typography;

class App extends React.Component {
  state = {
    currentAudience: "Choose an audience",
    finalPrice: 0,
    count: 0,
    selectedProduct: []
  };

  handleProduct = (quantity, product) => {
    this.setState({ count: quantity, selectedProduct: product });
  };

  handleCheckout = () => {
    // get audience profile
    const audienceDetails = audiences.find(
      x => x.level === this.state.currentAudience
    );

    if (!audienceDetails) {
      alert("Please select Associate / Platinum / Diamond level");
      return;
    }

    const { pricingRule, discountRate } = audienceDetails;

    let price = 0;
    this.state.selectedProduct.map(item => {
      const filteredPricingRule = pricingRule.find(
        rule => rule.key === item.key
      );

      return price += calculatePrice(
        item.price,
        item.quantity,
        filteredPricingRule,
        discountRate
      );
    });

    this.setState({
      finalPrice: formatPrice(price)
    });

    // reset cart after checkout
    this.setState({
      selectedProduct: [],
      count: 0
    });
  };

  handleUserChange = e => {
    this.setState({
      currentAudience: e.key
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible breakpoint="lg">
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["userMenu"]}
            mode="inline"
          >
            <Menu.Item key="1">
              <Icon type="shopping" />
              <span>Products</span>
            </Menu.Item>
            <SubMenu
              onClick={this.handleUserChange}
              key="userMenu"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              {audiences.map(item => {
                return <Menu.Item key={item.level}>{item.level}</Menu.Item>;
              })}
            </SubMenu>
          </Menu>
        </Sider>

        <Layout>
          <Header
            style={{ background: "#fff", padding: "0px 10px", height: "100px" }}
          >
            <div>
              <Title level={2}>Checkout App</Title>
              <Text>Current audience level: {this.state.currentAudience}</Text>
            </div>
          </Header>

          <Content style={{ margin: "0 16px" }}>
            <Row style={{ margin: "10px auto" }}>
              <Col span={12}>
                <Text>Contoso Products Listing</Text>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <Badge
                  count={this.state.count}
                  style={{ bottom: "15px", left: "125px" }}
                ></Badge>
                <Button
                  type="primary"
                  icon="shopping-cart"
                  onClick={this.handleCheckout}
                >
                  Checkout
                </Button>
              </Col>
              <Text strong>Total expected: {this.state.finalPrice}</Text>
            </Row>

            <Product handleProduct={this.handleProduct} />
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Built with Ant Design System
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
