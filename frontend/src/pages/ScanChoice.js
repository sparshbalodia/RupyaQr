import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ScanChoice = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const agentId = searchParams.get("agentId");

  if (!agentId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">Invalid or expired QR</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Choose Application
        </h1>

        <Button
          className="w-full"
          onClick={() => navigate(`/loan-form?agentId=${agentId}`)}
        >
          Apply for Loan
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/insurance-form?agentId=${agentId}`)}
        >
          Apply for Insurance
        </Button>
      </div>
    </div>
  );
};

export default ScanChoice;
