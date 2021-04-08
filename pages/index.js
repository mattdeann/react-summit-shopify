import { useState } from 'react';
import { Page, Card, EmptyState, List } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const Index = () => {
  const [isResourcePickerOpen, setIsResourcePickerOpen] = useState(false);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const emptyState = <>
    <EmptyState
      heading="Discount your products in a box"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      action={{
        content: "Select product",
        onAction: () => {
          console.log("CLICKED!");
          setIsResourcePickerOpen(true);
        }
      }}
    />
    <ResourcePicker 
      resourceType="Product"
      open={isResourcePickerOpen} 
      onSelection={(selectedPayload) => {
        const selected = selectedPayload.selection.map((product) => {
          return product.id;
        })
        console.log(selected)
        setIsResourcePickerOpen(false);
        setSelectedProducts(selected);
      }}
      onCancel={() => {
        setIsResourcePickerOpen(false);
      }}
    />
  </>;

  const productList = <List>
    {selectedProducts.map((product, i) => {
      return (<List.Item key={i}>{product}</List.Item>)
    })}
  </List>

  return (
    <Page>
      <Card>{selectedProducts.length ? productList : emptyState}</Card>
    </Page>
  )
};

export default Index;
