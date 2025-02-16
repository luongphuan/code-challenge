interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
  usdValue: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const useWalletBalances = (): WalletBalance[] => [];
const usePrices = () => {};

interface WalletPageProps extends BoxProps {
  classes: {
    row: string;
  };
}

const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  const { classes, ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  // blockchain is a string
  const getPriority = (blockchain: string): number => {
    // switch (blockchain) {
    //   case "Osmosis":
    //     return 100;
    //   case "Ethereum":
    //     return 50;
    //   case "Arbitrum":
    //     return 30;
    //   case "Zilliqa":
    //     return 20;
    //   case "Neo":
    //     return 20;
    //   default:
    //     return -99;
    // }

    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] ?? -99;
  };

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    // return balances
    //   .filter((balance: WalletBalance) => {
    //     const balancePriority = getPriority(balance.blockchain);
    //     if (lhsPriority > -99) {
    //       if (balance.amount <= 0) {
    //         return true;
    //       }
    //     }
    //     return false;
    //   })
    //   .sort((lhs: WalletBalance, rhs: WalletBalance) => {
    //     const leftPriority = getPriority(lhs.blockchain);
    //     const rightPriority = getPriority(rhs.blockchain);
    //     if (leftPriority > rightPriority) {
    //       return -1;
    //     } else if (rightPriority > leftPriority) {
    //       return 1;
    //     }
    //   });

    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount <= 0;
    });

    const tempSortedBalances = filteredBalances.sort(
      (lhs: WalletBalance, rhs: WalletBalance) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      }
    );

    const formattedBalances: FormattedWalletBalance[] = tempSortedBalances.map(
      (balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
          usdValue: balance.amount * prices[balance.currency],
        };
      }
    );

    return formattedBalances;
  }, [balances, prices]);

  return (
    <div {...rest}>
      {sortedBalances.map((balance, index) => (
        <WalletRow
          key={balance.currency}
          className={classes.row}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
