import { BgCenteredBox } from "../../../components/BgCenteredBox"
import BudgetForm from "../forms/BudgetForm"
import ExpenseForm from "../forms/ExpenseForm"

const Dashboard = () => {
    return (
        <BgCenteredBox>
            <BudgetForm />
            <ExpenseForm budgetId={""} />
        </BgCenteredBox>
    )
}

export default Dashboard