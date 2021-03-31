import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import CustomButton, { CustomButtonProps } from "../button";
import userEvent from "@testing-library/user-event";

const mockCallback = jest.fn();

const DEFAULT_PROPS: CustomButtonProps = {
  children: "send",
  color: "red",
  disabled: false,
  clickAction: mockCallback
};

const renderComponent = (props: Partial<CustomButtonProps> = {}) => {
  return {
    ...render(<CustomButton {...DEFAULT_PROPS} {...props} />),
    props: {
      ...DEFAULT_PROPS,
      ...props
    }
  };
};

test("shows the correct children", () => {
  renderComponent();
  expect(screen.getByText(`${DEFAULT_PROPS.children}`)).toBeInTheDocument();
});

// test('onClick is called when button is clicked', () =>{
//     const fn = jest.fn();
//     let tree = create(<CustomButton clickAction={fn} fill={true} />);
//     // Simulate button click
//     const button = tree.root.findByType('button'):
//     button.props.onClick()
//     // Verify callback is invoked
//     expect(fn.mock.calls.length).toBe(1);
//   });
