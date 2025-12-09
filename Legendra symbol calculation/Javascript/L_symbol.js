function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function calculateLegendreSymbol() {
    const a = parseInt(document.getElementById('a').value);
    const p = parseInt(document.getElementById('p').value);

    if (p <= 2 || p % 2 === 0) {
        document.getElementById('result').innerText = "Error: p must be an odd prime.";
        return;
    }

    const legendreSymbol = modExp(a, (p - 1) / 2, p);
    let resultText;

    if (legendreSymbol === 1) {
        resultText = `( ${a} / ${p} ) = 1 (a is a quadratic residue modulo p)`;
    } else if (legendreSymbol === p - 1) {
        resultText = `( ${a} / ${p} ) = -1 (a is a non-quadratic residue modulo p)`;
    } else {
        resultText = `( ${a} / ${p} ) = 0 (a is congruent to 0 modulo p)`;
    }

    document.getElementById('result').innerText = resultText;
}