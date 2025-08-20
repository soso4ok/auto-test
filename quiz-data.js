// Quiz topic configurations
const QUIZ_TOPICS = {
    'azure-az900': {
        title: 'Azure AZ-900: Microsoft Azure Fundamentals',
        sections: [
            {
                title: 'Describe cloud concepts',
                weight: 0.275, // 25-30% average = 27.5%
                description: 'Cloud concepts (25-30%)'
            },
            {
                title: 'Describe Azure architecture and services',
                weight: 0.375, // 35-40% average = 37.5%
                description: 'Azure architecture and services (35-40%)'
            },
            {
                title: 'Describe Azure management and governance',
                weight: 0.325, // 30-35% average = 32.5%
                description: 'Azure management and governance (30-35%)'
            }
        ]
    }
};

// Sample question bank for demonstration (in a real app, this would come from AI)
const SAMPLE_QUESTIONS = {
    'azure-az900': {
        'Describe cloud concepts': [
            {
                question_text: "A company is looking to move its on-premises data center to the cloud to reduce its upfront IT infrastructure costs. This is an example of shifting from:",
                options: [
                    "a) Operational Expenditure (OpEx) to Capital Expenditure (CapEx)",
                    "b) Capital Expenditure (CapEx) to Operational Expenditure (OpEx)",
                    "c) A fixed cost model to a variable cost model",
                    "d) Both b and c are correct"
                ],
                correct_answer: "d"
            },
            {
                question_text: "Which cloud model provides the highest degree of ownership and control?",
                options: [
                    "a) Public Cloud",
                    "b) Private Cloud", 
                    "c) Hybrid Cloud",
                    "d) Multi-cloud"
                ],
                correct_answer: "b"
            },
            {
                question_text: "What is the primary benefit of cloud computing's elasticity?",
                options: [
                    "a) Reduced security risks",
                    "b) Automatic scaling of resources based on demand",
                    "c) Lower latency for all applications",
                    "d) Elimination of downtime"
                ],
                correct_answer: "b"
            },
            {
                question_text: "Which of the following is NOT a cloud service model?",
                options: [
                    "a) Infrastructure as a Service (IaaS)",
                    "b) Platform as a Service (PaaS)",
                    "c) Software as a Service (SaaS)",
                    "d) Network as a Service (NaaS)"
                ],
                correct_answer: "d"
            }
        ],
        'Describe Azure architecture and services': [
            {
                question_text: "Which Azure service is a fully managed platform for building, deploying, and scaling web apps and APIs?",
                options: [
                    "a) Azure Virtual Machines",
                    "b) Azure Functions",
                    "c) Azure App Service",
                    "d) Azure Kubernetes Service (AKS)"
                ],
                correct_answer: "c"
            },
            {
                question_text: "What is Azure Resource Manager (ARM)?",
                options: [
                    "a) A monitoring service for Azure resources",
                    "b) The deployment and management service for Azure",
                    "c) A backup service for Azure VMs",
                    "d) A networking service for connecting resources"
                ],
                correct_answer: "b"
            },
            {
                question_text: "Which Azure storage option provides the lowest cost for infrequently accessed data?",
                options: [
                    "a) Premium SSD",
                    "b) Standard SSD",
                    "c) Cool tier",
                    "d) Archive tier"
                ],
                correct_answer: "d"
            },
            {
                question_text: "What is the primary purpose of Azure Load Balancer?",
                options: [
                    "a) To encrypt data in transit",
                    "b) To distribute incoming network traffic across multiple servers",
                    "c) To monitor application performance",
                    "d) To backup virtual machines"
                ],
                correct_answer: "b"
            },
            {
                question_text: "Which Azure service provides serverless computing capabilities?",
                options: [
                    "a) Azure Virtual Machines",
                    "b) Azure Container Instances",
                    "c) Azure Functions",
                    "d) Azure App Service"
                ],
                correct_answer: "c"
            }
        ],
        'Describe Azure management and governance': [
            {
                question_text: "What is Azure Policy used for?",
                options: [
                    "a) Managing user access to resources",
                    "b) Enforcing organizational standards and compliance",
                    "c) Monitoring resource performance",
                    "d) Automating resource deployment"
                ],
                correct_answer: "b"
            },
            {
                question_text: "Which Azure service helps you understand your cloud costs and usage?",
                options: [
                    "a) Azure Monitor",
                    "b) Azure Advisor",
                    "c) Azure Cost Management",
                    "d) Azure Security Center"
                ],
                correct_answer: "c"
            },
            {
                question_text: "What is the primary purpose of Azure Resource Groups?",
                options: [
                    "a) To group users with similar permissions",
                    "b) To organize and manage related Azure resources",
                    "c) To define network boundaries",
                    "d) To set billing limits"
                ],
                correct_answer: "b"
            },
            {
                question_text: "Which Azure service provides centralized security management and threat protection?",
                options: [
                    "a) Azure Active Directory",
                    "b) Azure Key Vault",
                    "c) Azure Security Center",
                    "d) Azure Policy"
                ],
                correct_answer: "c"
            }
        ]
    }
};