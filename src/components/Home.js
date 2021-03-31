import React, { useState, useRef, useEffect } from "react";
import Card from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../common/utils";
import "react-credit-cards/es/styles-compiled.css";
import {
  Input,
  Select,
  Text,
  Stack,
  Box,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import { months, years } from "../common/const";
import "./Home.css";

export default function Home() {
  const form = useRef(null);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("FULL NAME");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [issuer, setIssuer] = useState("");
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState(null);
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YY");

  useEffect(() => {
    const expDate = formatExpirationDate(month, year);
    setExpiry(expDate);
  }, [month, year]);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  const handleInputFocus = ({ target }) => {
    if (target.name === "month" || target.name === "year") {
      setFocused("expiry");
    } else {
      setFocused(target.name);
    }
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setNumber(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value, number);
      setCvc(target.value);
    }
  };

  const handleSelectChange = ({ target }) => {
    if (target.name === "month") {
      setMonth(target.value);
    } else if (target.name === "year") {
      setYear(target.value.slice(2, 4));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setFormData(formData);
  };

  return (
    <div key="payment">
      <div className="app-payment">
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
          locale={{ valid: "Expires" }}
        />
        <form className="form" ref={form} onSubmit={handleSubmit}>
          <Box mb={4}>
            <Stack spacing={1}>
              <Text className="text" fontSize="xs">
                Card Number
              </Text>
              <Input
                size="md"
                type="tel"
                name="number"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Stack>
          </Box>

          <Box mb={4}>
            <Stack spacing={1}>
              <Text className="text" fontSize="xs">
                Card Holder
              </Text>
              <Input
                size="md"
                type="text"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
                onFocus={handleInputFocus}
              />
            </Stack>
          </Box>

          <Box mb={8}>
            <HStack spacing={6}>
              <Stack spacing={1} width="70%">
                <Text className="text" fontSize="xs">
                  Expiration Date
                </Text>
                <Flex color="black">
                  <HStack spacing={4} width="100%">
                    <Select
                      name="month"
                      onChange={handleSelectChange}
                      onFocus={handleInputFocus}
                      defaultValue=""
                    >
                      {months.map((month, index) => (
                        <option
                          key={index}
                          value={month.value}
                          disabled={month?.disabled}
                        >
                          {month.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      name="year"
                      onChange={handleSelectChange}
                      onFocus={handleInputFocus}
                      defaultValue=""
                    >
                      {years.map((year, index) => (
                        <option
                          key={index}
                          value={year.value}
                          disabled={year?.disabled}
                        >
                          {year.name}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                </Flex>
              </Stack>

              <Stack spacing={1} width="30%">
                <Text className="text" fontSize="xs">
                  CVV
                </Text>
                <Input
                  type="tel"
                  name="cvc"
                  pattern="\d{3,4}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </Stack>
            </HStack>
          </Box>

          <Button className="submit" type="submit" variant="solid" width="100%">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
