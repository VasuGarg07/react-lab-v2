import { fixInt } from "@/apps/HomeloanWizard/helpers";
import SliderComponent from "@/apps/HomeloanWizard/Slider";
import { LoanData } from "@/apps/HomeloanWizard/helpers";

interface Props {
  data: LoanData,
  setData: React.Dispatch<React.SetStateAction<LoanData>>
}


const SliderSelect = ({ data, setData }: Props) => {
  return (
    <div>
      <SliderComponent
        onChange={(value) => {
          setData({
            ...data,
            homeValue: fixInt(value),
            downPayment: fixInt(value * 0.3),
            loanAmount: fixInt(value * 0.7),
          });
        }}
        min={10}
        max={100}
        steps={1}
        unit="Rs."
        amount={data.homeValue}
        label="Home Value"
        value={data.homeValue}
      />

      <SliderComponent
        onChange={(value) =>
          setData({
            ...data,
            downPayment: fixInt(value),
            loanAmount: fixInt(data.homeValue - value),
          })
        }
        min={0}
        max={data.homeValue}
        steps={1}
        unit="Rs."
        amount={data.downPayment}
        label="Down Payment"
        value={data.downPayment}
      />

      <SliderComponent
        onChange={(value) =>
          setData({
            ...data,
            loanAmount: fixInt(value),
            downPayment: fixInt(data.homeValue - value),
          })
        }
        min={0}
        max={data.homeValue}
        steps={1}
        unit="Rs."
        amount={data.loanAmount}
        label="Loan Amount"
        value={data.loanAmount}
      />

      <SliderComponent
        onChange={(value) =>
          setData({
            ...data,
            interestRate: fixInt(value),
          })
        }
        min={2}
        max={18}
        steps={0.5}
        unit="%"
        amount={data.interestRate}
        label="Interest Rate"
        value={data.interestRate}
      />

      <SliderComponent
        onChange={(value) =>
          setData({
            ...data,
            loanTerm: value,
          })
        }
        min={5}
        max={25}
        steps={1}
        unit="Years"
        amount={data.loanTerm}
        label="Loan Tenure"
        value={data.loanTerm}
      />
    </div>
  );
};

export default SliderSelect;