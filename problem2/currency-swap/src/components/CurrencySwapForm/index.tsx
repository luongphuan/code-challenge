import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import "./index.css";
import Select from "../CurrencySelect";
import {
  getBalance,
  getCurrencyOptions,
  getExchangeRate,
  swapCurrency,
} from "../../apis/apis";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { CurrencyOption } from "../../types/common";
import Spinner from "../shared/Spinner";
import CustomDialog from "../shared/Dialog";

const CurrencySwapForm: React.FC = () => {
  const [amountFrom, setAmountFrom] = useState<string>("0");
  const [currencyFrom, setCurrencyFrom] = useState<string>("ACT");
  const [currencyTo, setCurrencyTo] = useState<string>("AKT");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [balance, setBalance] = useState<number>(0);
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingExchangeRate, setLoadingExchangeRate] =
    useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [dialogSuccess, setDialogSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrencyOptions = async () => {
      setLoading(true);
      const options = await getCurrencyOptions();
      setCurrencyOptions(options);
      setLoading(false);
    };

    fetchCurrencyOptions();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setLoadingExchangeRate(true);
      const rate = await getExchangeRate(currencyFrom, currencyTo);
      setExchangeRate(rate);
      setLoadingExchangeRate(false);
    };

    fetchExchangeRate();
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    const fetchBalance = async () => {
      const balance = await getBalance(currencyFrom);
      setBalance(balance);
    };

    fetchBalance();
  }, [currencyFrom]);

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(amountFrom);
    setLoading(true);
    const response = await swapCurrency(currencyFrom, currencyTo, amount);
    setLoading(false);
    setDialogMessage(response.message);
    setDialogSuccess(response.success);
    setDialogOpen(true);
  };

  const handleAmountFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const numericValue = Number(value);
    if (numericValue >= 0) {
      value = value.replace(/^0+/, "");
      setAmountFrom(value);
    }
  };

  const isSwapDisabled: boolean = useMemo(() => {
    return (
      Number(amountFrom) > balance ||
      Number(amountFrom) === 0 ||
      currencyFrom === currencyTo
    );
  }, [amountFrom, balance]);

  const amountTo: number = useMemo(() => {
    const convertedAmount: number = Number(amountFrom) * exchangeRate;
    return convertedAmount;
  }, [amountFrom, currencyFrom, currencyTo, exchangeRate]);

  return (
    <>
      <CustomDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        message={dialogMessage}
        success={dialogSuccess}
      />
      <Spinner loading={loading}>
        <motion.form
          onSubmit={handleSwap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="currency-swap-form min-w-[400px]"
        >
          <div className="form-group">
            <label>Current Balance: {`${balance} ${currencyFrom}`}</label>
          </div>

          <div className="form-group swap-card">
            <div className="flex items-center justify-between w-full">
              <label>Swap Currency</label>
              <Spinner loading={loadingExchangeRate}>
                <Select
                  value={currencyFrom}
                  onChange={(value: string) => setCurrencyFrom(value)}
                  options={currencyOptions}
                />
              </Spinner>
            </div>
            <input
              type="text"
              value={amountFrom}
              onChange={handleAmountFromChange}
              className="form-control"
            />
          </div>
          <div className="swap-icon-container">
            <ArrowsUpDownIcon className="size-6 swap-icon" />
          </div>
          <div className="form-group swap-card">
            <div className="flex items-center justify-between w-full">
              <label>To:</label>
              <Spinner loading={loadingExchangeRate}>
                <Select
                  value={currencyTo}
                  onChange={(value: string) => setCurrencyTo(value)}
                  options={currencyOptions}
                />
              </Spinner>
            </div>
            <p>{amountTo}</p>
          </div>
          <div className="form-group">
            <label>Exchange Rate: {exchangeRate}</label>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swap-button"
            disabled={isSwapDisabled}
          >
            Swap
          </motion.button>
        </motion.form>
      </Spinner>
    </>
  );
};

export default CurrencySwapForm;
