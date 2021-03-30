import React, { useState, useRef } from "react";
import Card from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";
import {
  Input,
  Select,
  VStack,
  Text,
  Stack,
  Box,
  Grid,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import "./Home.css";

export default function Home() {
  const form = useRef(null);
  const [number, setNumber] = useState("#### #### #### ####");
  const [name, setName] = useState("FULL NAME");
  const [expiry, setExpiry] = useState("MM/YY");
  const [cvc, setCvc] = useState("");
  const [issuer, setIssuer] = useState("");
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState(null);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      //   this.setState({ issuer });
      setIssuer(issuer);
    }
  };

  const handleInputFocus = ({ target }) => {
    // this.setState({
    //   focused: target.name,
    // });
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value, number);
      setCvc(target.value);
    }
    // this.setState({ [target.name]: target.value });
  };

  const handleSelectChange = ({ target }) => {
    console.log("tttt", target.value);
    setExpiry(`${target.value}/YY`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    // this.setState({ formData });
    setFormData(formData);
    this.form.reset();
  };

  return (
    <div key="Payment">
      <div className="App-payment">
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
          locale={{ valid: "Expires" }}
          preview={"**** 4567"}
        />
        <form
          ref={form}
          onSubmit={handleSubmit}
          style={{
            boxShadow: "2px 4px 10px grey",
            padding: "140px 30px 30px 30px",
            margin: "210px auto 0",
            maxWidth: "550px",
            position: "absolute",
            top: "50%",
            left: "25%",
            right: "25%",
            background: "white",
          }}
        >
          <Box mb={4}>
            <Stack spacing={1}>
              <Text fontSize="md">Card Number</Text>
              <Input
                size="md"
                type="tel"
                name="number"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Stack>
          </Box>

          <Box mb={4}>
            <Stack spacing={1}>
              <Text fontSize="md">Card Holder</Text>
              <Input
                size="md"
                type="text"
                name="name"
                placeholder="Name"
                required
                // onChange={handleInputChange}
                onChange={(e) => setName(e.target.value)}
                onFocus={handleInputFocus}
              />
            </Stack>
          </Box>

          <Box mb={4}>
            <HStack spacing={6}>
              <Stack spacing={1} width="70%">
                <Text fontSize="md">Expiration Date</Text>
                <Flex color="black">
                  <HStack spacing={4} width="100%">
                    <Select
                      name="expiry"
                      placeholder="Month"
                      onChange={handleSelectChange}
                      onFocus={handleInputFocus}
                    >
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                    </Select>
                    <Select placeholder="Year">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </HStack>
                </Flex>
              </Stack>

              <Stack spacing={1} width="30%">
                <Text fontSize="md">CVV</Text>
                <Input
                  size="md"
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </Stack>
            </HStack>
          </Box>

          {/* <div className="row">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div> */}

          {/* <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions">
            <button className="btn btn-primary btn-block">PAY</button>
          </div> */}

          <Button colorScheme="blue" variant="solid" width="100%">
            Submit
          </Button>
        </form>

        {formData && (
          <div className="App-highlight">
            {formatFormData(formData).map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
