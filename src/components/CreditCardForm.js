import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import {
  CardHolderNameInput,
  CardCVVInput,
  CardExpiryInput,
  CardNumberInput
} from "./index";

import {
  DATA_FORMATTERS,
  DATA_SANITIZERS,
  VALIDATORS,
  identity
} from "../utils";

const styles = StyleSheet.create({
  formWrapper: {
    border: "1px solid #0577DE",
    borderRadius: 4,
    maxWidth: 550
  },
  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #0577DE",
    backgroundColor: "#F2F7FA",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  formHeaderText: {
    color: "#364753"
  },
  formHeaderImage: {
    width: 37,
    height: 37
  },
  formBody: {
    padding: 20,
    paddingTop: 30
  },
  inputGroup: {
    marginBottom: 15
  },
  splitInputGroup: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width: 767px)": {
      flexDirection: "column",
      marginBottom: 0
    }
  },
  splitInputGroupItem: {
    "@media (max-width: 767px)": {
      flexBasis: "100%",
      marginBottom: 15
    },
    "@media (min-width: 768px)": {
      flexBasis: "48.5%"
    }
  },
  payButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0577DE",
    borderWidth: 0,
    color: "#fff",
    fontSize: 17,
    letterSpacing: "1.59px",
    borderRadius: 4,
    textTransform: "uppercase",
    cursor: "pointer",
    ":hover": {
      opacity: 0.95
    },
    ":focus": {
      outline: 0
    }
  }
});

class CreditCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameOnCard: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
      nameOnCardError: "",
      cardNumberError: "",
      cardExpiryError: "",
      cardCVVError: ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleFieldBlur = this.handleFieldBlur.bind(this);
    this.handleNameOnCardChange = this.handleNameOnCardChange.bind(this);
    this.handleNameOnCardBlur = this.handleNameOnCardBlur.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
    this.handleCardExpiryBlur = this.handleCardExpiryBlur.bind(this);
    this.handleCardCVVChange = this.handleCardCVVChange.bind(this);
    this.handleCardCVVBlur = this.handleCardCVVBlur.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleNameOnCardChange(newValue) {
    this.handleFieldChange("nameOnCard", newValue);
  }

  handleCardNumberChange(newValue) {
    this.handleFieldChange("cardNumber", newValue);
  }

  handleCardExpiryChange(newValue) {
    this.handleFieldChange("cardExpiry", newValue);
  }

  handleCardCVVChange(newValue) {
    this.handleFieldChange("cardCVV", newValue);
  }

  handleFieldChange(field, newValue) {
    const fields = this.state;
    const updatedFields = { ...fields };

    const valueFormatter = DATA_FORMATTERS[field] || identity;
    const valueSanitizer = DATA_SANITIZERS[field] || identity;
    const sanitizedValue = valueSanitizer(newValue);

    updatedFields[field] = valueFormatter(sanitizedValue);
    this.setState(updatedFields);
  }

  handleNameOnCardBlur(currentValue) {
    this.handleFieldBlur("nameOnCard", currentValue);
  }

  handleCardNumberBlur(currentValue) {
    this.handleFieldBlur("cardNumber", currentValue);
  }

  handleCardExpiryBlur(currentValue) {
    this.handleFieldBlur("cardExpiry", currentValue);
  }

  handleCardCVVBlur(currentValue) {
    this.handleFieldBlur("cardCVV", currentValue);
  }

  handleFieldBlur(field, currentValue) {
    const valueSanitizer = DATA_SANITIZERS[field] || identity;
    const sanitizedValue = valueSanitizer(currentValue);

    const { error } = this.validateField(field, sanitizedValue);
    const update = {};
    update[`${field}Error`] = error;

    this.setState(update);
  }

  validateField(field, value) {
    const validate = VALIDATORS[field];
    return validate(value);
  }

  validateForm() {
    const fields = this.state;
    const fieldsToValidate = [
      "nameOnCard",
      "cardNumber",
      "cardExpiry",
      "cardCVV"
    ];

    const update = {};
    fieldsToValidate.forEach((field, index) => {
      const value = fields[field];
      const valueSanitizer = DATA_SANITIZERS[field] || identity;
      const sanitizedValue = valueSanitizer(value);

      const { error } = this.validateField(field, sanitizedValue);
      update[`${field}Error`] = error;
    });

    this.setState(update);
  }

  render() {
    const {
      nameOnCard,
      cardNumber,
      cardExpiry,
      cardCVV,
      nameOnCardError,
      cardNumberError,
      cardExpiryError,
      cardCVVError
    } = this.state;

    return (
      <div className={css(styles.formWrapper)}>
        <div className={css(styles.formHeader)}>
          <p className={css(styles.formHeaderText)}>Visa, Mastercard, Amex</p>
          <img
            alt="credit-card-icon"
            className={css(styles.formHeaderImage)}
            src="https://png.icons8.com/ultraviolet/45/000000/bank-card-back-side.png"
          />
        </div>
        <div className={css(styles.formBody)}>
          <div className={css(styles.inputGroup)}>
            <CardHolderNameInput
              value={nameOnCard}
              error={nameOnCardError}
              onChange={this.handleNameOnCardChange}
              onBlur={this.handleNameOnCardBlur}
            />
          </div>

          <div className={css(styles.inputGroup)}>
            <CardNumberInput
              value={cardNumber}
              error={cardNumberError}
              onChange={this.handleCardNumberChange}
              onBlur={this.handleCardNumberBlur}
            />
          </div>

          <div className={css(styles.inputGroup, styles.splitInputGroup)}>
            <div className={css(styles.splitInputGroupItem)}>
              <CardExpiryInput
                value={cardExpiry}
                error={cardExpiryError}
                onChange={this.handleCardExpiryChange}
                onBlur={this.handleCardExpiryBlur}
              />
            </div>
            <div className={css(styles.splitInputGroupItem)}>
              <CardCVVInput
                value={cardCVV}
                error={cardCVVError}
                onChange={this.handleCardCVVChange}
                onBlur={this.handleCardCVVBlur}
              />
            </div>
          </div>

          <button onClick={this.validateForm} className={css(styles.payButton)}>
            Pay GHS200.00
          </button>
        </div>
      </div>
    );
  }
}

export default CreditCardForm;
