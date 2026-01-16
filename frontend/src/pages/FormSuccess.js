// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";


const FormSuccess = () => {
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-lg" data-testid="success-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            Application Submitted!
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Your loan application has been successfully submitted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Thank you for applying! Our team will review your application and contact you within 2-3 business days.
            </p>
          </div>
          {/* <Button 
            onClick={() => navigate("/")} 
            variant="outline" 
            className="w-full"
            data-testid="back-home-button"
          >
            Back to Home
          </Button> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSuccess;
