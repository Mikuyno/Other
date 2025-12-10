

function isOddPrime(p) {
    if (!Number.isInteger(p) || p < 3) return false;
    if (p % 2 === 0) return false;
    for (let i = 3; i * i <= p; i += 2) {
        if (p % i === 0) return false;
    }
    return true;
}

function modExp(base, exp, mod) {
    base = ((base % mod) + mod) % mod;
    let result = 1;
    let e = Math.floor(exp);
    while (e > 0) {
        if (e & 1) result = (result * base) % mod;
        base = (base * base) % mod;
        e = e >> 1;
    }
    return result;
}

function calculateLegendreSymbol() {
    const pRaw = document.getElementById('p').value.trim();
    const aRaw = document.getElementById('a').value.trim();

    const intRegex = /^-?\d+$/;
    if (!intRegex.test(pRaw) && !intRegex.test(aRaw)) {
        document.getElementById('result').innerText = "Error: p and a must be integers.";
        return;
    }
    if (!intRegex.test(pRaw)) {
        document.getElementById('result').innerText = "Error: p must be an integer.";
        return;
    }
    if (!intRegex.test(aRaw)) {
        document.getElementById('result').innerText = "Error: a must be an integer.";
        return;
    }
    const p = Number.parseInt(pRaw, 10);
    if (!isOddPrime(p)) {
        document.getElementById('result').innerText = "Error: p must be an odd prime.";
        return;
    }

    let a = Number.parseInt(aRaw, 10);
    if (!Number.isInteger(a)) {
        document.getElementById('result').innerText = "Error: a must be an integer.";
        return;
    }

    a = ((a % p) + p) % p;
    if (a === 0) {
        document.getElementById('result').innerText = `( ${a} / ${p} ) = 0 (a ≡ 0 mod p)`;
        return;
    }

    const rem = modExp(a, (p - 1) / 2, p);
    let resultText;
    if (rem === 1) {
        resultText = `( ${a} / ${p} ) = 1 (a is a quadratic residue modulo ${p})`;
    } else if (rem === p - 1) {
        resultText = `( ${a} / ${p} ) = -1 (a is a non-quadratic residue modulo ${p})`;
    } else {
        resultText = `( ${a} / ${p} ) = ${rem} (unexpected remainder; ensure p is prime)`;
    }

    document.getElementById('result').innerText = resultText;
}

