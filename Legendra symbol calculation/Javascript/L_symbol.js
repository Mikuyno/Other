function clearResult() {
    document.getElementById('result').innerText = "";
    document.getElementById('p').value = "";
    document.getElementById('a').value = "";
}


function variableErrors() {
    const pRaw = document.getElementById('p').value.trim();
    const aRaw = document.getElementById('a').value.trim();
    const intRegex = /^-?\d+$/;
    let errors = "";
    if (pRaw === "") {
        errors += "Error: no value for p.\n";
    }
    else if (!intRegex.test(pRaw)) {
        errors += "Error: p must be an integer.\n";
    }
    else if (!isOddPrime(Number.parseInt(pRaw, 10))) {
        errors += "Error: p must be an odd prime.\n";
    }
    if (aRaw === "") {
        errors += "Error: no value for a.\n";
    }
    else if (!intRegex.test(aRaw)) {
        errors += "Error: a must be an integer.\n";
    }
    return errors;
}
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
    const errors = variableErrors();
    if (errors) {
        document.getElementById('result').innerText = errors;
        return;
    }
    const p = Number.parseInt(pRaw, 10);
    let a = Number.parseInt(aRaw, 10);

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

function listResidues() {
    const pRaw = document.getElementById('p').value.trim();
    const errors = variableErrors();
    if (errors) {
        document.getElementById('result').innerText = errors;
        return;
    }
    const p = Number.parseInt(pRaw, 10);
    let residues = [];
    let nonResidues = [];
    for (let a = 1; a < p; a++) {
        if (modExp(a, (p - 1) / 2, p) === 1) {
            residues.push(a);
        }
        else if (modExp(a, (p - 1) / 2, p) === p - 1) {
            nonResidues.push(a);
        }
    }
    document.getElementById('result').innerText = `Quadratic residues modulo ${p}: ${residues.join(', ')} \nNon-quadratic residues modulo ${p}: ${nonResidues.join(', ')}`;

}