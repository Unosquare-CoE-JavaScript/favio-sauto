import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("Checkbox controls Button functionality", () => {
  test("Initial Condition", () => {
    render(<SummaryForm />);

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    const policyCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    expect(policyCheckbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  });

  test("Checking checkbox enables button", () => {
    render(<SummaryForm />);
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    const policyCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    userEvent.click(policyCheckbox);
    expect(confirmButton).toBeEnabled();

    userEvent.click(policyCheckbox);
    expect(confirmButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);
    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
