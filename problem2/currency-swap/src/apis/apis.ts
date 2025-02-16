import { CurrencyOption } from "../types/common";

const mockTimeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const currencyOptions: CurrencyOption[] = [
  { value: "ACT", label: "ACT", logo: "/src/assets/tokens/ACT.svg" },
  { value: "AKT", label: "AKT", logo: "/src/assets/tokens/AKT.svg" },
  { value: "ALPHA", label: "ALPHA", logo: "/src/assets/tokens/ALPHA.svg" },
  { value: "ADA", label: "ADA", logo: "/src/assets/tokens/ADA.svg" },
  { value: "ANC", label: "ANC", logo: "/src/assets/tokens/ANC.svg" },
  { value: "AUT", label: "AUT", logo: "/src/assets/tokens/AUT.svg" },
  { value: "BIT", label: "BIT", logo: "/src/assets/tokens/BIT.svg" },
];

export const getExchangeRate = async (from: string, to: string): Promise<number> => {
  await mockTimeout(1000);

  // Generate mock rates based on currency options
  const rates: { [key: string]: number } = {};
  currencyOptions.forEach((fromCurrency) => {
    currencyOptions.forEach((toCurrency) => {
      if (fromCurrency.value !== toCurrency.value) {
        rates[`${fromCurrency.value}_${toCurrency.value}`] = parseFloat((Math.random() * (1.5 - 0.5) + 0.5).toFixed(2));
      }
    });
  });

  return rates[`${from}_${to}`] || 1;
};

export const getBalance = async (currency: string): Promise<number> => {
  await mockTimeout(1000); 
  const balances: { [key: string]: number } = {
    'ACT': 1000,
    'AKT': 850,
    'ALPHA': 750,
    'ADA': 600,
    'ANC': 500,
    'AUT': 400,
    'BIT': 300,
  };
  return balances[currency] || 0;
};

export const getCurrencyOptions = async (): Promise<CurrencyOption[]> => {
  await mockTimeout(1000);
  return currencyOptions;
};

export const swapCurrency = async (from: string, to: string, amount: number): Promise<{ success: boolean, message: string }> => {
    await mockTimeout(1000);
  
    const success = Math.random() > 0.2; // 80% chance of success
    if (success) {
      return { success: true, message: "Swap successful" };
    } else {
      return { success: false, message: "Swap failed due to insufficient liquidity" };
    }
  };
