import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Calculator({ bikeDetail }) {
  // Initialize state variables
  const [bikePrice, setBikePrice] = useState(0);
  const [interestRate, setInterestRate] = useState(5); // Default 5%
  const [loanTerm, setLoanTerm] = useState(60); // Default 60 months
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Update bike price when bikeDetail changes
  useEffect(() => {
    if (bikeDetail && bikeDetail.sellingPrice) {
      // Convert to number and set the state
      setBikePrice(Number(bikeDetail.sellingPrice));
      console.log("Setting bike price to:", Number(bikeDetail.sellingPrice));
    }
  }, [bikeDetail]);

  const calculateMonthlyPayment = () => {
    try {
      // Convert all inputs to numbers
      const principal = Number(bikePrice) - Number(downPayment);
      const monthlyInterestRate = Number(interestRate) / 1200; // Convert annual rate to monthly decimal
      const termMonths = Number(loanTerm);

      // Validate inputs
      if (principal <= 0) {
        alert("Principal amount must be greater than zero");
        return;
      }

      if (monthlyInterestRate <= 0) {
        alert("Interest rate must be greater than zero");
        return;
      }

      if (termMonths <= 0) {
        alert("Loan term must be greater than zero");
        return;
      }

      // Calculate monthly payment
      const payment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, termMonths)) /
        (Math.pow(1 + monthlyInterestRate, termMonths) - 1);

      // Check if the result is a valid number
      if (isNaN(payment) || !isFinite(payment)) {
        alert(
          "Calculation resulted in an invalid number. Please check your inputs."
        );
        return;
      }

      // Format and set the result
      setMonthlyPayment(payment.toFixed(2));
    } catch (error) {
      console.error("Calculation error:", error);
      alert("An error occurred during calculation");
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl">Financial Calculator</h2>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label className="block mb-2">Price $</label>
          <Input
            type="number"
            value={bikePrice}
            onChange={(e) => setBikePrice(Number(e.target.value))}
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Interest Rate (%)</label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label className="block mb-2">Loan Term (months)</label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label className="block mb-2">Down Payment ($)</label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>
      </div>

      {monthlyPayment > 0 && (
        <h2 className="font-bold mt-5 text-center p-3 bg-blue-50 rounded-md">
          Your Monthly Payment is: ${monthlyPayment}
        </h2>
      )}

      <Button
        className="w-full mt-5"
        size="lg"
        onClick={calculateMonthlyPayment}
      >
        Calculate
      </Button>
    </div>
  );
}

Calculator.propTypes = {
  bikeDetail: PropTypes.shape({
    sellingPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

export default Calculator;
