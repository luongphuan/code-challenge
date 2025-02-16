const sumToN1 = (n) => {
    return n * (n + 1) / 2;
};

const sumToN2 = (n) => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

const sumToN3 = (n) => {
    return n <= 0 ? 0 : n + sumToN3(n - 1);
};