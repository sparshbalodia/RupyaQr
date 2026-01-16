import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

const AgentLogin = () => {
  const [agentId, setAgentId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!agentId) {
      toast.error("Enter Agent ID");
      return;
    }

    try {
      const res = await axios.post(
      `${API}/agents/login`,
      { agentId }
    );


      localStorage.setItem("agentId", res.data.agentId);
      localStorage.setItem("agentName", res.data.name);

      navigate("/agent/dashboard");
    } catch (err) {
      let message = "Login failed";

      if (Array.isArray(err.response?.data?.detail)) {
        message = err.response.data.detail[0]?.msg;
      } else if (typeof err.response?.data?.detail === "string") {
        message = err.response.data.detail;
      }

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-80">
        <Input
          placeholder="Enter Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value.trim())}
        />

        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
};

export default AgentLogin;
