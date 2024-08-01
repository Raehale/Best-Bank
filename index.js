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
    let selectedAccount = accounts[event.target.dataset.index]
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