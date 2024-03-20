//add event listener to form submission
document.getElementById('expForm').addEventListener('submit', addTransaction);

//initial array of transactions, reading from localStorage
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

//add transaction to array 
function addTransaction(e) {
    e.preventDefault();
  
    // get type, name, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
  
    //only add transaction if all input fields are valid
    if (type != 'chooseOne' && name.length > 0 && amount > 0) {
        const id = transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;
        const transaction = { id, type, name, amount }
  
        transactions.push(transaction);
        // local storage 
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    //reset form and update balance
    document.getElementById('expForm').reset();
    showTransactions();
    updateBalance();
}

//show transaction
const showTransactions = () => {
    const transactionTable = document.getElementById('transactionTable');
  
    //clear existing table 
    transactionTable.innerHTML = '';
  
    //add new row for each transaction
    transactions.forEach(transaction => {
        const { type, name, amount, id } = transaction;
        const deleteBtn = `<a class="deleteButton" onclick="deleteTransaction(${id})">Delete</a>`;
        
        transactionTable.innerHTML += `
          <tr>
            <td>${type}</td>
            <td>${name}</td>
            <td>£${amount}</td>
            <td>${deleteBtn}</td>
          </tr>
        `;
      });
    
}

//delete transaction from array 
function deleteTransaction(id) {
    const index = transactions.findIndex(transaction => transaction.id === id);
    
    if (index !== -1) {
      transactions.splice(index, 1);
      //save updated transactions 
      localStorage.setItem('transactions', JSON.stringify(transactions));

      showTransactions();
      updateBalance();
    }
}

//update balance, incoe add amount, expense subtract amount
const updateBalance = () => {
    let balance = 0;
  
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += Number(transaction.amount);
      } else if (transaction.type === "expense") {
        balance -= transaction.amount;
      }
    });
  
    document.querySelector(".balance").textContent = balance;
}
