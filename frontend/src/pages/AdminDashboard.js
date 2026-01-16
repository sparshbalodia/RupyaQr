import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Download, QrCode, Users, FileText, Plus } from "lucide-react";

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [loading, setLoading] = useState(false);
  const [activeAppType, setActiveAppType] = useState("loan");
  const [insuranceApplications, setInsuranceApplications] = useState([]);
  const navigate = useNavigate();


  // New agent form
  const [newAgent, setNewAgent] = useState({ name: "", phone: "" });

  useEffect(() => {
    fetchAgents();
    fetchApplications();
    fetchInsuranceApplications();
  }, []);

  useEffect(() => {
    if (selectedAgent === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.agentId === selectedAgent));
    }
  }, [selectedAgent, applications]);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${API}/agents`);
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
      toast.error("Failed to load agents");
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API}/loan-applications`);
      setApplications(response.data);
      setFilteredApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    }
  };

  const fetchInsuranceApplications = async () => {
    try {
      const response = await axios.get(`${API}/insurance-applications`);
      setInsuranceApplications(response.data);
    } catch (error) {
      console.error("Error fetching insurance applications:", error);
      toast.error("Failed to load insurance applications");
    }
  };


  const handleCreateAgent = async (e) => {
    e.preventDefault();
    if (!newAgent.name || !newAgent.phone) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/agents`, newAgent);
      setAgents([...agents, response.data]);
      setNewAgent({ name: "", phone: "" });
      toast.success(`Agent ${response.data.agentId} created successfully!`);
    } catch (error) {
      console.error("Error creating agent:", error);
      toast.error("Failed to create agent");
    } finally {
      setLoading(false);
    }
  };


  const handleExport = async () => {
    try {
      let url = "";

      if (activeAppType === "loan") {
        url =
          selectedAgent === "all"
            ? `${API}/loan-applications/export`
            : `${API}/loan-applications/export?agentId=${selectedAgent}`;
      } else {
        // ✅ insurance export
        url = `${API}/insurance-applications/export`;
      }

      const response = await axios.get(url, { responseType: "blob" });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;

      link.download =
        activeAppType === "loan"
          ? `loan_applications_${Date.now()}.xlsx`
          : `insurance_applications_${Date.now()}.xlsx`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Excel downloaded successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };


  const handleDeactivateAgent = async (agentId) => {
    if (!window.confirm("Are you sure you want to deactivate this agent?")) return;

    try {
      await axios.patch(`${API}/agents/${agentId}/deactivate`);
      toast.success("Agent deactivated");

      setAgents(prev =>
        prev.map(a =>
          a.agentId === agentId ? { ...a, isActive: false } : a
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to deactivate agent");
    }
  };


  const downloadQR = (agent) => {
    const link = document.createElement('a');
    link.href = agent.qrImage;
    link.download = `QR_${agent.agentId}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success(`QR code for ${agent.name} downloaded!`);
  };

  const handleUpdateApplication = async (appId, updates) => {
  try {
    await axios.patch(`${API}/applications/${appId}`, updates);
    toast.success("Application updated");

    // Refresh applications
    fetchApplications();
    fetchInsuranceApplications();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update application");
  }
};


  const activeAgentsCount = agents.filter(a => a.isActive !== false).length;
  const deactivatedAgentsCount = agents.filter(a => a.isActive == false).length;
  const loanApplicationsCount = applications.length;
  const insuranceApplicationsCount = insuranceApplications.length;
  const activeAgents = agents.filter(a => a.isActive !==false);
  const deactivatedAgents = agents.filter(a => a.isActive == false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Rupya Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage agents and track loan and insurance applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {/* Active Agents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Agents
              </CardTitle>
              <Users className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {activeAgentsCount}
              </div>
            </CardContent>
          </Card>

          {/* Deactivated Agents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Deactivated Agents
              </CardTitle>
              <Users className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {deactivatedAgentsCount}
              </div>
            </CardContent>
          </Card>

          {/* Loan Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Loan Applications
              </CardTitle>
              <FileText className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {loanApplicationsCount}
              </div>
            </CardContent>
          </Card>

          {/* Insurance Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Insurance Applications
              </CardTitle>
              <QrCode className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {insuranceApplicationsCount}
              </div>
            </CardContent>
          </Card>

        </div>



        {/* Main Content */}
        <Tabs defaultValue="agents" className="space-y-6">

          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="agents">Agents</TabsTrigger>

            <Button
              variant="outline"
              // onClick={() => navigate("/admin/applications")}
              onClick={() => window.open("/admin/applications", "_blank")}
              className="h-10"
            >
              Applications
            </Button>
          </TabsList>


          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            {/* Create Agent Form */}
            <Card data-testid="create-agent-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Agent
                </CardTitle>
                <CardDescription>Generate a unique QR code for a new agent</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAgent} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input
                        id="agent-name"
                        data-testid="agent-name-input"
                        placeholder="Enter agent name"
                        value={newAgent.name}
                        onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="agent-phone">Phone Number</Label>
                      <Input
                        id="agent-phone"
                        data-testid="agent-phone-input"
                        placeholder="Enter phone number"
                        value={newAgent.phone}
                        onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} data-testid="create-agent-button" className="w-full md:w-auto">
                    {loading ? "Creating..." : "Create Agent"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Agents List */}
            <Card data-testid="agents-list-card">
              <CardHeader>
                {/* <CardTitle>All Agents ({agents.length})</CardTitle> */}
                <CardDescription>View and download QR codes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">

                {/* ACTIVE AGENTS */}
                <div>
                  <h2 className="text-lg font-semibold text-green-700 mb-4">
                    Active Agents ({activeAgents.length})
                  </h2>
                
                  {activeAgents.length === 0 ? (
                    <p className="text-gray-500">No active agents</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeAgents.map(agent => (
                        <Card key={agent.agentId} className="border-2 border-green-200">
                          <CardHeader>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <CardDescription className="font-mono text-xs">
                              {agent.agentId}
                            </CardDescription>
                          </CardHeader>
                      
                          <CardContent className="space-y-4">
                            <img
                              src={agent.qrImage}
                              alt="QR"
                              className="w-40 h-40 mx-auto"
                            />
              
                            <p className="text-sm text-gray-600">
                              <strong>Phone:</strong> {agent.phone}
                            </p>
                      
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => downloadQR(agent)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download QR
                            </Button>
                      
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => handleDeactivateAgent(agent.agentId)}
                            >
                              Deactivate Agent
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* DEACTIVATED AGENTS */}
                <div>
                  <h2 className="text-lg font-semibold text-red-700 mb-4">
                    Deactivated Agents ({deactivatedAgents.length})
                  </h2>
                
                  {deactivatedAgents.length === 0 ? (
                    <p className="text-gray-500">No deactivated agents</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {deactivatedAgents.map(agent => (
                        <Card key={agent.agentId} className="border-2 border-red-200 opacity-75">
                          <CardHeader>
                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                            <CardDescription className="font-mono text-xs">
                              {agent.agentId}
                            </CardDescription>
                      
                            <span className="text-xs text-red-600 font-semibold">
                              DEACTIVATED
                            </span>
                          </CardHeader>
                      
                          <CardContent className="space-y-4">
                            <img
                              src={agent.qrImage}
                              alt="QR"
                              className="w-40 h-40 mx-auto grayscale"
                            />
              
                            <p className="text-sm text-gray-600">
                              <strong>Phone:</strong> {agent.phone}
                            </p>
                      
                            <Button disabled className="w-full">
                              Agent Deactivated
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                
              </CardContent>  
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          
        </Tabs>
      </div>
    </div>

  );
};

export default AdminDashboard;



