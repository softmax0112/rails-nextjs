import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard, { ProviderCardProps } from "../providerCard";
import { mockData } from "../../../mock-data";

const DEFAULT_PROPS: ProviderCardProps = {
  provider: mockData.providers[0]
};

const renderComponent = (props: Partial<ProviderCardProps> = {}) => {
  return {
    ...render(<ProductCard {...DEFAULT_PROPS} {...props} />),
    props: {
      ...DEFAULT_PROPS
    }
  };
};

test("shows the correct provider name", () => {
  renderComponent();
  expect(
    screen.getByText(
      `${DEFAULT_PROPS.provider.first_name} ${DEFAULT_PROPS.provider.last_name}`
    )
  ).toBeInTheDocument();
});

test("shows the correct location", () => {
  renderComponent();
  expect(
    screen.getByText(
      `${DEFAULT_PROPS.provider.city}, ${DEFAULT_PROPS.provider.state}`
    )
  ).toBeInTheDocument();
});

test("shows the correct specialization name", () => {
  renderComponent();
  expect(
    screen.getByText(`${DEFAULT_PROPS.provider.specialization_name}`)
  ).toBeInTheDocument();
});
