import requests
import sys
import json
from datetime import datetime

class LoanQRAPITester:
    def __init__(self, base_url="https://loanqr-system.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_agent_id = None
        self.created_application_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test("Root Endpoint", "GET", "", 200)

    def test_create_agent(self):
        """Test creating a new agent"""
        test_agent = {
            "name": f"Test Agent {datetime.now().strftime('%H%M%S')}",
            "phone": "9876543210"
        }
        
        success, response = self.run_test(
            "Create Agent",
            "POST",
            "agents",
            200,
            data=test_agent
        )
        
        if success and 'agentId' in response:
            self.created_agent_id = response['agentId']
            print(f"   Created Agent ID: {self.created_agent_id}")
            
            # Verify QR code fields
            required_fields = ['agentId', 'name', 'phone', 'qrUrl', 'qrImage', 'createdAt']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Missing fields in response: {missing_fields}")
                return False
            
            # Check QR URL format
            expected_url_pattern = f"{self.base_url}/form?agentId={self.created_agent_id}"
            if response['qrUrl'] != expected_url_pattern:
                print(f"⚠️  QR URL format incorrect. Expected: {expected_url_pattern}, Got: {response['qrUrl']}")
                return False
                
            # Check QR image is base64
            if not response['qrImage'].startswith('data:image/png;base64,'):
                print(f"⚠️  QR image not in correct base64 format")
                return False
                
            return True
        return False

    def test_get_agents(self):
        """Test getting all agents"""
        success, response = self.run_test("Get All Agents", "GET", "agents", 200)
        
        if success:
            if not isinstance(response, list):
                print("⚠️  Response should be a list")
                return False
            
            if self.created_agent_id:
                # Check if our created agent is in the list
                agent_found = any(agent.get('agentId') == self.created_agent_id for agent in response)
                if not agent_found:
                    print(f"⚠️  Created agent {self.created_agent_id} not found in agents list")
                    return False
                    
            print(f"   Found {len(response)} agents")
            return True
        return False

    def test_get_specific_agent(self):
        """Test getting a specific agent"""
        if not self.created_agent_id:
            print("⚠️  No agent ID available for testing")
            return False
            
        success, response = self.run_test(
            f"Get Agent {self.created_agent_id}",
            "GET",
            f"agents/{self.created_agent_id}",
            200
        )
        
        if success:
            if response.get('agentId') != self.created_agent_id:
                print(f"⚠️  Agent ID mismatch. Expected: {self.created_agent_id}, Got: {response.get('agentId')}")
                return False
            return True
        return False

    def test_get_nonexistent_agent(self):
        """Test getting a non-existent agent"""
        return self.run_test(
            "Get Non-existent Agent",
            "GET",
            "agents/INVALID123",
            404
        )

    def test_create_loan_application(self):
        """Test creating a loan application"""
        if not self.created_agent_id:
            print("⚠️  No agent ID available for testing")
            return False
            
        test_application = {
            "agentId": self.created_agent_id,
            "loanType": "Personal Loan",
            "fullName": "John Doe",
            "panNumber": "ABCDE1234F",
            "aadhaarNumber": "123456789012",
            "mobile": "9876543210",
            "dob": "1990-01-01",
            "address": "123 Test Street",
            "employmentType": "Salaried",
            "monthlyIncome": 50000.0,
            "email": "john.doe@example.com"
        }
        
        success, response = self.run_test(
            "Create Loan Application",
            "POST",
            "loan-applications",
            200,
            data=test_application
        )
        
        if success and 'id' in response:
            self.created_application_id = response['id']
            print(f"   Created Application ID: {self.created_application_id}")
            
            # Verify all fields are present
            for key, value in test_application.items():
                if key not in response:
                    print(f"⚠️  Missing field in response: {key}")
                    return False
                if response[key] != value:
                    print(f"⚠️  Field mismatch for {key}. Expected: {value}, Got: {response[key]}")
                    return False
            
            return True
        return False

    def test_create_application_invalid_agent(self):
        """Test creating application with invalid agent ID"""
        test_application = {
            "agentId": "INVALID123",
            "loanType": "Personal Loan",
            "fullName": "John Doe",
            "panNumber": "ABCDE1234F",
            "aadhaarNumber": "123456789012",
            "mobile": "9876543210",
            "dob": "1990-01-01",
            "address": "123 Test Street",
            "employmentType": "Salaried",
            "monthlyIncome": 50000.0,
            "email": "john.doe@example.com"
        }
        
        return self.run_test(
            "Create Application with Invalid Agent",
            "POST",
            "loan-applications",
            404,
            data=test_application
        )

    def test_get_all_applications(self):
        """Test getting all loan applications"""
        success, response = self.run_test("Get All Applications", "GET", "loan-applications", 200)
        
        if success:
            if not isinstance(response, list):
                print("⚠️  Response should be a list")
                return False
                
            if self.created_application_id:
                # Check if our created application is in the list
                app_found = any(app.get('id') == self.created_application_id for app in response)
                if not app_found:
                    print(f"⚠️  Created application {self.created_application_id} not found in applications list")
                    return False
                    
            print(f"   Found {len(response)} applications")
            return True
        return False

    def test_get_applications_by_agent(self):
        """Test getting applications filtered by agent"""
        if not self.created_agent_id:
            print("⚠️  No agent ID available for testing")
            return False
            
        success, response = self.run_test(
            f"Get Applications for Agent {self.created_agent_id}",
            "GET",
            f"loan-applications/agent/{self.created_agent_id}",
            200
        )
        
        if success:
            if not isinstance(response, list):
                print("⚠️  Response should be a list")
                return False
                
            # All applications should belong to our agent
            for app in response:
                if app.get('agentId') != self.created_agent_id:
                    print(f"⚠️  Found application with wrong agent ID: {app.get('agentId')}")
                    return False
                    
            print(f"   Found {len(response)} applications for agent {self.created_agent_id}")
            return True
        return False

    def test_get_applications_with_filter(self):
        """Test getting applications with query parameters"""
        if not self.created_agent_id:
            print("⚠️  No agent ID available for testing")
            return False
            
        params = {"agentId": self.created_agent_id}
        success, response = self.run_test(
            "Get Applications with Agent Filter",
            "GET",
            "loan-applications",
            200,
            params=params
        )
        
        if success:
            if not isinstance(response, list):
                print("⚠️  Response should be a list")
                return False
                
            # All applications should belong to our agent
            for app in response:
                if app.get('agentId') != self.created_agent_id:
                    print(f"⚠️  Found application with wrong agent ID: {app.get('agentId')}")
                    return False
                    
            print(f"   Found {len(response)} filtered applications")
            return True
        return False

    def test_export_applications(self):
        """Test exporting applications to Excel"""
        success, response = self.run_test("Export All Applications", "GET", "loan-applications/export", 200)
        return success

    def test_export_applications_by_agent(self):
        """Test exporting applications by agent to Excel"""
        if not self.created_agent_id:
            print("⚠️  No agent ID available for testing")
            return False
            
        params = {"agentId": self.created_agent_id}
        success, response = self.run_test(
            "Export Applications by Agent",
            "GET",
            "loan-applications/export",
            200,
            params=params
        )
        return success

def main():
    print("🚀 Starting Loan QR System API Tests")
    print("=" * 50)
    
    tester = LoanQRAPITester()
    
    # Basic endpoint tests
    tester.test_health_check()
    tester.test_root_endpoint()
    
    # Agent management tests
    tester.test_create_agent()
    tester.test_get_agents()
    tester.test_get_specific_agent()
    tester.test_get_nonexistent_agent()
    
    # Loan application tests
    tester.test_create_loan_application()
    tester.test_create_application_invalid_agent()
    tester.test_get_all_applications()
    tester.test_get_applications_by_agent()
    tester.test_get_applications_with_filter()
    
    # Export tests
    tester.test_export_applications()
    tester.test_export_applications_by_agent()
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"❌ {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())