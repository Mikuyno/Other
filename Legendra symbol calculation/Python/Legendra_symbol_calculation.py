number1 = int(input("Enter the first number (a): "));
number2 = int(input("Enter the second number (p), should be a prime number: "));
def legendre_symbol(a, p):
    if a % p == 0:
        return 0
    elif pow(a, (p - 1) // 2, p) == 1:
        return 1
    else:
        return -1
result = legendre_symbol(number1, number2)
if result == 0:
    print(f"The Legendre symbol ({number1}/{number2}) is: 0 (a is congruent to 0 mod p)")
elif result == 1:
    print(f"The Legendre symbol ({number1}/{number2}) is: 1 (a is a quadratic residue mod p)")
elif result == -1:
    print(f"The Legendre symbol ({number1}/{number2}) is: -1 (a is a non-quadratic residue mod p)")

    
