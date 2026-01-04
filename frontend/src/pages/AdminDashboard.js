import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download, QrCode, Users, FileText, Plus } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [loading, setLoading] = useState(false);
  
  // New agent form
  const [newAgent, setNewAgent] = useState({ name: "", phone: "" });

  useEffect(() => {
    fetchAgents();
    fetchApplications();
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
      const url = selectedAgent === "all" 
        ? `${API}/loan-applications/export`
        : `${API}/loan-applications/export?agentId=${selectedAgent}`;
      
      const response = await axios.get(url, { responseType: 'blob' });
      
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `loan_applications_${Date.now()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Error exporting:", error);
      toast.error("Failed to export data");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
            Loan QR Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage agents and track loan applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card data-testid="total-agents-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Agents</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{agents.length}</div>
            </CardContent>
          </Card>

          <Card data-testid="total-applications-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
              <FileText className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{applications.length}</div>
            </CardContent>
          </Card>

          <Card data-testid="filtered-applications-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Filtered Results</CardTitle>
              <QrCode className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{filteredApplications.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="agents" data-testid="agents-tab">Agents</TabsTrigger>
            <TabsTrigger value="applications" data-testid="applications-tab">Applications</TabsTrigger>
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
                <CardTitle>All Agents ({agents.length})</CardTitle>
                <CardDescription>View and download QR codes</CardDescription>
              </CardHeader>
              <CardContent>
                {agents.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No agents created yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent) => (
                      <Card key={agent.agentId} className="border-2" data-testid={`agent-card-${agent.agentId}`}>
                        <CardHeader>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription className="font-mono text-xs">{agent.agentId}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-center bg-white p-4 rounded-lg">
                            <img 
                              src={agent.qrImage} 
                              alt={`QR for ${agent.agentId}`}
                              className="w-40 h-40"
                              data-testid={`qr-image-${agent.agentId}`}
                            />
                          </div>
                          <div className="space-y-2 text-sm">
                            <p className="text-gray-600"><strong>Phone:</strong> {agent.phone}</p>
                            <p className="text-gray-600 break-all"><strong>URL:</strong> {agent.qrUrl}</p>
                          </div>
                          <Button 
                            onClick={() => downloadQR(agent)} 
                            variant="outline" 
                            className="w-full"
                            data-testid={`download-qr-${agent.agentId}`}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download QR
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {/* Filter and Export */}
            <Card data-testid="filter-export-card">
              <CardHeader>
                <CardTitle>Filter & Export</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="agent-filter">Filter by Agent</Label>
                    <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                      <SelectTrigger id="agent-filter" data-testid="agent-filter-select">
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" data-testid="filter-all">All Agents</SelectItem>
                        {agents.map((agent) => (
                          <SelectItem key={agent.agentId} value={agent.agentId} data-testid={`filter-${agent.agentId}`}>
                            {agent.name} ({agent.agentId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleExport} data-testid="export-excel-button" className="w-full md:w-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Export to Excel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applications List */}
            <Card data-testid="applications-list-card">
              <CardHeader>
                <CardTitle>Loan Applications ({filteredApplications.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredApplications.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No applications found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Agent ID</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Loan Type</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Mobile</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Income</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredApplications.map((app, idx) => (
                          <tr key={app.id || idx} className="hover:bg-gray-50" data-testid={`application-row-${idx}`}>
                            <td className="px-4 py-3 font-mono text-xs">{app.agentId}</td>
                            <td className="px-4 py-3">{app.fullName}</td>
                            <td className="px-4 py-3">{app.loanType}</td>
                            <td className="px-4 py-3">{app.mobile}</td>
                            <td className="px-4 py-3">{app.email}</td>
                            <td className="px-4 py-3">₹{app.monthlyIncome?.toLocaleString()}</td>
                            <td className="px-4 py-3 text-xs text-gray-500">
                              {new Date(app.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
