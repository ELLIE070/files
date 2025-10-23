    /**
 * 根據輸入的貸款資訊計算每月應繳金額、總支付利息和總支付金額。
 */
function calculateMonthlyPayment() {
    // 1. 獲取輸入值
    const loanAmountInput = document.getElementById('loanAmount').value;
    const interestRateInput = document.getElementById('interestRate').value;
    const loanTermInput = document.getElementById('loanTerm').value;

    // 將輸入值轉換為數字
    const P = parseFloat(loanAmountInput); // 貸款本金 Principal
    const annualRate = parseFloat(interestRateInput); // 年利率 (%)
    const years = parseInt(loanTermInput); // 貸款期限 (年)

    // 檢查輸入是否有效
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate < 0 || years <= 0) {
        alert("請輸入有效的貸款金額、年利率和貸款期限！");
        return;
    }

    // 2. 轉換參數以適用於公式
    const monthlyRate = (annualRate / 100) / 12; // 月利率 i
    const totalMonths = years * 12; // 總月數 n

    let monthlyPayment; // 每月應繳金額 M

    if (monthlyRate === 0) {
        // 零利率情況：簡單的本金除以月數
        monthlyPayment = P / totalMonths;
    } else {
        // 等額本息計算公式: M = P * [ i * (1 + i)^n ] / [ (1 + i)^n - 1 ]
        const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
        const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
        monthlyPayment = P * (numerator / denominator);
    }

    // 3. 計算總支付金額和總利息
    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - P;

    // 4. 顯示結果 (四捨五入到小數點第二位)
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(2);
    document.getElementById('totalInterest').textContent = totalInterest.toFixed(2);
    document.getElementById('totalPayment').textContent = totalPayment.toFixed(2);
}