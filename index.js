import accounts from './data.js';

const accountSection = document.querySelector('.main-accounts .account-contaier');
const spendingSection = document.querySelector('.spending-container');

// Render all accounts
function renderAccounts() {
    let accountsData = '';

    accounts.forEach((account, index) => {
        const accountHtml = `
            <div class="accounts" id="account-${index}" data-index="${index}">
                <p class="type-of-account">${account.title}</p>
                <p class="money">$${account.balance}</p>
            </div>
        `;
        accountsData += accountHtml;
    });

    accountSection.innerHTML = accountsData;

    // Add event listeners to each account
    accounts.forEach((account, index) => {
        document.getElementById(`account-${index}`).addEventListener('click', function(event) {
            document.querySelectorAll('.accounts').forEach(el => el.style.backgroundColor = '');
            this.style.backgroundColor = '#FFA724';
            switchSpendings(event);
        });
    });
}

// Render the first 5 spendings from all accounts
function renderSpendings() {
    let spendingsData = '';

    const allSpendings = accounts.flatMap(account => account.spendings);
    const firstFiveSpendings = allSpendings.slice(0, 5);

    firstFiveSpendings.forEach(spending => {
        const spendingHtml = `
            <div class="spending-category">
                <p class="spending-title">${spending.category}</p>
                <p class="spending-money">$${spending.spent}</p>
            </div>
        `;
        spendingsData += spendingHtml;
    });

    spendingSection.innerHTML = spendingsData;
}

renderAccounts();
renderSpendings();

function switchSpendings(event){
    let selectedAccount = accounts[event.target.dataset.index];
    let spendingsData = '';

    if (selectedAccount.spendings.length > 0){
        selectedAccount.spendings.forEach(spending => {
            let spendingHtml = `
                <div class="spending-category">
                    <p class="spending-title">${spending.category}</p>
                    <p class="spending-money">$${spending.spent}</p>
                </div>
            `;
            spendingsData += spendingHtml;
        });    
        spendingSection.innerHTML = spendingsData;
    } else {
        spendingSection.innerHTML = `You have no categories`;
    }
}

// Modal Logic
const payButton = document.querySelector('.pay-button');
const modal = document.getElementById('payModal');
const span = document.querySelector('.close');

// Ensure modal is hidden on load
document.addEventListener('DOMContentLoaded', function() {
    modal.style.display = "none"; 
    
});

// Show modal when the Pay button is clicked
payButton.onclick = function() {
    modal.style.display = "flex"; 
    
}

// Close the modal when clicking the close button
span.onclick = function() {
    modal.style.display = "none"; 
    // Hide the modal when the close button is clicked
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; 
       
    }
}

// Payment Logic
const confirmPaymentButton = document.getElementById('confirmPayment');

confirmPaymentButton.addEventListener('click', function() {
    const accountType = document.getElementById('account').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    let selectedAccount;
    if (accountType === 'main') {
        selectedAccount = accounts[0];  
        // Assuming index 0 is Main Account
    } else if (accountType === 'expenses') {
        selectedAccount = accounts[1];  
        // Assuming index 1 is Expenses
    } else if (accountType === 'savings') {
        selectedAccount = accounts[2];  
        // Assuming index 2 is Savings
    }

    if (selectedAccount && selectedAccount.balance >= amount) {
        selectedAccount.balance -= amount;
        renderAccounts();  
        // Re-render accounts to update UI
        alert('Payment successful!');
        modal.style.display = 'none';  
        // Hide modal after payment
    } else {
        alert('Insufficient funds.');
    }
});
