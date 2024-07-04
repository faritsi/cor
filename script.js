const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔'];
const probabilities = [0.4, 0.25, 0.2, 0.1, 0.04, 0.01];
let balance = 0;
let totalWinnings = 0;
let isAnimating = false;

function randomChoice(arr, probabilities) {
    let sum = 0;
    const r = Math.random();
    for (let i = 0; i < arr.length; i++) {
        sum += probabilities[i];
        if (r <= sum) return arr[i];
    }
}

function spinSlotMachine() {
    if (isAnimating) return;

    const costPerSpin = 2000;
    if (balance >= costPerSpin) {
        balance -= costPerSpin;
        updateBalance();
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(randomChoice(symbols, probabilities));
        }
        isAnimating = true;
        document.getElementById('spin-button').disabled = true;
        animateSlots(result);
    } else {
        alert('Saldo tidak cukup untuk memutar mesin slot.');
    }
}

function animateSlots(finalResult) {
    const slotElements = document.querySelectorAll('.slot');
    let counter = 0;

    const interval = setInterval(() => {
        if (counter >= 10) {
            clearInterval(interval);
            slotElements.forEach((slot, index) => {
                setTimeout(() => {
                    slot.textContent = finalResult[index];
                    slot.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        slot.style.transform = 'scale(1)';
                    }, 100);
                }, index * 100);
            });
            const payout = calculatePayout(finalResult);
            totalWinnings += payout;
            balance += payout;
            document.getElementById('payout').textContent = payout;
            document.getElementById('total-winnings').textContent = totalWinnings;
            updateBalance();
            isAnimating = false;
            document.getElementById('spin-button').disabled = false;
        } else {
            slotElements.forEach(slot => {
                slot.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                slot.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    slot.style.transform = 'scale(1)';
                }, 100);
            });
            counter++;
        }
    }, 100);
}

function calculatePayout(result) {
    if (result.join('') === '🍒🍒🍒🍒🍒') return 80000;
    if (result.join('') === '🍋🍋🍋🍋🍋') return 100000;
    if (result.join('') === '🍊🍊🍊🍊🍊') return 120000;
    if (result.join('') === '🍉🍉🍉🍉🍉') return 140000;
    if (result.join('') === '⭐⭐⭐⭐⭐') return 160000;
    if (result.join('') === '🔔🔔🔔🔔🔔') return 200000;
    return 500;
}

function addBalance() {
    const deposit = parseInt(document.getElementById('deposit').value, 10);
    if (isNaN(deposit) || deposit < 10000) return;
    balance += deposit;
    updateBalance();
    document.getElementById('deposit-button').disabled = true;
    document.getElementById('deposit').disabled = true;
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('final-balance').textContent = balance;
}
