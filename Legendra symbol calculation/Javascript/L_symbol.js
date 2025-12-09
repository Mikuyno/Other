function isOddPrime(p)
{
    if (p < 3)
    {
        return false
    }
    else if (p % 2 ===0)
    {
        return false;
    }
    for (i=3; i<= p; i+=2)
    {
        if(p % i === 0)
        {
            return false;
        }
    }
    return true;
}
    

function modExp(base, exp, mod) {
    if (isOddPrime(mod) === false)
    {
        
    }
    
    let result = 1;
    base = ((base % mod) + mod) % mod;
    exp = Math.floor(exp);
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

    legendreSymbol = modExp(a, (p - 1) / 2, p);
    legendreSymbol = ((legendreSymbol % p) + p) % p;
    let resultText;

    if (legendreSymbol === 1) {
        resultText = `( ${a} / ${p} ) = 1 (a is a quadratic residue modulo p)`;
    } else if (legendreSymbol === p - 1) {
        resultText = `( ${a} / ${p} ) = -1 (a is a non-quadratic residue modulo p)`;
    } else {
        resultText = `( ${a} / ${p} ) = ${legendreSymbol} (unexpected remainder; ensure p is prime)`;
    }

    document.getElementById('result').innerText = resultText;
}
