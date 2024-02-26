class Employee {
    constructor(workAchievement, recharegeAchievement, salary, salePercent, rechargePercent, totalPercent) {
        this.workAchievement = workAchievement * 1.0;
        this.recharegeAchievement = recharegeAchievement * 1.0;
        this.salePercent = salePercent * 0.01;
        this.rechargePercent = rechargePercent * 0.01;
        this.totalPercent = totalPercent * 0.01;
        this.income = 0; //总收入
        this.salary = salary * 1.0; //底薪
        this.saleIncome = 0; //手工收入
        this.rechargeIncome = 0; //开卡收入
        this.globalIncome = 0; //全店提成
    }
}

class Budget {
    constructor(rent, adCost, rechargePercent, employees) {
        this.rent = rent * 1.0;
        this.adCost = adCost * 1.0;
        this.rechargePercent = rechargePercent * 0.01;
        this.employees = employees;
        this.income = 0; //收入
        this.rechargeIncome = 0; //充值收入
        this.saleIncome = 0; //零售收入
        this.payOut = 0; //支出
        this.employeePayOut = 0;
        this.rechargeCost = 0; //充值预付
        this.netIncome = 0; //净利润
    }

    //计算员工收入
    employeeCalculate() {
        this.employees.forEach(element => {
            //底薪+手工提成+开卡提成+全店提成
            element.saleIncome = element.salePercent * element.workAchievement;
            element.rechargeIncome = element.rechargePercent * element.recharegeAchievement
            element.income = element.salary + element.saleIncome + element.rechargeIncome;
            //统计店铺零售收入
            this.saleIncome += element.workAchievement;
            //统计充值收入
            this.rechargeIncome += element.recharegeAchievement;
            //统计预付款
            this.rechargeCost += (element.recharegeAchievement * this.rechargePercent + element.recharegeAchievement * element.salePercent);
        });

        //统计全店收入
        this.income = this.saleIncome + this.rechargeIncome;

        //统计全店提成
        this.employees.forEach(element => {
            element.globalIncome = element.totalPercent * this.income;
            element.income += element.globalIncome;
        });
    }

    payoutCalculate() {
        this.payOut += this.rent;
        this.payOut += this.adCost;
        this.employees.forEach(element => {
            this.employeePayOut += element.income;
        });
        this.payOut += this.employeePayOut;

        this.netIncome = this.income - this.payOut - this.rechargeCost;
    }

    calculate() {
        this.employeeCalculate();
        this.payoutCalculate();
    }

}
